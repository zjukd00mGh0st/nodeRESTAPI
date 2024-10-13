import { IsUUID } from "class-validator";

export class GetEntityByIdDTO {
    @IsUUID("4")
    id: string;
}