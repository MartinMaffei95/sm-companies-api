"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const routes_1 = require("./routes");
const exchanges_task_1 = require("./cron/exchanges.task");
const app = (0, express_1.default)();
const PORT = 3000; // Puerto en el que se ejecutará tu servidor
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.router);
// Configurar un cron job para ejecutar la función cada minuto
node_cron_1.default.schedule("* * * * *", () => {
    (0, exchanges_task_1.fetchDataAndCache)();
});
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
