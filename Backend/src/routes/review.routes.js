import { Router } from "express";

import { ActualizarReseña, AñadirReseña, ListarReseña, EliminarReseña, ListarReseñas } from "../controllers/reviews.controllers.js";

const router = Router();

router.get("/review/:id", ListarReseña);
router.get("/review", ListarReseñas);
router.post("/review", AñadirReseña);
router.put("/review/:id", ActualizarReseña);
router.delete("/review/:id", EliminarReseña);

export default router;