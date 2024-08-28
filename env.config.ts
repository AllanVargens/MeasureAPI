import * as dotenv from "dotenv";

dotenv.config();

export const env = {
    PORT: parseInt(process.env.PORT || "3000"),
    GEMINI: {
        KEY: process.env.GEMINI_API_KEY || "",
        PRO_VISION_1_5_FLASK_MODEL: process.env.GEMINI_PRO_VISION_1_5_FLASK_MODEL || "gemini-1.5-flash"
    }
}