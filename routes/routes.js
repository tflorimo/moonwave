import { Router } from "express";
import clientesRoutes from "./clientes.js";
import inversionesRoutes from "./inversiones.js";
import ventasRoutes from "./ventas.js";

const routes = Router();
routes.use("/clientes", clientesRoutes);
routes.use("/inversiones", inversionesRoutes);
routes.use("/ventas", ventasRoutes);

export default routes;