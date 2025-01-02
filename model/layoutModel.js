import mongoose from "mongoose";

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

const gardenLayoutSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    rows: {
        type: Number,
        required: true,
    },
    columns: {
        type: Number,
        required: true,
    },
    cellSize: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    cells: {
        type: Array,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
});

export const GardenLayout = mongoose.model("GardenLayout", gardenLayoutSchema);