import { ApiProperty } from '@nestjs/swagger';
import { MeasureType } from '@prisma/client';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class MeasureUploadRequestDTO {
  @ApiProperty({
    description: 'Base64 encoded image',
    type: 'string',
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'Customer code',
    type: 'string',
  })
  @IsString()
  customer_code: string;

  @ApiProperty({
    description: 'Measure date and time',
    type: 'string',
    format: 'date-time',
  })
  @IsDateString()
  measure_datetime: Date;

  @ApiProperty({
    description: 'Type of measure',
    enum: MeasureType,
  })
  @IsEnum(MeasureType)
  measure_type: MeasureType;
}

export class MeasureUploadResponseDTO {
  image_url: string;
  measure_value: number;
  measure_uuid: string;
}
