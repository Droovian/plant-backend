import { z } from 'zod';
import { User } from "../model/userModel.js";

const userSchema = z.object({
    clerkId: z.string(),
    name: z.string(),
    email: z.string().email(),
});

export const registerUser = async (req, res) => {
    const { clerkId, name, email } = req.body;

    console.log(req.body);
    
    if (!clerkId || !name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

    try {

        let user = new User({
            clerkId,
            name,
            email,
        });

        await user.save();

        res.status(201).json({message: 'User registered'});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}

export const tryUser = async (req, res) => {
    try {
        
        res.status(200).json({message: "yooooo"});

    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}