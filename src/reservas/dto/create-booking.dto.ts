import { IsNotEmpty, IsPositive, IsString, IsUUID } from "class-validator";

export class CreateBookingDTO {
    @IsUUID("4")
    evento_id: string;
    
    @IsString()
    @IsNotEmpty()
    nombre_usuario: string;

    @IsPositive()
    cantidad_boletos: number;
}