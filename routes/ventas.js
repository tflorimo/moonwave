import { Router } from "express";
import VentasController from "../controllers/VentasController.js";

const ventasController = new VentasController();
const ventasRoutes = Router();

ventasRoutes.get("/", ventasController.getAllVentas);
ventasRoutes.get("/:id", ventasController.getVentaById);
ventasRoutes.post("/", ventasController.createVenta);
ventasRoutes.put("/:id", ventasController.editVenta);
ventasRoutes.delete("/:id", ventasController.deleteVenta);


export default ventasRoutes;