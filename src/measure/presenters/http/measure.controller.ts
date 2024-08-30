import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MeasureService } from '../../application/measure.service';
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { MeasureUploadRequestDTO } from 'src/measure/application/dto/measure-upload.dto';
import { MeasureUpdateDTO } from 'src/measure/application/dto/measure-confirm.dto';
import { MeasureType } from '@prisma/client';
import { InvalidTypeIncorrectException } from 'src/measure/exceptions/invalidTypeException';

@Controller('')
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {
    
  }
    @ApiBody({description: "Request body for measure upload",
      type: MeasureUploadRequestDTO
    })
    @ApiResponse({status: 200, description: "Operação realizada com sucesso"})
    @ApiResponse({status: 400, description: "Os dados fornecidos no corpo da requisição são inválidos"})
    @ApiResponse({status: 404, description: "Já existe uma leitura para este tipo no mê atual"})
    @Post("upload")
    async upload(
        @Body() data: MeasureUploadRequestDTO
    ): Promise<any> {
    return this.measureService.upload(data)
    }

    @ApiBody({description: "0 - desconfirmar / 1 - confirmar",
      type: MeasureUpdateDTO
    })
    @ApiResponse({status: 200, description: "Operação realizada com sucesso"})
    @ApiResponse({status: 400, description: "Os dados fornecidos no corpo da requisição são inválidos"})
    @ApiResponse({status: 404, description: "Leitura não encontrada"})
    @ApiResponse({status: 409, description: "Leitura já confirmada"})
    @Patch("confirm")
    async confirm(
      @Body() data: MeasureUpdateDTO
    ): Promise<any> {
      return this.measureService.confirm(data)
    }

    @ApiResponse({status: 200, description: "Operação realizada com sucesso"})
    @ApiResponse({status: 400, description: "Parâmetro measure type diferente de WATER ou GAS"})
    @ApiResponse({status: 404, description: "Nenhum registro encontrado"})
    @ApiQuery({ name: 'measure_type', required: false, type: String })
    @Get(":custumer_code/list?")
    async findMeasures(@Param("custumer_code") custumer_code: string, @Query("measure_type") measure_type?: string) {
      let enumMeasureType: MeasureType | undefined;

    if (measure_type) {
        enumMeasureType = Object.values(MeasureType).find(
            (type) => type === measure_type.toUpperCase()
        );

        if (!enumMeasureType) {
            throw new InvalidTypeIncorrectException("Tipo de medição não permitida")
        }
    }
      return this.measureService.findMeasures(custumer_code, enumMeasureType);
    }
}
