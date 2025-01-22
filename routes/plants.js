import express from 'express';

const router = express.Router();
import { addPlant, showAllPlants, showPlantById, updatePlantDeets, deletePlantById } from '../controllers/plantController.js';

router.post('/', addPlant);
router.get('/:id', showPlantById);
router.put('/:id', updatePlantDeets);
router.get('/', showAllPlants);
router.delete('/:id', deletePlantById);
export default router;