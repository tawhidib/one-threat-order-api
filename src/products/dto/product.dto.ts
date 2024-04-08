import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'provide product name' })
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'provide price of the product' })
  @IsNumber()
  @Min(1, { message: 'price can not be less than 1' })
  @Type(() => Number)
  price: number;
}

export class ProductRo extends ProductDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
