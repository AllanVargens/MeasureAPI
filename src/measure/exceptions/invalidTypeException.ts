import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class InvalidTypeIncorrectException extends AppException{
    constructor(error: string){
        super({
            error_code: "INVALID_TYPE",
            error_description: error,
            status: HttpStatus.BAD_REQUEST
        })
    }
}