import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty()
  page: number;

  @ApiProperty()
  per_page: number;

  @ApiProperty()
  page_count: number;

  @ApiProperty()
  total_count: number;
}

export class PaginatedResponse<E> {
  @ApiProperty({ type: Meta })
  meta: Meta;

  @ApiProperty()
  data: E;
}
