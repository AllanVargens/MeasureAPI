import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MeasureService } from '../../application/measure.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { MeasureUploadRequestDTO } from 'src/measure/application/dto/measure-upload.dto';

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
}
