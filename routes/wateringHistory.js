import express from "express";
const router = express.Router();

import {
  getAllWateringHistory,
  getWateringHistoryByLayoutId,
  createOrUpdateWateringHistory,
  deleteWateringHistoryById,
  deleteWateringHistoryByLayoutIdAndPlantName,
  getWateringHistoryByPlantName,
  getWateringHistoryByPlantNameAndLayoutId
} from "../controllers/wateringHistory.js";

router.get("/", getAllWateringHistory);

router.get("/layout/:layoutId", getWateringHistoryByLayoutId);

router.post("/", createOrUpdateWateringHistory);

router.delete("/:id", deleteWateringHistoryById);

router.delete("/layout/:layoutId/:plantName", deleteWateringHistoryByLayoutIdAndPlantName);

router.get("/plant/:plantName", getWateringHistoryByPlantName);

router.get("/plant/:plantName/layout/:layoutId", getWateringHistoryByPlantNameAndLayoutId);

export default router;