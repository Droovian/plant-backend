import express from 'express';
import {
  getHarvestHistoryByLayout,
  createHarvest,
  deleteHarvest,
} from '../controllers/harvestHistory.js';

const router = express.Router();

// Routes
router.get('/layout/:layoutId', getHarvestHistoryByLayout);
router.post('/', createHarvest);
router.delete('/:id', deleteHarvest);

export default router;