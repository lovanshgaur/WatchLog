import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// signup function
export const signup = async (req, res) => {
    try {
        const { username, email, password } = await req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required." })
        };

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists!" })
        };

        const existingMail = await User.findOne({ email });
        if (existingMail) {
            return res.status(409).json({ message: "Email is already registered!" })
        };

        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            username, email, password: hashedPassword
        });
        res.status(201).json({ message: "User created successfully!", "User": { username, email, password } })

    } catch (error) {
        res.status(500).json({ message: `Signup Error: ${error}` })
        console.log(`Signup Error: ${error}`);
    }
}
export const signin = async (req, res) => {
    try {
        const { username, password } = await req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required." })
        };

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(409).json({ message: "User does not exist." })
        };

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).json({ message: "Password is incorrect!" });
        };
        
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

    } catch (error) {
        console.log(`Signin Error: ${error}`);
    }
}
