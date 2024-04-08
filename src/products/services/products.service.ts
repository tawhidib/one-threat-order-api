import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from '../schemas/product.schema';
import { ProductDto, ProductRo } from '../dto/product.dto';
import { PaginatedResponse } from 'src/@common/dto/paginated-response.dto';
import { PaginationQueryDTO } from 'src/@common/dto/pagination-query.dto';
import { PRODUCT_NOT_FOUND_MESSAGE } from 'src/@common/messages/product.message';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(dto: ProductDto): Promise<ProductRo> {
    const newProduct = await this.productModel.create(dto);
    return await this.formatProduct(newProduct);
  }

  async list(
    query: PaginationQueryDTO,
  ): Promise<PaginatedResponse<ProductRo[]>> {
    const { per_page = 10, page = 1, query_text } = query;
    const skip = (page - 1) * per_page;
    const conditions = {};
    if (query_text) {
      conditions['name'] = { $regex: query_text, $options: 'i' };
    }
    const db = this.productModel.find({ ...conditions, deleted: false });
    const total_count = await this.productModel.countDocuments(db);
    const products = await db.skip(skip).limit(per_page).exec();
    return {
      meta: {
        page,
        per_page,
        total_count,
        page_count: Math.floor((total_count + per_page - 1) / per_page),
      },
      data: await Promise.all(
        products.map(async (product) => {
          return await this.formatProduct(product);
        }),
      ),
    };
  }

  async findOne(id: string): Promise<ProductRo> {
    const product = await this.productModel.findOne({
      _id: id,
      deleted: false,
    });

    if (!product) {
      throw new NotFoundException(PRODUCT_NOT_FOUND_MESSAGE);
    }

    return await this.formatProduct(product);
  }

  async update(id: string, dto: ProductDto): Promise<ProductRo> {
    const checkProduct = await this.findOne(id);

    const updatedProduct = await this.productModel.findOneAndUpdate(
      { _id: checkProduct.id },
      { $set: { ...dto } },
      { new: true },
    );

    return await this.formatProduct(updatedProduct);
  }

  async remove(id: string): Promise<ProductRo> {
    const checkProduct = await this.findOne(id);

    const updatedProduct = await this.productModel.findOneAndUpdate(
      { _id: checkProduct.id },
      { $set: { deleted: true, deletedAt: new Date() } },
      { new: true },
    );

    return await this.formatProduct(updatedProduct);
  }

  async formatProduct(product: ProductDocument): Promise<ProductRo> {
    const { _id, name, description, price, createdAt, updatedAt } = product;

    return {
      id: _id,
      name,
      description,
      price,
      createdAt,
      updatedAt,
    };
  }
}
