import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MeasureService } from '../../application/measure.service';
import { ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { MeasureUploadRequestDTO } from 'src/measure/application/dto/measure-upload.dto';
import { MeasureUpdateDTO } from 'src/measure/application/dto/measure-confirm.dto';
import { MeasureType } from '@prisma/client';

@Controller('')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {
    
  }
    @ApiBody({description: "Request body for measure upload",
      type: MeasureUploadRequestDTO
    })
    @Post("upload")
    async upload(
        @Body() data: MeasureUploadRequestDTO
    ): Promise<any> {
    return this.measureService.upload(data)
    }

    @ApiBody({description: "0 - desconfirmar / 1 - confirmar",
      type: MeasureUpdateDTO
    })
    @Patch("confirm")
    async confirm(
      @Body() data: MeasureUpdateDTO
    ): Promise<any> {
      return this.measureService.confirm(data)
    }

    @ApiQuery({ name: 'measure_type', required: false, type: String })
    @Get(":custumer_code/list?")
    async findMeasures(@Param("custumer_code") custumer_code: string, @Query("measure_type") measure_type?: string) {
      let enumMeasureType: MeasureType | undefined;

    if (measure_type) {
        enumMeasureType = Object.values(MeasureType).find(
            (type) => type === measure_type.toUpperCase()
        );

        if (!enumMeasureType) {
            throw new BadRequestException(`Invalid measure type: ${measure_type}`);
        }
    }

      
      return this.measureService.findMeasures(custumer_code, enumMeasureType);
    }

}
