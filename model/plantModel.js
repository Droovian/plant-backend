import mongoose from "mongoose";

const fertigationScheduleSchema = new mongoose.Schema({
  stage: { type: String, required: false },
  duration_days: { type: Number, required: false },
  fertilizer_type: { type: String, required: false },
  total_amount_kg_per_ha: { type: Number, required: false },
  nutrient_supplied: {
    nitrogen: { type: Number, required: false },
    phosphorus: { type: Number, required: false },
    potassium: { type: Number, required: false },
  },
  percentage_of_requirement: {
    nitrogen: { type: Number, required: false },
    phosphorus: { type: Number, required: false },
    potassium: { type: Number, required: false },
  },
});

const pestManagementSchema = new mongoose.Schema({
  pest: { type: String, required: false },
  control_measures: { type: [String], required: false },
});

const diseaseManagementSchema = new mongoose.Schema({
  disease: { type: String, required: false },
  control_measures: { type: [String], required: false },
});

const cultivationPracticesSchema = new mongoose.Schema({
  land_preparation: { type: [String], required: false },
  planting: {
    method: { type: String, required: false },
    spacing: { type: String, required: false },
    depth: { type: String, required: false },
    season: { type: [String], required: false },
  },
  irrigation: {
    method: { type: String, required: false },
    schedule: { type: String, required: false },
    details: { type: [String], required: false },
  },
  fertilization: {
    basal_application: { type: [String], required: false },
    top_dressing: { type: [String], required: false },
    fertigation_schedule: { type: [fertigationScheduleSchema], required: false },
  },
  weed_management: { type: [String], required: false },
  pest_management: { type: [pestManagementSchema], required: false },
  disease_management: { type: [diseaseManagementSchema], required: false },
  pruning: { type: String, required: false },
  staking: { type: String, required: false },
  harvesting: {
    method: { type: String, required: false },
    indicators: { type: String, required: false },
    post_harvest_handling: { type: String, required: false },
  },
});

const physiologicalDisorderSchema = new mongoose.Schema({
  nutrient: { type: String, required: true },
  deficiency_symptoms: { type: String, required: true },
  corrective_measures: { type: String, required: true },
});

const plantSchema = new mongoose.Schema(
  {
    common_name: { type: String, required: true },
    scientific_name: { type: String, required: true },
    category: { type: String, required: false },
    region: { type: String, required: false },
    ideal_conditions: { type: Object, required: false },
    cultivation_practices: { type: cultivationPracticesSchema, required: false },
    yield: {
      per_plant: { type: String, required: false },
      per_hectare: { type: String, required: false },
    },
    popular_varieties: { type: [String], required: false },
    uses: { type: [String], required: false },
    images: { type: [String], required: false },
    notes: { type: String, required: false },
    physiological_disorders: { type: [physiologicalDisorderSchema], required: false },
  },
  { timestamps: true }
);

export const PlantModel = mongoose.model("Plant", plantSchema);
