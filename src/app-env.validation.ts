import * as Joi from 'joi';
import 'dotenv/config';

export const appENVValidationSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  MONGO_DB_NAME: Joi.string().required(),
  MONGO_USER: Joi.string().required(),
  MONGO_PASS: Joi.string().required(),
});
