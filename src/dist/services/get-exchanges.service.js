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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCombinedExchanges = void 0;
const exchange_service_1 = require("./exchange.service");
const resource_service_1 = require("./resource.service");
// get the updated exchanges but api sends withourt the names
// Ned send a date to get the changes between the actual prices and the date
const exchangesWithoutName = (0, exchange_service_1.getAllExchages)();
// get the products with the names
const resourcesWithName = (0, resource_service_1.getAllResources)();
// Esperar a que ambas solicitudes se completen usando async/await
function getCombinedExchanges() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const [resWithoutNames, resWithNames] = yield Promise.all([
                exchangesWithoutName,
                resourcesWithName,
            ]);
            const productsWithoutName = resWithoutNames;
            const productsWithName = resWithNames;
            // Combinar los datos en un solo objeto
            const productosCombinados = productsWithoutName.map((noNamedProduct) => {
                const namedProduct = productsWithName.find((namedProduct) => namedProduct.db_letter === noNamedProduct.kind);
                const adaptedExchange = {
                    name: namedProduct ? namedProduct.name : "",
                    kind: noNamedProduct.kind,
                    image: noNamedProduct.image,
                    is_up: noNamedProduct.is_up,
                    price: noNamedProduct.price,
                    realmId: noNamedProduct.realmId,
                };
                return adaptedExchange;
            });
            // Enviar la respuesta al cliente con los productos combinados
            return productosCombinados;
        }
        catch (error) {
            // Manejar errores aquí
            throw new Error("Error al obtener los datos combinados.");
        }
    });
}
exports.getCombinedExchanges = getCombinedExchanges;
