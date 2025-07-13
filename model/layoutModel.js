import mongoose from "mongoose";

const layoutSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    grid: {
      type: {
        rows: [
          [
            {
              plantName: {
                type: String,
                default: "",
              },
            },
          ],
        ],
      },
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Layout = mongoose.model("Layout", layoutSchema);
