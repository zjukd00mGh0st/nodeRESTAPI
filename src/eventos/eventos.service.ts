import { Request, Response } from "express";
import { validate } from "class-validator";
import { CreateEventDTO } from "./dto/create-event.dto";
import { UpdateEventDTO } from "./dto/update-event.dto";
import { GetEntityByIdDTO } from "../common/dto/get-entity-by-id.dto";

export async function createEvent(req: any, res: any) {
    const data: CreateEventDTO = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.sendStatus(422);
    }

    const createEventDto = Object.assign(new CreateEventDTO(), data);
    const validationErrors = await validate(createEventDto);

    if (validationErrors.length) {
        return res.status(400).json(validationErrors);
    }

    console.log("This is the body data")
    console.log(data)

    res.json({
        "evento": {}
    });
}

export async function getEvents(req: any, res: any) {
    const query = req.query;

    console.log("Query data")
    console.log(query)

    res.json({
        eventos: []
    })
};

export async function getEventById(req: any, res: any) {
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

    res.json({
        "evento": {}
    });
}

export async function updateEvent(req: any, res: any) {
    const id = req.params.id as string;

    if (!id) {
        return res.sendStatus(422);
    }

    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
        return res.sendStatus(422);
    }

    const updateEventDto = Object.assign(new UpdateEventDTO(), { ...data, id });
    const validationErrors = await validate(updateEventDto)

    if (validationErrors.length) {
        return res.status(400).json({
            error: validationErrors,
        });
    }


    res.json({
        "evento": {}
    });
}

export async function deleteEvent(req: any, res: any) {
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

    res.sendStatus(200);
}