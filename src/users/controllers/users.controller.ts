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
import { UsersService } from '../services/users.service';
import { UserDto, UserRo } from '../dto/user.dto';
import { CommonResponse } from 'src/@common/dto/common-response.dto';
import {
  GET_AN_USER_MESSAGE,
  USER_CREATE_MESSAGE,
  USER_DELETE_MESSAGE,
  USER_LIST_MESSAGE,
} from 'src/@common/messages/user.message';
import { PaginatedResponse } from 'src/@common/dto/paginated-response.dto';
import { PaginationQueryDTO } from 'src/@common/dto/pagination-query.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  async create(
    @Body() createUserDto: UserDto,
  ): Promise<CommonResponse<UserRo>> {
    const data = await this.usersService.create(createUserDto);
    return {
      data,
      message: [USER_CREATE_MESSAGE],
      success: true,
    };
  }

  @Get()
  async list(
    @Query() query: PaginationQueryDTO,
  ): Promise<CommonResponse<PaginatedResponse<UserRo[]>>> {
    const data = await this.usersService.list(query);
    return {
      data,
      message: [USER_LIST_MESSAGE],
      success: true,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CommonResponse<UserRo>> {
    const data = await this.usersService.findOne(id);
    return {
      data,
      message: [GET_AN_USER_MESSAGE],
      success: true,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UserDto,
  ): Promise<CommonResponse<UserRo>> {
    const data = await this.usersService.update(id, updateUserDto);
    return {
      data,
      message: [],
      success: true,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CommonResponse<UserRo>> {
    const data = await this.usersService.remove(id);
    return {
      data,
      message: [USER_DELETE_MESSAGE],
      success: true,
    };
  }
}
