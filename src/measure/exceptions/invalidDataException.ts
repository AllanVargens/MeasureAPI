import { HttpStatus } from "@nestjs/common";
import { AppException } from "../../exceptions/appException";

export class InvalidDataIncorrectException extends AppException{
    constructor(error: string){
        super({
            error_code: "INVALID_DATA",
            error_description: error,
            status: HttpStatus.BAD_REQUEST
        })
    }
}