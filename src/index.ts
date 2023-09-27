import "dotenv/config";
import express from "express";
import cors from "cors";
import cron from "node-cron";
import { router } from "./routes";
import { fetchDataAndCache } from "./cron/exchanges.task";
const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());

app.use(router);

// Configurar un cron job para ejecutar la función cada minuto
// cron.schedule("* * * * *", () => {
//   return fetchDataAndCache();
// });
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
