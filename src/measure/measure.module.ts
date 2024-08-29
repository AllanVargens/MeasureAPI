import { Module } from '@nestjs/common';
import { MeasureService } from './application/measure.service';
import { MeasureController } from './presenters/http/measure.controller';
import { GeminiService } from 'src/gemini/application/gemini.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { GeminiProVision_1_5_FlaskModelProvider } from 'src/gemini/application/gemini.provider';

@Module({
  controllers: [MeasureController],
  providers: [MeasureService, GeminiService, PrismaService, GeminiProVision_1_5_FlaskModelProvider],
})
export class MeasureModule {}
