import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from "../model/userModel.js";

// Zod schema for user validation
const userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
});

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password is required'),
});

export const getUsers = async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
};

export const registerUser = async (req, res) => {
    const parseResult = userSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            error: parseResult.error.errors.map(err => err.message).join(', '),
        });
    }

    const { name, email, password } = req.body;
    
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export const loginUser = async (req, res) => {
    const parseResult = loginSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            error: parseResult.error.errors.map(err => err.message).join(', '),
        });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const getMe = async (req, res) => {
    res.status(200).json(req.user);
};
