import express from "express";
import {
  getSemuaHafalan,
  getHafalanPerSantri,
  tambahHafalan,
  updateHafalan,
} from "../controllers/hafalanController.js";

const routes = express.Router();

routes.get("/", getSemuaHafalan);
routes.get("/:santriId", getHafalanPerSantri);
routes.post("/", tambahHafalan);
routes.put("/:id", updateHafalan);

export default routes;
