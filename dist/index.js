"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 80;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.router);
// Configurar un cron job para ejecutar la función cada minuto
// cron.schedule("* * * * *", () => {
//   return fetchDataAndCache();
// });
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
