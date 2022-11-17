import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { SORT_TYPE, SORT_FIELD, PAGINATIONS, SORT } from 'src/helps/enums';

type Pagination = {
  [key in PAGINATIONS]: string;
};

type Sort = {
  [SORT.TYPE]: SORT_TYPE;
  [SORT.FIELD]: SORT_FIELD;
};

export class ShowParamsDto {
  @ApiProperty({
    example: 'pagination[`limit`]=10 pagination[`offset`]=5',
    description: 'Limit',
  })
  @IsOptional()
  @IsNotEmpty()
  readonly pagination?: Pagination;

  @ApiProperty({
    example: 'sort type asc/desc or sort field date/name',
    description: 'Sort params',
  })
  @IsNotEmpty()
  @IsOptional()
  readonly sort?: Sort;
}
