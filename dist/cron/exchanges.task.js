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
exports.fetchDataAndCache = void 0;
const cache_1 = __importDefault(require("../cache/cache"));
const get_exchanges_service_1 = require("../services/get-exchanges.service");
const NodeCache = require("node-cache");
function fetchDataAndCache() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(">>> Fetching to sim-companies api...");
            const response = yield (0, get_exchanges_service_1.getCombinedExchanges)();
            if (!response) {
                return;
            }
            const data = response;
            cache_1.default.set("combined-exchanges", data, 60); // Almacenar durante 60 segundos
            console.log(">>> Cron-exchanges-task : SUCCESS - caché updated.");
            return data;
        }
        catch (error) {
            console.error(">>> Cron-exchanges-task : ERROR - caché not updated.", error);
        }
    });
}
exports.fetchDataAndCache = fetchDataAndCache;
