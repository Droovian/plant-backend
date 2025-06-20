import { User } from "../model/userModel.js";

export const registerUser = async (req, res) => {
    const { clerkId, name, email, token } = req.body;

    console.log(req.body);
    
    if (!clerkId || !name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

    try {

        let user = new User({
            clerkId,
            name,
            email,
            token
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