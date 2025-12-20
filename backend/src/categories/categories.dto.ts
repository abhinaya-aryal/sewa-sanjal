import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({ example: "Electrician" })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: "electrician" })
  @IsNotEmpty()
  @IsString()
  slug: string;
}
