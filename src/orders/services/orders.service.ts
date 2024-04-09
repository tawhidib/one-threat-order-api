import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users.service';
import { ProductsService } from 'src/products/services/products.service';
import {
  OrderCreateDto,
  OrderPaginationQuery,
  OrderRo,
  OrderUpdateDto,
  ProductsDetailsWithQuantityRo,
} from '../dto/order.dto';
import {
  INVALID_PRODUCT_EXIST_IN_ORDER,
  ORDER_NOT_FOUND,
} from 'src/@common/messages/order.message';
import { ProductQuantityObjectType } from '../types/product-quantity.types';
import { PaginatedResponse } from 'src/@common/dto/paginated-response.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
  ) {}

  async create(dto: OrderCreateDto): Promise<OrderRo> {
    // checking user
    const userDetails = await this.usersService.findOne(dto.user);

    // validating product existence in the database
    const checkProducts = await this.productsService.findProductsByIds(
      dto.productsWithQuantity.map(
        (productWithQuantity) => productWithQuantity.product,
      ),
    );

    if (dto.productsWithQuantity.length !== checkProducts.length) {
      throw new ConflictException(INVALID_PRODUCT_EXIST_IN_ORDER);
    }

    // making product and quantity object for calculating total
    const productsQuantityObject: ProductQuantityObjectType = {};
    dto.productsWithQuantity.forEach((productWithQuantity) => {
      productsQuantityObject[productWithQuantity.product] =
        productWithQuantity.quantity;
    });

    // calculating total of this order
    let total = 0;
    checkProducts.forEach((product) => {
      total += product.price * productsQuantityObject[product.id];
    });

    // creating order
    const order = await this.orderModel.create({
      user: userDetails.id,
      total,
      productsWithQuantity: dto.productsWithQuantity,
    });

    return await this.formatOrder(order);
  }

  async list(
    query: OrderPaginationQuery,
  ): Promise<PaginatedResponse<OrderRo[]>> {
    const { page = 1, per_page = 10, user, status, paymentStatus } = query;
    const skip = (page - 1) * per_page;
    const conditions: any = {};

    if (user) {
      conditions['user'] = user;
    }
    if (status) {
      conditions['status'] = status;
    }

    if (paymentStatus) {
      conditions['paymentStatus'] = paymentStatus;
    }

    const db = this.orderModel.find({ ...conditions, deleted: false });
    const total_count = await this.orderModel.countDocuments(db);
    const orders = await db.skip(skip).limit(per_page).exec();

    return {
      data: await Promise.all(
        orders.map(
          async (order): Promise<OrderRo> => await this.formatOrder(order),
        ),
      ),
      meta: {
        page,
        per_page,
        total_count,
        page_count: Math.floor((total_count + per_page - 1) / per_page),
      },
    };
  }

  async findOne(id: string): Promise<OrderRo> {
    const order = await this.orderModel.findOne({ _id: id, deleted: false });
    if (!order) {
      throw new NotFoundException(ORDER_NOT_FOUND);
    }

    return await this.formatOrder(order);
  }

  async update(id: string, dto: OrderUpdateDto): Promise<OrderRo> {
    if (!dto.paymentStatus && !dto.status) {
      throw new BadRequestException('nothing to update');
    }
    const checkOrder = await this.findOne(id);

    const updatedOrder = await this.orderModel.findOneAndUpdate(
      { _id: checkOrder.id },
      { $set: { ...dto } },
      { new: true },
    );

    return await this.formatOrder(updatedOrder);
  }

  async remove(id: string): Promise<OrderRo> {
    const checkOrder = await this.findOne(id);

    const deletedOrder = await this.orderModel.findOneAndUpdate(
      { _id: checkOrder.id },
      { $set: { deleted: true, deletedAt: new Date() } },
      { new: true },
    );

    return await this.formatOrder(deletedOrder);
  }

  async formatOrder(order: OrderDocument): Promise<OrderRo> {
    const {
      _id,
      createdAt,
      updatedAt,
      total,
      status,
      paymentStatus,
      productsWithQuantity,
      user,
    } = order;

    const userDetails = await this.usersService.findOne(user._id);

    const productsWithQuantityDetails: ProductsDetailsWithQuantityRo[] = [];

    for (let i = 0; i < productsWithQuantity.length; ++i) {
      const product = await this.productsService.findOne(
        productsWithQuantity[i].product._id,
      );

      productsWithQuantityDetails.push({
        product,
        quantity: productsWithQuantity[i].quantity,
      });
    }

    return {
      id: _id,
      status,
      paymentStatus,
      total,
      productsWithQuantity: productsWithQuantityDetails,
      user: userDetails,
      createdAt,
      updatedAt,
    };
  }
}
