import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'Taem #1', description: 'Group name' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: 'About group', description: 'Group description' })
  @IsOptional()
  readonly description: string;
}
