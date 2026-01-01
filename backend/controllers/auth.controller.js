const User = require('../models/User.js');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");


exports.registerUser = async (req, res) => {
    try {

        const { username, password } = req.body;

        //check fields
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required!' })
        }

        // check if User exist
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' })
        }

        //creating user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            password: hashedPassword,
        });

        //respond
        res.status(201).json({
            message: "User Registered successfully",
            userId: user._id
        })

    } catch (error) {
        console.error("REGISTER ERROR:", error);
        res.status(500).json({ message: error.message });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        //checking fields
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required!" })
        }
        //checking user exist
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ message: "User not found!!" })
        }
        //checking password
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.status(400).json({ message: "Wrong Password" })
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login successful",
            token,
            username
        });

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

exports.trial = async (req, res) => {
    console.log("trial function runs");
    res.send("Trial works");
}
