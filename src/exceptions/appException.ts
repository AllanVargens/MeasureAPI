import { HttpException, HttpStatus } from "@nestjs/common";

export interface AppExcetionProps{
     error_code: string
     error_description: string
     status: HttpStatus
}

export class AppException extends HttpException{
    constructor({error_code, error_description, status}: AppExcetionProps) {
        super(
            {
                error_description,
                error_code 
            },
            status
        ); 
    }
}