import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Petya', description: 'Name' })
  @IsString({ message: 'String' })
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ example: 'user@user.com', description: 'Email' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'User123!', description: 'Password' })
  @IsNotEmpty()
  @IsString({ message: 'Password' })
  @Length(8, 256, { message: 'Min: 8, Max: 256' })
  readonly password: string;
}
