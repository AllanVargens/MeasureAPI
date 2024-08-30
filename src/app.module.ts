import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GeminiModule } from './gemini/gemini.module';
import { MeasureModule } from './measure/measure.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [GeminiModule, MeasureModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
