import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { OrderCreateDto, OrderRo } from '../dto/order.dto';
import { CommonResponse } from 'src/@common/dto/common-response.dto';
import { ORDER_CREATE_MESSAGE } from 'src/@common/messages/order.message';

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
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
