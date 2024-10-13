import { Router } from "express";
import * as eventosService from "./eventos.service"
    

export const router = Router();

router.post("/", eventosService.createEvent);
router.get("/", eventosService.getEvents);
router.get("/:id", eventosService.getEventById);
router.delete("/:id", eventosService.deleteEvent);
router.put("/:id", eventosService.updateEvent);
