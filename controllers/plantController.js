import { plantSchema } from "../zod/schema.js";
import { PlantModel } from "../model/plantModel.js";

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

        // const cachedPlants = await client.get('plants');

        // if(cachedPlants){
        //     return res.status(200).json(JSON.parse(cachedPlants));
        // }

        const plants = await PlantModel.find();
        // await client.set('plants', JSON.stringify(plants));
        
        res.status(200).json(plants);
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching plants",
            error: error.message,
        });
    }
}

export const showPlantById = async (req, res) => {
    try {
        const plant = await PlantModel.findById(req.params.id);
        if (plant) {
            res.status(200).json(plant);
        } else {
            res.status(404).json({ message: "Plant not found" });
        }
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
