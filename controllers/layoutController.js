import { Layout } from '../model/layoutModel.js';
import { layoutSchemaZod } from '../zod/schema.js';

export const createLayout = async (req, res) => {
    try {
        const validatedData = layoutSchemaZod.parse(req.body);
        const layout = new Layout(validatedData);
        await layout.save();
        res.status(201).json({ message: 'Layout created successfully', layout });
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        console.error('Error creating layout:', error);
        res.status(500).json({ message: 'Failed to create layout', error: error.message });
    }
};

export const getLayout = async (req, res) => {
    try {
        const { id } = req.params;
        const layout = await Layout.findById(id);
        if (!layout) {
            return res.status(404).json({ message: 'Layout not found' });
        }
        res.status(200).json(layout);
    } catch (error) {
        console.error('Error getting layout:', error);
        res.status(500).json({ message: 'Failed to get layout', error: error.message });
    }
};

export const getLayoutsByUser = async (req, res) => {
    try {
      const userId = req.query.userId; // Retrieve userId from query parameters
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      const layouts = await Layout.find({ userId }); // Find layouts by userId
      res.status(200).json(layouts);
    } catch (error) {
      console.error('Error getting layouts by user:', error);
      res.status(500).json({ message: 'Failed to get layouts', error: error.message });
    }
  };

export const updateLayout = async (req, res) => {
    try {
        const { id } = req.params;
        const validatedData = layoutSchemaZod.parse(req.body);
        const updatedLayout = await Layout.findByIdAndUpdate(id, validatedData, { new: true });
        if (!updatedLayout) {
            return res.status(404).json({ message: 'Layout not found' });
        }
        res.status(200).json({ message: 'Layout updated successfully', updatedLayout });
    } catch (error) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ message: 'Validation error', errors: error.errors });
        }
        console.error('Error updating layout:', error);
        res.status(500).json({ message: 'Failed to update layout', error: error.message });
    }
};

export const deleteLayout = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedLayout = await Layout.findByIdAndDelete(id);
        if (!deletedLayout) {
            return res.status(404).json({ message: 'Layout not found' });
        }
        res.status(200).json({ message: 'Layout deleted successfully', deletedLayout });
    } catch (error) {
        console.error('Error deleting layout:', error);
        res.status(500).json({ message: 'Failed to delete layout', error: error.message });
    }
};