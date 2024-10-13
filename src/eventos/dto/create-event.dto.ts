import { IsISO8601, IsNotEmpty, IsString } from "class-validator";


export class CreateEventDTO {
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @IsISO8601()
    fecha: Date;

    @IsString()
    @IsNotEmpty()
    ubicacion: string;
}
