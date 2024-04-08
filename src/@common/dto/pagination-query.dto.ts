import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class PaginationQueryDTO {
  @ApiProperty({
    default: 1,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number;

  @ApiProperty({
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  per_page: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  query_text: string;
}
