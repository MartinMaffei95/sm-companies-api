import apiCache from "../cache/cache";
import { getCombinedExchanges } from "../services/get-exchanges.service";
const NodeCache = require("node-cache");

async function fetchDataAndCache() {
  try {
    console.log(">>> Fetching to sim-companies api...");
    const response = await getCombinedExchanges();
    if (!response) {
      return;
    }
    const data = response;
    apiCache.set("combined-exchanges", data, 60); // Almacenar durante 60 segundos
    console.log(">>> Cron-exchanges-task : SUCCESS - caché updated.");
    return data;
  } catch (error) {
    console.error(
      ">>> Cron-exchanges-task : ERROR - caché not updated.",
      error
    );
  }
}

export { fetchDataAndCache };
