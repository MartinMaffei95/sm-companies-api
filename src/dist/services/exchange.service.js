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
exports.getAllExchages = void 0;
const axios_1 = __importDefault(require("axios"));
const getAllExchages = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //today
        const actualTick = new Date();
        //yesterday (today -1)
        const yesterdayTick = new Date(actualTick);
        yesterdayTick.setDate(actualTick.getDate() - 1);
        //formating the dat for the api
        const formattedTick = yesterdayTick.toISOString();
        const response = yield axios_1.default.get(`${process.env.SIMCOMPANIES_API_V2}/market-ticker/0/${formattedTick}`, {
            headers: {
                "sec-ch-ua": '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"',
            },
        });
        const data = response.data;
        return data;
    }
    catch (error) {
        // console.error(error);
    }
});
exports.getAllExchages = getAllExchages;
