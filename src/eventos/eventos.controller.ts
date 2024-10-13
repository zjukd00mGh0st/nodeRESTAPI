import { Router } from "express";
import { EventosService } from "./eventos.service"
    

export const router = Router();

const eventosService = new EventosService();

router.post("/", eventosService.createEvent);
router.get("/", eventosService.getEvents);
router.get("/:id", eventosService.getEventById);
router.delete("/:id", eventosService.deleteEvent);
router.put("/:id", eventosService.updateEvent);

export { router as EventosRouter };