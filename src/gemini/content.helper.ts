
import { Content, Part } from '@google/generative-ai';

export function createContent(text: string, ...images: { buffer: Buffer, mimeType: string}[]): Content[] {
    const imagesParts: Part[] = images.map(({buffer, mimeType}) => {
        return {
            inlineData: {
                mimeType: mimeType,
                data: buffer.toString("base64")
            },
        };
    });

    return [
        {
            role: "user",
            parts: [
                ...imagesParts,
                {
                    text,
                },
            ],
        },
    ];
}

