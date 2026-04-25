import { Router } from "express";

import { ActualizarCliente, AñadirCliente, ListarCliente, EliminarCliente, ListarClientes } from "../controllers/clients.controllers.js";

const router = Router();

router.get("/client/:id", ListarCliente);
router.get("/client", ListarClientes);
router.post("/client", AñadirCliente);
router.put("/client/:id", ActualizarCliente);
router.delete("/client/:id", EliminarCliente);

export default router;