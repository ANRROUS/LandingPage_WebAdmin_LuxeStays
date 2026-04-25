import { Router } from "express";

import { ActualizarTrabajadores, AñadirTrabajador, ListarTrabajador, EliminarTrabajador, ListarTrabajadores } from "../controllers/personal.controllers.js";

const router = Router();

router.get("/personal/:id", ListarTrabajador);
router.get("/personal", ListarTrabajadores);
router.post("/personal", AñadirTrabajador);
router.put("/personal/:id", ActualizarTrabajadores);
router.delete("/personal/:id", EliminarTrabajador);

export default router;