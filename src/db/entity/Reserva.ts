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

    @Column("timestamp", { nullable: false })
    fecha_reserva: Date;

    @CreateDateColumn({ name: "fecha_creacion" })
    fecha_creacion: Date;

    @ManyToOne(() => Evento, (evento) => evento.reservas, { onDelete: "CASCADE", nullable: false })
    evento: Evento;
}