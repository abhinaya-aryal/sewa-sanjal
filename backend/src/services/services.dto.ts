import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateServiceDto {
  @ApiProperty({ example: "Wiring" })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: "Wiring in a resident house per flat" })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 3000 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: "NPR" })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ example: 120 })
  @IsNotEmpty()
  @IsInt()
  durationMin: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  categoryId?: string;
}

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
