import { Router } from "express";

import { ActualizarPropiedad, AñadirPropiedad, ListarPropiedad, EliminarPropiedad, ListarPropiedades } from "../controllers/properties.controllers.js";

const router = Router();

router.get("/property/:id", ListarPropiedad);
router.get("/property", ListarPropiedades);
router.post("/property", AñadirPropiedad);
router.put("/property/:id", ActualizarPropiedad);
router.delete("/property/:id", EliminarPropiedad);

export default router;