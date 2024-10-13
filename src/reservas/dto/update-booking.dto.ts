import { IsOptional, IsPositive, IsString, IsUUID } from "class-validator";

export class UpdateBookingDTO {
    @IsUUID("4")
    id: string;

    @IsString()
    @IsOptional()
    nombre_usuario?: string;

    @IsPositive()
    @IsOptional()
    cantidad_boletos?: number;
}