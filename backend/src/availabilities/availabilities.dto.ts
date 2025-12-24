import { ApiProperty, PartialType } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  Min,
} from "class-validator";

export class CreateAvailabilityDto {
  @ApiProperty({ example: 6 })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @ApiProperty({ example: "09:00" })
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  startTime: string;

  @ApiProperty({ example: "17:00" })
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  endTime: string;
}

export class UpdateAvailabilityDto extends PartialType(CreateAvailabilityDto) {}
