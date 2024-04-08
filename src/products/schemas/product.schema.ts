import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import BaseSchema from 'src/@common/class/base.class';
import * as mongoose from 'mongoose';

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: true })
export class Product extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true, min: 1 })
  price: number;

  @Prop({ type: String })
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
