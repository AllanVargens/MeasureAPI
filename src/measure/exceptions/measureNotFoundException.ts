import { HttpStatus } from "@nestjs/common";
import { AppException } from "src/exceptions/appException";

export class MeasureNotFoundException extends AppException{
    constructor(error: string){
        super({
            error_code: "MEASURE_NOT_FOUND",
            error_description: error,
            status: HttpStatus.NOT_FOUND
        })
    }
}