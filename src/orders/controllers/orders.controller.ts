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
import { OrdersService } from '../services/orders.service';
import {
  OrderCreateDto,
  OrderPaginationQuery,
  OrderRo,
  OrderUpdateDto,
} from '../dto/order.dto';
import { CommonResponse } from 'src/@common/dto/common-response.dto';
import {
  DELETE_AN_ORDER_MESSAGE,
  GET_AN_ORDER_MESSAGE,
  GET_ORDER_LIST_MESSAGE,
  ORDER_CREATE_MESSAGE,
  UPDATE_AN_ORDER_MESSAGE,
} from 'src/@common/messages/order.message';
import { PaginatedResponse } from 'src/@common/dto/paginated-response.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: OrderCreateDto): Promise<CommonResponse<OrderRo>> {
    const data = await this.ordersService.create(dto);
    return {
      data,
      message: [ORDER_CREATE_MESSAGE],
      success: true,
    };
  }

  @Get()
  async list(
    @Query() query: OrderPaginationQuery,
  ): Promise<CommonResponse<PaginatedResponse<OrderRo[]>>> {
    const data = await this.ordersService.list(query);
    return {
      data,
      message: [GET_ORDER_LIST_MESSAGE],
      success: true,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommonResponse<OrderRo>> {
    const data = await this.ordersService.findOne(id);

    return {
      data,
      message: [GET_AN_ORDER_MESSAGE],
      success: true,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: OrderUpdateDto,
  ): Promise<CommonResponse<OrderRo>> {
    const data = await this.ordersService.update(id, dto);
    return {
      data,
      message: [UPDATE_AN_ORDER_MESSAGE],
      success: true,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CommonResponse<OrderRo>> {
    const data = await this.ordersService.remove(id);
    return {
      data,
      message: [DELETE_AN_ORDER_MESSAGE],
      success: true,
    };
  }
}
