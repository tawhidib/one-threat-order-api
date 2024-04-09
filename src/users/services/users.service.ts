import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDto, UserRo } from '../dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { PaginationQueryDTO } from 'src/@common/dto/pagination-query.dto';
import { PaginatedResponse } from 'src/@common/dto/paginated-response.dto';
import {
  USER_EMAIL_NOT_MATCHED_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from 'src/@common/messages/user.message';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(dto: UserDto): Promise<UserRo> {
    const checkUserExistence = await this.userModel.findOne({
      email: dto.email,
    });
    if (checkUserExistence && checkUserExistence._id) {
      throw new ConflictException('user already exist');
    }

    const user = await this.userModel.create(dto);
    return await this.formatUser(user);
  }

  async list(query: PaginationQueryDTO): Promise<PaginatedResponse<UserRo[]>> {
    const { per_page = 10, page = 1, query_text } = query;
    const skip = (page - 1) * per_page;
    const conditions = {};
    if (query_text) {
      conditions['name'] = { $regex: query_text, $options: 'i' };
    }

    const db = this.userModel.find({ ...conditions, deleted: false });
    const total_count = await this.userModel.countDocuments(db);
    const users = await db.skip(skip).limit(per_page).exec();

    return {
      data: await Promise.all(
        users.map(async (user) => {
          return await this.formatUser(user);
        }),
      ),
      meta: {
        page,
        per_page,
        total_count,
        page_count: Math.floor((total_count + per_page - 1) / per_page),
      },
    };
  }

  async findOne(id: string): Promise<UserRo> {
    const user = await this.userModel.findOne({ _id: id, deleted: false });
    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND_MESSAGE);
    }

    return await this.formatUser(user);
  }

  async update(id: string, dto: UserDto): Promise<UserRo> {
    const checkUser = await this.findOne(id);
    if (checkUser.email !== dto.email) {
      throw new ConflictException(USER_EMAIL_NOT_MATCHED_MESSAGE);
    }

    const updatedUser = await this.userModel.findOneAndUpdate(
      {
        _id: checkUser.id,
      },
      {
        $set: {
          name: dto.name,
        },
      },
      { new: true },
    );

    return await this.formatUser(updatedUser);
  }

  async remove(id: string): Promise<UserRo> {
    const checkUser = await this.findOne(id);

    const deletedUser = await this.userModel.findOneAndUpdate(
      {
        _id: checkUser.id,
      },
      {
        $set: {
          deleted: true,
          deletedAt: new Date(),
        },
      },
      { new: true },
    );

    return await this.formatUser(deletedUser);
  }

  async formatUser(user: UserDocument): Promise<UserRo> {
    const { _id, name, email, createdAt, updatedAt } = user;

    return {
      id: _id,
      name,
      email,
      createdAt,
      updatedAt,
    };
  }
}
