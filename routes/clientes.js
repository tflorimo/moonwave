import { Router } from "express";
import ClientesController from "../controllers/ClientesController.js";

const clientesRoutes = Router();
const clientesController = new ClientesController();

clientesRoutes.get("/", clientesController.getAllClientes);
clientesRoutes.get("/:id", clientesController.getClienteById);
clientesRoutes.get("/:id/ventas", clientesController.getVentasByClienteId);
clientesRoutes.post("/", clientesController.createCliente);
clientesRoutes.put("/:id", clientesController.updateCliente);
clientesRoutes.delete("/:id", clientesController.deleteCliente);

export default clientesRoutes;