import "reflect-metadata";
import { DataSource } from "typeorm";
import { DATABASE_URL } from "../config"
import { Evento } from "./entity/Evento";
import { Reserva } from "./entity/Reserva";


export const AppDataSource = new DataSource({
    type: "mysql",
    url: DATABASE_URL,
    synchronize: false,
    logging: false,
    // entities: ["./src/db/entity/*{.ts,.js}"],
    entities: [Evento, Reserva],
    migrations: ["./src/db/migration/*{.ts,.js}"],
    subscribers: [],
});
