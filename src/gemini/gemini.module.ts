import { Module } from '@nestjs/common';
import { GeminiService } from './application/gemini.service';
import { GeminiProVision_1_5_FlaskModelProvider } from './application/gemini.provider';

@Module({
  controllers: [],
  imports: [],
  providers: [GeminiService, GeminiProVision_1_5_FlaskModelProvider],
})
export class GeminiModule {}
