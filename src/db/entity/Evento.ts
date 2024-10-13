import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm"
import { Reserva } from "./Reserva";


@Entity({ name: "eventos" })
export class Evento {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("varchar", { nullable: false })
    nombre: string;

    @Column("timestamp",  { nullable: false })
    fecha: Date;

    @Column("varchar", { nullable: false })
    ubicacion: string

    @CreateDateColumn({ name: "fecha_creacion", nullable: false })
    fecha_creacion: Date

    @OneToMany(() => Reserva, (reserva) => reserva.evento)
    reservas: Reserva[];
}
