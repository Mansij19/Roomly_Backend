const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User created successfully", user: newUser });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);

        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

module.exports = {
    login,
    signup
}