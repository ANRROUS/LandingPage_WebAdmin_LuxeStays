import { Router } from "express";

import { ActualizarServicio, AñadirServicio, ListarServicio, EliminarServicio, ListarServicios } from "../controllers/services.controllers.js";

const router = Router();

router.get("/service/:id", ListarServicio);
router.get("/service", ListarServicios);
router.post("/service", AñadirServicio);
router.put("/service/:id", ActualizarServicio);
router.delete("/service/:id", EliminarServicio);

export default router;