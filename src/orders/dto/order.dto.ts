import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductRo } from 'src/products/dto/product.dto';
import { OrderStatus } from '../enums/order-status.enum';
import { PaymentStatus } from '../enums/payment-status.enum';
import { UserRo } from 'src/users/dto/user.dto';

class ProductsWithQuantityDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => parseInt(value))
  quantity: number;
}

export class OrderCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  user: string;

  @ApiProperty({ type: () => [ProductsWithQuantityDto] })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => ProductsWithQuantityDto)
  productsWithQuantity: ProductsWithQuantityDto[];
}

export class OrderUpdateDto {
  @IsOptional()
  @IsString()
  @IsEnum(OrderStatus)
  status: string;

  @IsOptional()
  @IsString()
  @IsEnum(PaymentStatus)
  paymentStatus: string;
}

export class ProductsDetailsWithQuantityRo {
  product: ProductRo;
  quantity: number;
}

export class OrderRo {
  id: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  user: UserRo;
  productsWithQuantity: ProductsDetailsWithQuantityRo[];
  createdAt: Date;
  updatedAt: Date;
}
