import { Router } from "express";
import { BookingService } from "./reservas.service";

const router = Router();
const bookingService = new BookingService();

router.post("/", bookingService.createBooking);
router.get("/", bookingService.getBookings);
router.get("/:id", bookingService.getBookingById);
router.put("/:id", bookingService.updateBooking);
router.delete("/:id", bookingService.deleteBooking);

export { router as ReservasRouter };