import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class UserUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'provide user name' })
  name: string;
}

export class UserCreateDto extends UserUpdateDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'provide user email' })
  @IsEmail({}, { message: 'provide valid email' })
  email: string;
}

export class UserRo {
  id: string;
  name: string;
  email: string;
}
