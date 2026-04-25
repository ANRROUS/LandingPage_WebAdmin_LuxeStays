import {Router} from "express";

import { RegistrarVisita, ListarVisitas } from "../controllers/visit.controllers.js";

const router = Router();

router.post("/visit", RegistrarVisita);
router.get("/visit", ListarVisitas);

export default router;