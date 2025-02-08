import { z } from "zod";
import { GardenLayout } from "../model/layoutModel.js";

export const createLayout = async (req, res) => {

    // const parseResult = layoutSchema.safeParse(req.body);

    // if (!parseResult.success) {
    //     return res.status(400).json({
    //         error: parseResult.error.errors.map(err => err.message).join(', '),
    //     });
    // }

    const { name, rows, columns, cellSize, unit, cells, userId } = req.body;

    try {
        const layout = await GardenLayout.create({
            name,
            rows,
            columns,
            cellSize,
            unit,
            cells,
            userId,
        });

        if (layout) {
            res.status(201).json(layout);
        } else {
            res.status(400).json({ error: 'Invalid layout data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}