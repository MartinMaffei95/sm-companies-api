import { Router } from "express";
import { getAllExchages } from "../services/exchange.service";
import apiCache from "../cache/cache";
import { fetchDataAndCache } from "../cron/exchanges.task";

const router = Router();
/**
 * returns updated exhcanges
 */
router.get("/", async (req, res) => {
  try {
    if (apiCache.has("combined-exchanges")) {
      const cachedData = apiCache.get("combined-exchanges");
      res.json(cachedData);
    } else {
      const data = await fetchDataAndCache();
      res.json(data);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los datos de la API externa." });
  }
});

export { router };
