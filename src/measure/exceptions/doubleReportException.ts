import { HttpStatus } from "@nestjs/common";
import { AppException } from "../../exceptions/appException";

export class DoubleReportException extends AppException{
    constructor(){
        super({
            error_code: "DOUBLE_REPORT",
            error_description: "Leitura do mes ja realizada",
            status: HttpStatus.CONFLICT
        })
    }
}