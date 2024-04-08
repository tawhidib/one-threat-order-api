import { Prop, Schema } from '@nestjs/mongoose';
import BaseSchema from 'src/@common/class/base.class';

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
