import { Prop } from '@nestjs/mongoose';

export default class BaseSchema {
  _id;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ type: Date, default: null })
  deletedAt: Date;

  @Prop({ type: Date })
  createdAt: Date;

  @Prop({ type: Date })
  updatedAt: Date;
}
