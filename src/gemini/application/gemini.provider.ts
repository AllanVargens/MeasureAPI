import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import { env } from "../../../env.config";
import { GENERATION_CONFIG, SAFETY_SETTINGS } from '../../../gemini.config';
import { GEMINI_PRO_MODEL, GEMINI_PRO_VISION_1_5_FLASK_MODEL, GEMINI_PRO_VISION_MODEL } from './gemini.constant';

// export const GeminiProModelProvider: Provider<GenerativeModel> = {
//     provide: GEMINI_PRO_MODEL,
//     useFactory: () => {
//         const genAI = new GoogleGenerativeAI(env.GEMINI.KEY);
//         return genAI.getGenerativeModel({
//             model: env.GEMINI.PRO_MODEL,
//             generationConfig: GENERATION_CONFIG,
//             safetySettings: SAFETY_SETTINGS
//         })
//     }
// }

// export const GeminiProVisionModelProvider: Provider<GenerativeModel> = {
//     provide: GEMINI_PRO_VISION_MODEL,
//     useFactory: () => {
//         const genAI = new GoogleGenerativeAI(env.GEMINI.KEY);
//         return genAI.getGenerativeModel({
//             model: env.GEMINI.PRO_VISION_MODEL,
//             generationConfig: GENERATION_CONFIG,
//             safetySettings: SAFETY_SETTINGS,
//         })
//     }
// }

export const GeminiProVision_1_5_FlaskModelProvider: Provider<GenerativeModel> = {
    provide: GEMINI_PRO_VISION_1_5_FLASK_MODEL,
    useFactory: () => {
        const genAI = new GoogleGenerativeAI(env.GEMINI.KEY);
        return genAI.getGenerativeModel({
            model: env.GEMINI.PRO_VISION_1_5_FLASK_MODEL,
            generationConfig: GENERATION_CONFIG,
            safetySettings: SAFETY_SETTINGS,
        })
    }
}
