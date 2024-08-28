import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { GenerativeModel } from '@google/generative-ai';
import { createContent } from '../content.helper';
import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_1_5_FLASK_MODEL, GEMINI_PRO_VISION_MODEL } from './gemini.constant';

@Injectable()
export class GeminiService {

    constructor(
        @Inject(GEMINI_PRO_VISION_1_5_FLASK_MODEL) private readonly proVisionModelFlask: GenerativeModel
    )
    {}

    async generateTextFromMultiModal(prompt: string, file: Express.Multer.File) {
        try{
            const contents = createContent(prompt, file);

            const {totalTokens} = await this.proVisionModelFlask.countTokens({contents});
            const result = await this.proVisionModelFlask.generateContent({contents});
            const response = await result.response;
            const text = response.text();

            return { totalTokens, text };
        } catch (err) {
            if (err instanceof Error) {
                throw new InternalServerErrorException(err.message, err.stack);
              }
              throw err;
        }
    }
}
