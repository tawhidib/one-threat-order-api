import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ProductDto, ProductRo } from '../dto/product.dto';
import { CommonResponse } from 'src/@common/dto/common-response.dto';
import { PaginatedResponse } from 'src/@common/dto/paginated-response.dto';
import { PaginationQueryDTO } from 'src/@common/dto/pagination-query.dto';
import {
  GET_A_PRODUCT_MESSAGE,
  PRODUCT_CREATE_MESSAGE,
  PRODUCT_DELETE_MESSAGE,
  PRODUCT_LIST_MESSAGE,
  UPDATE_PRODUCT_MESSAGE,
} from 'src/@common/messages/product.message';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: ProductDto,
  ): Promise<CommonResponse<ProductRo>> {
    const data = await this.productsService.create(createProductDto);
    return {
      data,
      message: [PRODUCT_CREATE_MESSAGE],
      success: true,
    };
  }

  @Get()
  async findAll(
    @Query() query: PaginationQueryDTO,
  ): Promise<CommonResponse<PaginatedResponse<ProductRo[]>>> {
    const data = await this.productsService.list(query);
    return {
      data,
      message: [PRODUCT_LIST_MESSAGE],
      success: true,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommonResponse<ProductRo>> {
    const data = await this.productsService.findOne(id);
    return {
      data,
      message: [GET_A_PRODUCT_MESSAGE],
      success: true,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: ProductDto,
  ): Promise<CommonResponse<ProductRo>> {
    const data = await this.productsService.update(id, updateProductDto);
    return {
      data,
      message: [UPDATE_PRODUCT_MESSAGE],
      success: true,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CommonResponse<ProductRo>> {
    const data = await this.productsService.remove(id);
    return {
      data,
      message: [PRODUCT_DELETE_MESSAGE],
      success: true,
    };
  }
}
