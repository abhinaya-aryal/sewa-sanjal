import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "test@gmail.com" })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: "9876543210" })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ minLength: 6, example: "test@123" })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "John Doe" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: null })
  @IsOptional()
  @IsString()
  avatarUrl?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
