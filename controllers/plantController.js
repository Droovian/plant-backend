import { z } from "zod";
import { PlantModel } from "../model/plantModel.js";
import client from "../redis/client.js";

const plantSchema = z.object({
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

export const addPlant = async (req, res) => {
    try {
        const parsedPlant = plantSchema.safeParse(req.body);

        if (!parsedPlant.success) {
            return res.status(400).json({
                error: parsedPlant.error.errors.map((err) => err.message).join(", "),
            });
        }

        const plant = await PlantModel.create(req.body);

        if (plant) {
            res.status(201).json(plant);
        } else {
            res.status(400).json({ error: "Invalid plant data" });
        }
    }
    catch(error){
          return res.status(500).json({
            message: "An error occurred while adding the plant",
            error: error.message,
          });
    }
}

export const showAllPlants = async (req, res) => {
    try {
        // Check Redis cache
        const cachedPlants = await client.json.get('plants');

        if (cachedPlants) {
            return res.status(200).json(cachedPlants);
        }

        // Fetch from DB
        const plants = await PlantModel.find().lean(); // Ensure plain JSON
        await client.json.set('plants', '$', plants); // Store as JSON
        await client.expire('plants', 3600); // Set expiration separately

        res.status(200).json(plants);
    } catch (error) {
        console.error("Error fetching plants:", error);
        return res.status(500).json({
            message: "An error occurred while fetching plants",
            error: error.message,
        });
    }
};


export const showPlantById = async (req, res) => {

    const { id: plantId } = req.params;
    const plantCacheKey = `plant:${plantId}`;

    try {
        let cachedPlant = null;

        try{
            cachedPlant = await client.json.get(plantCacheKey);
        }
        catch(redisError){
            console.error("Redis error (fallback to DB):", redisError.message);
        }
        if(cachedPlant){
            return res.status(200).json(cachedPlant);
        }

        const plant = await PlantModel.findById(plantId).lean();

        try{
            await client.json.set(plantCacheKey, '$', plant);
            await client.expire(plantCacheKey, 3600);
        }
        catch(redisError){
            console.error("Redis error (could not cache):", redisError.message);
        }

        res.status(200).json(plant);
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching plant",
            error: error.message,
        });
    }
}

export const updatePlantDeets = async (req, res) => {
    try {
        const parsedPlant = plantSchema.safeParse(req.body);

        if (!parsedPlant.success) {
            return res.status(400).json({
                error: parsedPlant.error.errors.map((err) => err.message).join(", "),
            });
        }

        const updatedPlant = await PlantModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (updatedPlant) {
            res.status(200).json(updatedPlant);
        } else {
            res.status(404).json({ message: "Plant not found" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating the plant",
            error: error.message,
        });
    }
}

export const deletePlantById = async (req, res) => {

    try{
        const plant = await PlantModel.findByIdAndDelete(req.params.id);
        if(plant){
            res.status(200).json({message: "Plant deleted"});
        }
        else{
            res.status(404).json({message: "Plant not found"});
        }
    }
    catch(error){
        return res.status(500).json({
            message: "An error occurred while deleting the plant",
            error: error.message,
        });
    }

}
