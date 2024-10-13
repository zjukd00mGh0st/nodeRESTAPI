import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Evento } from "./Evento";

@Entity({ name: "reservas" })
export class Reserva {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column("varchar", { nullable: false })
    nombre_usuario: string;

    @Column("int", { nullable: false })
    cantidad_boletos: number;

    @CreateDateColumn({ name: "fecha_reserva" })
    fecha_reserva: Date;

    @ManyToOne(() => Evento, (evento) => evento.reservas, { onDelete: "CASCADE", nullable: false })
    evento: Evento;
}