import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserCreateDto, UserUpdateDto, UserRo } from '../dto/user.dto';
import { CommonResponse } from 'src/@common/dto/common-response.dto';
import { USER_CREATE_MESSAGE } from 'src/@common/messages/user.message';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: UserCreateDto,
  ): Promise<CommonResponse<UserRo>> {
    const data = await this.usersService.create(createUserDto);
    return {
      data,
      message: [USER_CREATE_MESSAGE],
      success: true,
    };
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UserUpdateDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
