import { Router } from "express";

import { ActualizarReserva, AñadirReserva, ListarReserva, EliminarReserva, ListarReservas } from "../controllers/reservations.controllers.js";

const router = Router();

router.get("/reservation/:id", ListarReserva);
router.get("/reservation", ListarReservas);
router.post("/reservation", AñadirReserva);
router.put("/reservation/:id", ActualizarReserva);
router.delete("/reservation/:id", EliminarReserva);

export default router;