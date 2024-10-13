import "reflect-metadata";
import { DataSource } from "typeorm";
import { DATABASE_URL } from "../config"

export const AppDataSource = new DataSource({
    type: "mysql",
    url: DATABASE_URL,
    synchronize: false,
    logging: false,
    entities: ["./src/entity/**/*{.ts,.js}"],
    migrations: ["./src/db/migration/*{.ts,.js}"],
    subscribers: [],
});
