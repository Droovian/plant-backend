import { z } from "zod";
import { GardenLayout } from "../model/layoutModel.js";
/*
interface GardenLayout {
  id?: string;
  name: string;
  rows: number;
  columns: number;
  cellSize: number;
  unit: 'feet' | 'meters';
  cells: GridCell[];
  userId: string;
}
*/

const layoutSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    rows: z.number().int().min(1, 'Rows must be at least 1'),
    columns: z.number().int().min(1, 'Columns must be at least 1'),
    cellSize: z.number().int().min(1, 'Cell size must be at least 1'),
    unit: z.enum(['feet', 'meters']),
    cells: z.array(z.object({
        row: z.number().int().min(0, 'Row must be at least 0'),
        column: z.number().int().min(0, 'Column must be at least 0'),
        plant: z.string().min(1, 'Plant name is required'),
    })),
    userId: z.string(),
});

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