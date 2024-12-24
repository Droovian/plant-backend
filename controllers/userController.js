// controller for everything to do with users within the app(CRUD)
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../model/userModel.js";

export const getUsers = async (req, res) => {

    const users = await User.find({});
    
    res.status(200).json(users);
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    if(!name || !email || !password){
        return res.status(400).json({error: 'Please fill in all fields'});
    }

    const userExists = await User.findOne({ email });

    if(userExists){
        return res.status(400).json({error: 'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({error: 'Invalid user data'});
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
        
        if(!email || !password){
            return res.status(400).json({error: 'Please fill in all fields'});
        }
    
        const user = await User.findOne({ email });
    
        if(user && (await bcrypt.compare(password, user.password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({error: 'Invalid email or password'});
        }
}

export const getMe = async (req, res) => {
    res.status(200).json(req.user);
}