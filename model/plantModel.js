import mongoose from "mongoose";

const pestControlSchema = new mongoose.Schema({
  pest: { type: String, required: false },
  solution: { type: String, required: false }, 
});

const idealConditionsSchema = new mongoose.Schema({
  soil_type: { type: [String], required: false }, 
  temperature_range: {
    min: { type: Number, required: false },
    max: { type: Number, required: false }, 
  },
  sunlight: { type: String, required: false },
  watering_frequency: { type: String, required: false },
  pH_range: {
    min: { type: Number, required: false },
    max: { type: Number, required: false },
  },
  fertilizer: { type: String, required: false },
});

const growthInfoSchema = new mongoose.Schema({
  time_to_harvest: { type: String, required: false },
  sowing_season: { type: [String], required: false },
  spacing: { type: String, required: false },
  plant_height: { type: String, required: false },
});

const maintenanceSchema = new mongoose.Schema({
  pruning: { type: String, required: false },
  pest_control: [pestControlSchema],
});

const yieldSchema = new mongoose.Schema({
  per_plant: { type: String, required: false },
  optimal_yield: { type: String, required: false },
});

const plantSchema = new mongoose.Schema(
  {
    common_name: { type: String, required: true }, 
    scientific_name: { type: String, required: true }, 
    category: { type: String, required: false }, 
    region: { type: String, required: false },
    ideal_conditions: { type: idealConditionsSchema, required: false }, 
    growth_info: { type: growthInfoSchema, required: false }, 
    maintenance: { type: maintenanceSchema, required: false }, 
    yield: { type: yieldSchema, required: false }, 
    popular_varieties: { type: [String], required: false }, 
    uses: { type: [String], required: false },
    images: { type: [String], required: false }, 
    notes: { type: String, required: false }, 
  },
  { timestamps: true } 
);

export const PlantModel = mongoose.model("Plant", plantSchema);
