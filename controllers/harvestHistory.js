import { HarvestHistory } from "../model/HarvestHistory.js";

// Get harvest history for a layout
export const getHarvestHistoryByLayout = async (req, res) => {
  try {
    const harvests = await HarvestHistory.find({ layoutId: req.params.layoutId, userId: req.userId });
    res.json(harvests);
  } catch (error) {
    console.error('Error fetching harvest history:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new harvest record
export const createHarvest = async (req, res) => {
  try {
    const { layoutId, userId, plantName, date } = req.body;
    if (userId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (!plantName || !date) {
      return res.status(400).json({ message: 'Plant name and date are required' });
    }
    const harvest = new HarvestHistory({ layoutId, userId, plantName, date });
    await harvest.save();
    res.status(201).json(harvest);
  } catch (error) {
    console.error('Error creating harvest:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a harvest record
export const deleteHarvest = async (req, res) => {
  try {
    const harvest = await HarvestHistory.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!harvest) {
      return res.status(404).json({ message: 'Harvest record not found or unauthorized' });
    }
    res.json({ message: 'Harvest record deleted' });
  } catch (error) {
    console.error('Error deleting harvest:', error);
    res.status(500).json({ message: 'Server error' });
  }
};