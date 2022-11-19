//import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class UserToGroupDto {
  @IsNotEmpty()
  @IsNumberString()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumberString()
  readonly groupId: number;
}
