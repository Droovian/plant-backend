import { z } from "zod";

export const plantSchema = z.object({
    common_name: z.string().min(1, "Common name is required."),
    scientific_name: z.string().min(1, "Scientific name is required."),
    category: z.string().optional(),
    region: z.string().optional(),
    ideal_conditions: z.object({
      soil_type: z.array(z.string()).optional(),
      temperature_range: z
        .object({
          min: z.number().optional(),
          max: z.number().optional(),
        })
        .optional(),
      sunlight: z.string().optional(),
      watering_frequency: z.string().optional(),
      pH_range: z
        .object({
          min: z.number().optional(),
          max: z.number().optional(),
        })
        .optional(),
      fertilizer: z.string().optional(),
    }).optional(),
    growth_info: z
      .object({
        time_to_harvest: z.string().optional(),
        sowing_season: z.array(z.string()).optional(),
        spacing: z.string().optional(),
        plant_height: z.string().optional(),
      })
      .optional(),
    maintenance: z
      .object({
        pruning: z.string().optional(),
        pest_control: z
          .array(
            z.object({
              pest: z.string().optional(),
              solution: z.string().optional(),
            })
          )
          .optional(),
      })
      .optional(),
    yield: z
      .object({
        per_plant: z.string().optional(),
        optimal_yield: z.string().optional(),
      })
      .optional(),
    popular_varieties: z.array(z.string()).optional(),
    uses: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    notes: z.string().optional(),
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

export const layoutSchemaZod = z.object({
  userId: z.string(),
  grid: z.object({
    rows: z.array(
      z.array(
        z.object({
          plantName: z.string().default(""),
        })
      )
    ),
  }),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});