import { IsISO8601, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class GetEventsDTO {
    @IsUUID("4")
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    nombre?: string;

    @IsISO8601()
    @IsOptional()
    fecha?: Date;

    @IsISO8601()
    @IsOptional()
    fecha_creacion?: Date;

    @IsString()
    @IsOptional()
    ubicacion?: string;
}