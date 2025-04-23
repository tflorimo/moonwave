import { Router } from "express";
import clientesRoutes from "./clientes.js";
import inversionesRoutes from "./inversiones.js";
import ventasRoutes from "./ventas.js";

const routes = Router();
routes.use("/api/clientes", clientesRoutes);
routes.use("/api/inversiones", inversionesRoutes);
routes.use("/api/ventas", ventasRoutes);

export default routes;