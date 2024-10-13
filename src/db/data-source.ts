import "reflect-metadata";
import { DataSource, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { DATABASE_URL } from "../config"
import { Evento } from "./entity/Evento";
import { Reserva } from "./entity/Reserva";

// useContainer(Container);

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
