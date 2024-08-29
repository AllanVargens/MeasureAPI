import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export enum ConfirmedValueType {
    FALSE = 0,
    TRUE = 1,
  }

export class MeasureConfirmRequestDTO {
    @ApiProperty({
        description: 'Measure uuid',
        type: 'string',
    })
    @IsString()
    measure_uuid: string;

    @ApiProperty({
        description: '1 confirmado / 0 desconfirmado',
        enum: ConfirmedValueType,
    })
    @IsEnum(ConfirmedValueType)
    confirmed_value: ConfirmedValueType;
}

export class MeasureConfirmResponseDTO {
    success: boolean
}

export class MeasureUpdateDTO extends PartialType(MeasureConfirmRequestDTO) {}



