import { Module } from '@nestjs/common';
import { GeminiController } from './presenters/http/gemini.controller';
import { GeminiService } from './application/gemini.service';
import { GeminiProVision_1_5_FlaskModelProvider } from './application/gemini.provider';

@Module({
  controllers: [GeminiController],
  imports: [],
  providers: [GeminiService, GeminiProVision_1_5_FlaskModelProvider]
})
export class GeminiModule {}
