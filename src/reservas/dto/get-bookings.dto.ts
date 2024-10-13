import { IsISO8601, IsNumberString, IsOptional, IsString, IsUUID } from "class-validator";

export class GetBookingsDTO {
    @IsUUID("4")
    @IsOptional()
    id?: string;

    @IsUUID("4")
    @IsOptional()
    evento_id?: string;

    @IsString()
    @IsOptional()
    nombre_usuario?: string;

    @IsNumberString()
    @IsOptional()
    cantidad_boletos?: number;

    @IsISO8601()
    @IsOptional()
    fecha_reserva?: Date;
}