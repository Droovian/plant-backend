import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  layoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Layout', required: true },
  userId: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model('Task', taskSchema);