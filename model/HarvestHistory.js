import mongoose from 'mongoose';

const harvestHistorySchema = new mongoose.Schema({
  layoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Layout', required: true },
  userId: { type: String, ref: 'User', required: true }, // Add userId for authorization
  plantName: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const HarvestHistory = mongoose.model('HarvestHistory', harvestHistorySchema);