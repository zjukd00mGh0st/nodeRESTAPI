import { validate } from "class-validator";
import { CreateBookingDTO } from "./dto/create-booking.dto";
import { UpdateBookingDTO } from "./dto/update-booking.dto";
import { GetBookingsDTO } from "./dto/get-bookings.dto";
import { Reserva } from "../db/entity/Reserva";
import { Evento } from "../db/entity/Evento";
import { GetEntityByIdDTO } from "../common/dto/get-entity-by-id.dto";
import { AppDataSource } from "../db/data-source";
import { FindOptionsWhere } from "typeorm";


const repo = AppDataSource.getRepository(Reserva);
const eventsRepo = AppDataSource.getRepository(Evento)

export class BookingService {
    async createBooking(req: any, res: any) {
        const data = req.body;

        const bookingDto: CreateBookingDTO = Object.assign(new CreateBookingDTO(), data);
        const validationErrors = await validate(bookingDto);

        if (validationErrors.length) {
            return res.status(400).send({ error: validationErrors });
        }

        // Verify if the event exist given its ID
        let evento: Evento;
        try {
            evento = await eventsRepo.findOneByOrFail({ id: bookingDto.evento_id });
        } catch (err: any) {
            return res.sendStatus(404);
        }

        const booking = new Reserva();
        Object.assign(booking, bookingDto);
        booking.evento = evento;
        
        const { id, fecha_reserva } = await repo.save(booking);

        return res
            .status(201)
            .json({ booking: { id, fecha_reserva, ...booking } });        
    }

    async getBookings(req: any, res: any) {
        const query = req.query;

        const getBookingsDto: GetBookingsDTO = Object.assign(new GetBookingsDTO(), query);
        const validationErrors = await validate(getBookingsDto);

        if (validationErrors.length) {
            return res.status(422).json({ error: validationErrors });
        } else if (getBookingsDto.cantidad_boletos <= 0) {
            return res.status(422).json({ error: "La cantidad de boletos no puede ser menor o igual a 0" });
        }

        const { id, evento_id, nombre_usuario, fecha_reserva, cantidad_boletos } = getBookingsDto;

        const whereCondition: FindOptionsWhere<Reserva> = {
            ...(id && { id }),
            ...(evento_id && { evento: { id } }),
            ...(nombre_usuario && { nombre_usuario }),
            ...(fecha_reserva && { fecha_reserva }),
            ...(cantidad_boletos && { cantidad_boletos }),
        };

        const [reservas, total] = await repo.findAndCount();

        return res.json({ reservas, total });
    }

    async getBookingById(req: any, res: any) {
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
            const reserva = await repo.findOneByOrFail({ id });
            return res.json({ reserva });
        } catch (err: any) {
            return res.sendStatus(404);
        }
    }

    async updateBooking(req: any, res: any) {
        const id = req.params.id as string;

        if (!id) {
            return res.sendStatus(422);
        }

        const updateBookingDto: UpdateBookingDTO = Object.assign(new UpdateBookingDTO(), { ...req.body, id });
        const validationErrors = await validate(updateBookingDto);

        if (validationErrors.length) {
            return res.status(422).json({ error: validationErrors });
        }

        try {
            const reserva = await repo.findOneByOrFail({ id });
            Object.assign(reserva, updateBookingDto);
            await repo.save(reserva);
            return res.json({ reserva });
        } catch (err: any) {
            return res.sendStatus(404);
        }
    }

    async deleteBooking(req: any, res: any) {
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
}