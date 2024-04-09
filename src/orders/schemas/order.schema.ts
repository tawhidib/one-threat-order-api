import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import BaseSchema from 'src/@common/class/base.class';
import { Product } from 'src/products/schemas/product.schema';
import { OrderStatus } from '../enums/order-status.enum';
import { User } from 'src/users/schemas/user.schema';
import { PaymentStatus } from '../enums/payment-status.enum';

export type OrderDocument = Order & mongoose.Document;

class ProductWithQuantity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  })
  product: Product;

  @Prop({
    type: Number,
    required: true,
  })
  quantity: number;
}

@Schema({ timestamps: true })
export class Order extends BaseSchema {
  @Prop({
    type: String,
    enum: OrderStatus,
    default: OrderStatus.RECEIVED,
  })
  status: OrderStatus;

  @Prop({
    type: String,
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  paymentStatus: PaymentStatus;

  @Prop({
    type: Number,
    required: true,
  })
  total: number;

  @Prop({
    type: [{ product: mongoose.Types.ObjectId, quantity: Number }],
    required: true,
  })
  productsWithQuantity: ProductWithQuantity[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: User;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
