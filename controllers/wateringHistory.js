import { WateringHistory } from "../model/wateringHistoryModel.js";

// Create or Update Watering History
export const createOrUpdateWateringHistory = async (req, res) => {
  try {
    const { layoutId, plantName, date } = req.body;

    let wateringRecord = await WateringHistory.findOne({ layoutId, plantName });

    if (wateringRecord) {
      if (!wateringRecord.wateringDates.includes(date)) {
        wateringRecord.wateringDates.push(date);
        await wateringRecord.save();
      }
      res.status(200).json(wateringRecord);
    } else {
      const newWateringRecord = new WateringHistory({
        layoutId,
        plantName,
        wateringDates: [date],
      });
      await newWateringRecord.save();
      res.status(201).json(newWateringRecord);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Watering History by Layout ID
export const getWateringHistoryByLayoutId = async (req, res) => {
  try {
    const { layoutId } = req.params;
    const wateringHistory = await WateringHistory.find({ layoutId });
    res.status(200).json(wateringHistory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Watering History by Plant Name
export const getWateringHistoryByPlantName = async (req, res) => {
    try {
        const { plantName } = req.params;
        const wateringHistory = await WateringHistory.find({ plantName });
        res.status(200).json(wateringHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Watering History by Plant Name and Layout ID
export const getWateringHistoryByPlantNameAndLayoutId = async (req, res) => {
    try {
        const { plantName, layoutId } = req.params;
        const wateringHistory = await WateringHistory.find({ plantName, layoutId });
        res.status(200).json(wateringHistory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Delete Watering History by ID
export const deleteWateringHistoryById = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedWateringHistory = await WateringHistory.findByIdAndDelete(id);
        if(!deletedWateringHistory){
            return res.status(404).json({ message: "Watering history not found" });
        }
        res.status(200).json({ message: "Watering history deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//Delete Watering History by layoutId and PlantName.
export const deleteWateringHistoryByLayoutIdAndPlantName = async (req, res) => {
    try{
        const { layoutId, plantName } = req.params;
        const deletedWateringHistory = await WateringHistory.deleteMany({layoutId, plantName});
        if(deletedWateringHistory.deletedCount === 0){
            return res.status(404).json({message: "Watering history not found"});
        }
        res.status(200).json({message: "Watering history deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//Get all watering history.
export const getAllWateringHistory = async (req, res) => {
    try{
        const wateringHistory = await WateringHistory.find({});
        res.status(200).json(wateringHistory);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};