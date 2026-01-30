import User from '../models/User.model.js';
import bcrypt from 'bcrypt';

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
        res.status(201).json({ message: "User created successfully!", "User": { username, email, hashedPassword } })

    } catch (error) {
        res.status(500).json({ message: `Signup Error: ${error}` })
        console.log(`Signup Error: ${error}`)
    }
}
export const signin = async (req, res) => {
    try {
        res.send('signin')
    } catch (error) {
        console.log(error)
    }
}
