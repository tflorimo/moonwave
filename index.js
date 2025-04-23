import express from "express";
import routes from "./routes/routes.js";
import { PORT } from "./config/config.js";

const app = express();
const serverPort = PORT;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.use(routes);

app.get("/", (req, res) => {
    res.sendFile("index.html", {root: "public"});
})

app.get("/ventas", (req, res) => {
    res.sendFile("ventas.html", {root: "public"});
})

app.use((req, res) => {
    res.status(404).send({success: false, message: "No encontrado"});
})

app.listen(serverPort, () => {
    console.log(`Servidor corriendo en el puerto ${serverPort}`);
    console.log(`http://localhost:${serverPort}`);
})