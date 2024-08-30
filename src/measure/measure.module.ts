import { Module } from '@nestjs/common';
import { MeasureService } from './application/measure.service';
import { MeasureController } from './presenters/http/measure.controller';
import { GeminiService } from '../gemini/application/gemini.service';
import { PrismaService } from '../prisma/prisma.service';
import { GeminiProVision_1_5_FlaskModelProvider } from '../gemini/application/gemini.provider';

@Module({
  controllers: [MeasureController],
  providers: [MeasureService, GeminiService, PrismaService, GeminiProVision_1_5_FlaskModelProvider],
})
export class MeasureModule {}
