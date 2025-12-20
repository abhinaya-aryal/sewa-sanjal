import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { IsArray, IsObject, IsOptional, IsString } from "class-validator";

export class CreateProviderDto {
  @ApiPropertyOptional({ example: "Hello world!" })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ["cmjdqoiop00009pqe67mjvj51"],
  })
  @IsOptional()
  @IsArray()
  categoryIds?: string[];

  @ApiPropertyOptional({
    example: { city: "Kathmandu", district: "Kathmandu" },
  })
  @IsOptional()
  @IsObject()
  location?: {
    lat: number;
    lng: number;
    city?: string;
    district?: string;
    address?: string;
  };

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  documentUrl?: string;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
