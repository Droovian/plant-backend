import mongoose from "mongoose";

const wateringHistorySchema = new mongoose.Schema({
    layoutId: {
      type: String,
      required: true,
    },
    plantName: {
      type: String,
      required: true,
    },
    wateringDates: [{
      type: String,
    }],
});

export const WateringHistory = mongoose.model("WateringHistory", wateringHistorySchema);
