import { Test, TestingModule } from '@nestjs/testing';
import { MeasureService } from './measure.service';
import { PrismaService } from '../../prisma/prisma.service';
import { confirmMeasure, createMeasure, fakeCustumer, fakeMeasure, mockCreateResponse, prismaMock } from './measure.mock';
import { GeminiService } from '../../gemini/application/gemini.service';
import { InvalidDataIncorrectException } from '../exceptions/invalidDataException';
import { MeasureUploadRequestDTO } from './dto/measure-upload.dto';

const geminiMock = {
  generateTextFromMultiModal: jest.fn(),
};

describe('MeasureService', () => {
  let service: MeasureService;
  let prisma: PrismaService;
  let gemini: GeminiService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeasureService, GeminiService, {
        provide: PrismaService,
        useValue: prismaMock,
      },
      { provide: GeminiService, useValue: geminiMock }],
    }).compile();

    service = module.get<MeasureService>(MeasureService);
    prisma = module.get<PrismaService>(PrismaService);
    gemini = module.get<GeminiService>(GeminiService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("upload", () => {
    it("should register the measure", async () => {
      
        prismaMock.measure.findFirst = jest.fn().mockResolvedValue(false);

        geminiMock.generateTextFromMultiModal.mockResolvedValue({
          text: "Measure number is 12345"
        })

        const result = await service.upload(createMeasure);

        expect(result).toEqual(mockCreateResponse);
        expect(prisma.measure.create).toHaveBeenCalledWith(expect.objectContaining({
          data: expect.objectContaining({
            image_url: expect.any(String),
            measure_datetime: createMeasure.measure_datetime,
            measure_type: createMeasure.measure_type,
            measure_value: 12345,
            custumer_code: createMeasure.custumer_code,
        }),
        }))
    })

  it('should throw InvalidDataIncorrectException on errors', async () => {
      prismaMock.measure.findFirst.mockImplementation(() => {
          throw new Error('Database error');
      });

      const data: MeasureUploadRequestDTO = {
          custumer_code: "3b91d4b6-0ae0-4fd1-86b1-ba1f6fc3db4f",
          image_url: "data:image/jpeg;base64,MTIzNA==",
          measure_datetime: new Date("2024-08-29T01:23:49.800Z"),
          measure_type: "GAS",
      };

      await expect(service.upload(data)).rejects.toThrow(InvalidDataIncorrectException);
  });
  })


  describe("confirm", () => {
    it("should confirm a measure in database", async ()=> {
      prismaMock.measure.findFirst = jest.fn().mockResolvedValue(true)

      const result = await service.confirm(confirmMeasure)

      expect(result).toEqual({success: true})
      expect(prisma.measure.update).toHaveBeenCalledWith(expect.objectContaining({
        where:{
          measure_uuid: confirmMeasure.measure_uuid
        },
        data: {
          has_confirmed: true
        }
      }))
    })
  })
});
