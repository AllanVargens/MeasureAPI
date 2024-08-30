import {
  MeasureConfirmRequestDTO,
  MeasureUpdateDTO,
} from './dto/measure-confirm.dto';
import { MeasureUploadRequestDTO } from './dto/measure-upload.dto';
import { Measure } from './entity/measure.entity';

export const fakeCustumer = {
  custumer_code: '3b91d4b6-0ae0-4fd1-86b1-ba1f6fc3db4f',
};
export const fakeMeasure: Measure[] = [
  {
    custumer_code: '3b91d4b6-0ae0-4fd1-86b1-ba1f6fc3db4f',
    has_confirmed: false,
    image_url: '/path/exemplo.png',
    measure_datetime: '2024-08-29T01:23:49.800Z',
    measure_type: 'GAS',
    measure_uuid: 'ad13c9f7-1500-437e-bbff-9cd05b690b4f',
    measure_value: 123123,
  },
];
export const createMeasure: MeasureUploadRequestDTO = {
  customer_code: '3b91d4b6-0ae0-4fd1-86b1-ba1f6fc3db4f',
  image: 'data:image/jpeg;base64,MTIzNA==',
  measure_datetime: new Date('2024-08-29T01:23:49.800Z'),
  measure_type: 'GAS',
};

export const confirmMeasure: MeasureConfirmRequestDTO = {
  confirmed_value: 1,
  measure_uuid: 'ad13c9f7-1500-437e-bbff-9cd05b690b4f',
};

export const updateMeasure: MeasureUpdateDTO = {
  confirmed_value: 1,
  measure_uuid: 'ad13c9f7-1500-437e-bbff-9cd05b690b4f',
};

export const mockCreateResponse = {
  image_url: '/uploads/test.png',
  measure_uuid: 'uuid-1234',
  measure_value: 12345,
};

export const prismaMock = {
  custumer: {
    create: jest.fn().mockReturnValue(mockCreateResponse),
    findMany: jest.fn().mockResolvedValue(fakeCustumer),
    findUnique: jest.fn().mockResolvedValue(fakeCustumer),
    findFirst: jest.fn().mockResolvedValue(fakeCustumer),
    update: jest.fn().mockResolvedValue(fakeCustumer),
    delete: jest.fn(),
  },
  measure: {
    create: jest.fn().mockReturnValue(mockCreateResponse),
    findMany: jest.fn().mockResolvedValue(fakeMeasure),
    findUnique: jest.fn().mockResolvedValue(fakeMeasure[0]),
    findFirst: jest.fn().mockResolvedValue(fakeMeasure[0]),
    update: jest.fn().mockResolvedValue(fakeMeasure),
    delete: jest.fn(),
  },
};
