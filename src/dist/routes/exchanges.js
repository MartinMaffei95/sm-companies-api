"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const cache_1 = __importDefault(require("../cache/cache"));
const exchanges_task_1 = require("../cron/exchanges.task");
const router = (0, express_1.Router)();
exports.router = router;
/**
 * returns updated exhcanges
 */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (cache_1.default.has("combined-exchanges")) {
            const cachedData = cache_1.default.get("combined-exchanges");
            res.json(cachedData);
        }
        else {
            const data = yield (0, exchanges_task_1.fetchDataAndCache)();
            res.json(data);
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "Error al obtener los datos de la API externa." });
    }
}));
