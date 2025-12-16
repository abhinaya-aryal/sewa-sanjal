import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsArray, IsObject, IsOptional, IsString } from "class-validator";

export class CreateProviderDto {
  @ApiPropertyOptional({ example: "Hello world!" })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: ["123", "234"] })
  @IsArray()
  categoryIds: string[];

  @ApiPropertyOptional({})
  @IsOptional()
  @IsObject()
  location?: {
    lat: number;
    lng: number;
    city?: string;
    district?: string;
    address?: string;
  };
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
