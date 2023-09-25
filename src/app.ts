import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "../routes";
import { fetchDataAndCache } from "../cron/exchanges.task";
import cron from "node-cron";
const app = express();
const PORT = 3000; // Puerto en el que se ejecutará tu servidor

app.use(cors());
app.use(express.json());

app.use(router);

// Configurar un cron job para ejecutar la función cada minuto
cron.schedule("* * * * *", () => {
  fetchDataAndCache();
});
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
