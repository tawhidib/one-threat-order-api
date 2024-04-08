import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import BaseSchema from 'src/@common/class/base.class';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;
@Schema({ timestamps: true })
export class User extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    set: (v) => v.toLowerCase(),
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
