import { Router } from "express";
import { getAllResources } from "../services/resource.service";

const router = Router();
/**
 * returns updated exhcanges
 */
router.get("/", async (req, res) => {
  try {
    const data = await getAllResources();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los datos de la API externa.asd" });
  }
});

export { router };
