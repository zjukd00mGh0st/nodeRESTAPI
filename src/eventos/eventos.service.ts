import { Request, Response } from "express";
import { validate } from "class-validator";
import { AppDataSource } from "../db/data-source";
import { CreateEventDTO } from "./dto/create-event.dto";
import { UpdateEventDTO } from "./dto/update-event.dto";
import { GetEntityByIdDTO } from "../common/dto/get-entity-by-id.dto";
import { Evento } from "../db/entity/Evento";
import { GetEventsDTO } from "./dto/get-events.dto";
import { FindOptionsWhere } from "typeorm";

const repo = AppDataSource.getRepository(Evento);
export class EventosService {
    async createEvent(req: any, res: any) {
        const data: CreateEventDTO = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.sendStatus(422);
        }

        const createEventDto = Object.assign(new CreateEventDTO(), data);
        const validationErrors = await validate(createEventDto);

        if (validationErrors.length) {
            return res.status(400).json(validationErrors);
        }

        if (data.fecha < new Date()) {
            return res.status(400).json({ error: "La fecha del evento no puede ser en el pasado" });
        }

        const evento = new Evento();
        Object.assign(evento, createEventDto);

        const { id, fecha_creacion } = await repo.save(evento);

        return res.status(201).json({
            "evento": {
                id,
                fecha_creacion,
                ...evento,
            }
        });
    }

    async getEvents(req: any, res: any) {
        const { id, nombre, ubicacion, fecha, fecha_creacion } = req.query as GetEventsDTO;

        const whereCondition: FindOptionsWhere<Evento> = {
            ...(id && { id }),
            ...(nombre && { nombre }),
            ...(fecha && { fecha }),
            ...(fecha_creacion && { fecha_creacion }),
            ...(ubicacion && { ubicacion }),
        };

        const [eventos, total] = await repo.findAndCount({ where: whereCondition, order: { fecha: "DESC" } });

        return res.json({ eventos, total });
    };

    async getEventById(req: any, res: any) {
        const id = req.params.id as string;

        if (!id) {
            return res.sendStatus(422);
        }

        const entiityIdDto = Object.assign(new GetEntityByIdDTO(), { id });
        const validationErrors = await validate(entiityIdDto);

        if (validationErrors.length) {
            return res.status(422).json({
                error: validationErrors,
            });
        }

        try {
            const evento = await repo.findOneByOrFail({ id });
            return res.json({ evento });
        } catch (err: any) {
            return res.sendStatus(404);
        }
    }

    async updateEvent(req: any, res: any) {
        const id = req.params.id as string;

        if (!id) {
            return res.sendStatus(422);
        }

        const data = req.body;

        if (!data || Object.keys(data).length === 0) {
            return res.sendStatus(422);
        }

        if (data.fecha < new Date()) {
            return res.status(400).json({ error: "La fecha del evento no puede ser en el pasado" });
        }

        const updateEventDto: UpdateEventDTO = Object.assign(new UpdateEventDTO(), { ...data, id });
        const validationErrors = await validate(updateEventDto)

        if (validationErrors.length) {
            return res.status(400).json({
                error: validationErrors,
            });
        }

        try {
            const evento = await repo.findOneByOrFail({ id });
            Object.assign(evento, updateEventDto);
            await repo.save(evento);
            return res.json({ evento });
        } catch (err: any) {
            return res.sendStatus(404);
        }

    }

    async deleteEvent(req: any, res: any) {
        const id = req.params.id as string;

        if (!id) {
            return res.sendStatus(422);
        }

        const entiityIdDto = Object.assign(new GetEntityByIdDTO(), { id });
        const validationErrors = await validate(entiityIdDto);

        if (validationErrors.length) {
            return res.status(422).json({
                error: validationErrors,
            });
        }

        try {
            await repo.findOneByOrFail({ id });
        } catch (err: any) {
            return res.sendStatus(404);
        }

        try {
            await repo.delete({ id });
            return res.sendStatus(200);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }

}

