import {
  CombinedResource,
  Resource,
  ResourceOnExchange,
} from "./../interfaces/Resource.interface";
import { getAllExchages } from "./exchange.service";
import { getAllResources } from "./resource.service";

// get the updated exchanges but api sends withourt the names
// Ned send a date to get the changes between the actual prices and the date

const exchangesWithoutName = getAllExchages();

// get the products with the names
const resourcesWithName = getAllResources();

// Esperar a que ambas solicitudes se completen usando async/await
async function getCombinedExchanges(): Promise<CombinedResource[] | null> {
  try {
    const [resWithoutNames, resWithNames] = await Promise.all([
      exchangesWithoutName,
      resourcesWithName,
    ]);

    const productsWithoutName = resWithoutNames;
    const productsWithName = resWithNames;

    // Combinar los datos en un solo objeto
    const productosCombinados: CombinedResource[] = productsWithoutName.map(
      (noNamedProduct: ResourceOnExchange) => {
        const namedProduct = productsWithName.find(
          (namedProduct: Resource) =>
            namedProduct.db_letter === noNamedProduct.kind
        );
        const adaptedExchange: CombinedResource = {
          name: namedProduct ? namedProduct.name : "",
          kind: noNamedProduct.kind,
          image: noNamedProduct.image,
          is_up: noNamedProduct.is_up,
          price: noNamedProduct.price,
          realmId: noNamedProduct.realmId,
        };
        return adaptedExchange;
      }
    );

    // Enviar la respuesta al cliente con los productos combinados
    return productosCombinados;
  } catch (error) {
    // Manejar errores aquí
    throw new Error("Error al obtener los datos combinados.");
  }
}

export { getCombinedExchanges };
