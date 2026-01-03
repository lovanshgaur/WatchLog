import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.staus(400).json({
                message: "All fields are required."
            })
        };

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({
                message: "Username already exists!"
            })
        };

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            username,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User created successfully!"
        })

    } catch (error) {
        res.staus(500).json({ message: `Signup Error : ${error}` })
        consle.error(`Signup Error : ${error}`);
    }

}

export const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required" })
        };

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User does not exisit." })
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Wrong Password" })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                avatar: user.avatar
            }
        })
    }
    catch (error) {
        res.status(500).json({
            message: `Login Error : ${error}`
        })
        console.error(`Login Error : ${error}`)
    }

}