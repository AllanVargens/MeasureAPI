import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { GeminiService } from 'src/gemini/application/gemini.service';
import { GenerateTextDto } from 'src/gemini/generate-text.dto';

@Controller('gemini')
export class GeminiController {
    constructor(private service: GeminiService) {}
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema:{
            type: "object",
            properties:{
                prompt: {
                    type: "string",
                    description: "Prompt",
                },
                file: {
                    type: 'string',
                    format: 'binary',
                    description: 'Binary file',
                }
            }
        }
    })
    @Post("text-and-image")
    @UseInterceptors(FileInterceptor("file"))
    async generateTextFromMultiModal(
        @Body() dto: GenerateTextDto,
        @UploadedFile() file: Express.Multer.File
    ): Promise<any> {
    return this.service.generateTextFromMultiModal(dto.prompt, file)
    }
}
