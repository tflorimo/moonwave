import { Router } from "express";
import InversionesController from "../controllers/InversionesController.js";

const inversionesController = new InversionesController();
const inversionesRoutes = Router();

inversionesRoutes.get("/", inversionesController.getAllInversiones);
inversionesRoutes.get("/:id", inversionesController.getInversionById);
inversionesRoutes.post("/", inversionesController.createInversion);
inversionesRoutes.put("/:id", inversionesController.editInversion);
inversionesRoutes.delete("/:id", inversionesController.deleteInversion);


export default inversionesRoutes;