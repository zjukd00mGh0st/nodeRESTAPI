import { IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";


export class UpdateEventDTO {
    @IsUUID("4")
    id: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    nombre: string;

    @IsISO8601()
    @IsOptional()
    fecha: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    ubicacion: string;
}