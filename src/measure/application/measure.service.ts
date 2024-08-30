import { Injectable } from '@nestjs/common';
import { GeminiService } from 'src/gemini/application/gemini.service';
import { MeasureUploadRequestDTO, MeasureUploadResponseDTO } from './dto/measure-upload.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DoubleReportException } from '../exceptions/doubleReportException';
import { InvalidDataIncorrectException } from '../exceptions/invalidDataException';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ConfirmedValueType, MeasureConfirmResponseDTO, MeasureUpdateDTO } from './dto/measure-confirm.dto';
import { MeasureNotFoundException } from '../exceptions/measureNotFoundException';
import { ConfirmationDuplicateException } from '../exceptions/confirmationDuplicateException';
import { InvalidTypeIncorrectException } from '../exceptions/invalidTypeException';
import { MeasureType } from '@prisma/client';

@Injectable()
export class MeasureService {

    constructor(private gemini: GeminiService, private prisma: PrismaService){}

    async upload(data: MeasureUploadRequestDTO): Promise<MeasureUploadResponseDTO | InvalidDataIncorrectException | DoubleReportException>  {

        const {custumer_code, image_url, measure_datetime, measure_type} = data;
        try{
            const filename = `${uuidv4()}.png`;
            const filepath = path.join(process.cwd(), "uploads", filename);

            fs.writeFileSync(filepath, Buffer.from(image_url, "base64"));



            const imagem = image_url.replace(/^data:image\/\w+;base64,/, "");
            const mimeType = this.extractMimeType(image_url)

            const instruction = "take the measure number in image";
            const response = await this.gemini.generateTextFromMultiModal(instruction, imagem, mimeType );

            const measure_value = parseInt(response.text.match(/\d+/).toString());
            const measureFounded = await this.prisma.measure.findFirst({
                where:{
                    measure_value: measure_value
                }
            })

            if (measureFounded) {
                 throw new DoubleReportException()
            }

            const measure =  await this.prisma.measure.create({
                data: {
                    image_url: filepath,
                    measure_datetime,
                    measure_type,
                    measure_value: measure_value,
                    custumer_code
                },
                select: {
                    image_url: true,
                    measure_value: true,
                    measure_uuid: true
                }
            })

            return {
                image_url: measure.image_url,
                measure_uuid: measure.measure_uuid,
                measure_value: measure.measure_value
            }
        
        }catch(err){
            throw new InvalidDataIncorrectException(err)
        }
        
    }

    async confirm(data: MeasureUpdateDTO): Promise<MeasureConfirmResponseDTO | InvalidDataIncorrectException | MeasureNotFoundException | ConfirmationDuplicateException>{
        const {confirmed_value, measure_uuid} = data;
        try{
            const measureFounded = await this.prisma.measure.findFirst({
                where: {
                    measure_uuid
                }
            })

            if (!measureFounded) {
                throw new MeasureNotFoundException("Leitura não encontrada")
            }

            if ((await measureFounded).has_confirmed == true) {
                throw new ConfirmationDuplicateException("Leitura do mês já realizada")
            }

            const statusBoolean = confirmed_value === ConfirmedValueType.TRUE;

            const measureUpdate = await this.prisma.measure.update({
                where:{
                    measure_uuid
                },
                data: {
                    has_confirmed: statusBoolean
                }
            });

            return {
                success: true
            }
        }catch (err){
            throw new InvalidDataIncorrectException(err)
        }
    }

    async findMeasures( custumer_code: string, measure_type?: MeasureType,){

        if (measure_type !== "WATER" && measure_type !== "GAS" && measure_type !== undefined) {
            throw new InvalidTypeIncorrectException("Tipo de medição não permitida")
        }
        const custumerFounded =  await this.prisma.custumer.findUnique({
            where: {
                custumer_code,
                ...(measure_type && {
                    measures: {
                        some: {
                            measure_type,
                        },
                    },
                }),
            },
            select: {
                custumer_code: true,
                measures: {
                    select:{
                        measure_uuid: true,
                        measure_datetime: true,
                        measure_type: true,
                        has_confirmed: true,
                        image_url: true
                    }
                }
            }
        })

        if (!custumerFounded) {
            throw new MeasureNotFoundException("Nenhuma leitura encontrada")
        }

        return custumerFounded
    }

    private extractMimeType(base64String: string): string {
        const mimeTypeMatch = base64String.match(/^data:(image\/\w+);base64,/);
        if (mimeTypeMatch) {
            return mimeTypeMatch[1];
        }
        throw new Error("MimeType não encontrado na string base64");
    }
}
