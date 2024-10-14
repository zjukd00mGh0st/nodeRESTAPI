import "reflect-metadata";
import { DataSource } from "typeorm";
import { DATABASE_URL } from "../config"
import { Evento } from "./entity/Evento";
import { Reserva } from "./entity/Reserva";

// useContainer(Container);

export const AppDataSource = new DataSource({
    type: "mysql",
    url: DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: ["./build/db/entity/*.js"],
    migrations: ["./build/migration/*.js"],
    subscribers: [],
});
