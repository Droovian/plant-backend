import { z } from "zod";

export const plantSchema = z.object({
  common_name: z.string().min(1, "Common name is required."),
  scientific_name: z.string().min(1, "Scientific name is required."),
  category: z.string().optional(),
  region: z.string().optional(),
  ideal_conditions: z.object({
    soil_type: z.array(z.string()).optional(),
    temperature_range: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
    }).optional(),
    sunlight: z.string().optional(),
    watering_frequency: z.string().optional(),
    pH_range: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
    }).optional(),
  }).optional(),
  cultivation_practices: z.object({
    land_preparation: z.array(z.string()).optional(),
    planting: z.object({
      method: z.string().optional(),
      spacing: z.string().optional(),
      depth: z.string().optional(),
      season: z.array(z.string()).optional(),
    }).optional(),
    irrigation: z.object({
      method: z.string().optional(),
      schedule: z.string().optional(),
      details: z.array(z.string()).optional(),
    }).optional(),
    fertilization: z.object({
      basal_application: z.array(z.string()).optional(), // This refers to fertilizers applied before or at the time of planting, usually mixed into the soil. These fertilizers provide essential nutrients for early plant growth.
      top_dressing: z.array(z.string()).optional(), // This refers to fertilizers applied after the plant has started growing, usually as a supplement to promote healthy development at different stages (vegetative, flowering, fruiting).
      fertigation_schedule: z.array(z.object({
        stage: z.string().optional(),
        duration_days: z.number().optional(),
        fertilizer_type: z.string().optional(),
        total_amount_kg_per_ha: z.number().optional(),
        nutrient_supplied: z.object({
          nitrogen: z.number().optional(),
          phosphorus: z.number().optional(),
          potassium: z.number().optional(),
        }).optional(),
        percentage_of_requirement: z.object({
          nitrogen: z.number().optional(),
          phosphorus: z.number().optional(),
          potassium: z.number().optional(),
        }).optional(),
      })).optional(),
    }).optional(),
    weed_management: z.array(z.string()).optional(),
    pest_management: z.array(z.object({
      pest: z.string().optional(),
      control_measures: z.array(z.string()).optional(),
    })).optional(),
    disease_management: z.array(z.object({
      disease: z.string().optional(),
      control_measures: z.array(z.string()).optional(),
    })).optional(),
    pruning: z.string().optional(),
    staking: z.string().optional(),
    harvesting: z.object({
      method: z.string().optional(),
      indicators: z.string().optional(),
      post_harvest_handling: z.string().optional(),
    }).optional(),
  }).optional(),
  yield: z.object({
    per_plant: z.string().optional(),
    per_hectare: z.string().optional(),
  }).optional(),
  popular_varieties: z.array(z.string()).optional(),
  uses: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
  notes: z.string().optional(),
  physiological_disorders: z.array(
    z.object({
      nutrient: z.string().min(1, "Nutrient name is required."),
      deficiency_symptoms: z.string().min(1, "Deficiency symptoms are required."),
      corrective_measures: z.string().min(1, "Corrective measures are required."),
    })
  ).optional(),
});

export const postSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    userId: z.string(),
    type: z.string().optional(),
});

export const commentSchema = z.object({
    text: z.string().min(4, 'Text is required'),
    userId: z.string(),
    postId: z.string(),
});

export const userSchema = z.object({
    clerkId: z.string(),
    name: z.string(),
    email: z.string().email(),
});
