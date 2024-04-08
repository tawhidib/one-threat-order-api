import { ConflictException, Injectable } from '@nestjs/common';
import { UserCreateDto, UserRo, UserUpdateDto } from '../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(dto: UserCreateDto): Promise<UserRo> {
    const checkUserExistence = await this.userModel.findOne({
      email: dto.email,
    });
    if (checkUserExistence && checkUserExistence._id) {
      throw new ConflictException('user already exist');
    }

    const user = await this.userModel.create(dto);
    return await this.formatUser(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UserUpdateDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async formatUser(user: UserDocument): Promise<UserRo> {
    const { _id, name, email } = user;

    return {
      id: _id,
      name,
      email,
    };
  }
}
