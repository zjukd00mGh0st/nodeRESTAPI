import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import { HOST, PORT } from "./config";
import { AppDataSource } from "./db/data-source";
import { EventosRouter } from "./eventos/eventos.controller";
import { ReservasRouter } from "./reservas/reservas.controller";


async function main() {
    // Connect to the database
    try {
        await AppDataSource.initialize();
    } catch (err: any) {
        console.error(err)
        process.exit(1)
    }

    const app = express()

    app.use(cors())
    app.use(morgan("dev"))
    app.use(express.json({
        limit: "50MB",
    }));

    // Healthcheck
    app.get("/", (req: Request, res: Response) => {
        res.sendStatus(200);
    });

    app.use("/eventos", EventosRouter);
    app.use("/reservas", ReservasRouter);

    app.listen(parseInt(PORT), HOST, () => {});
}


main()
    .catch((err: any) => {
        console.error(err);
    })