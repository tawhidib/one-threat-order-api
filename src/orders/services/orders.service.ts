import { ConflictException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../schemas/order.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/services/users.service';
import { ProductsService } from 'src/products/services/products.service';
import {
  OrderCreateDto,
  OrderRo,
  ProductsDetailsWithQuantityRo,
} from '../dto/order.dto';
import { INVALID_PRODUCT_EXIST_IN_ORDER } from 'src/@common/messages/order.message';
import { ProductQuantityObjectType } from '../types/product-quantity.types';

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

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
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
        quantity: productsWithQuantity[i].quantity,
        product,
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
