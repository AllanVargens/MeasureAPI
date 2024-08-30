import { HttpStatus } from '@nestjs/common';
import { AppException } from '../../exceptions/appException';

export class ConfirmationDuplicateException extends AppException {
  constructor(error: string) {
    super({
      error_code: 'CONFIRMATION_DUPLICATE',
      error_description: error,
      status: HttpStatus.CONFLICT,
    });
  }
}
