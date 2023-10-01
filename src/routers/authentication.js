const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const express = require('express');
const router = new express.Router();


router.post('/authentication/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();

        const token = jwt.sign({ id: user._id }, 'eVVXZfFk1QRTrbPyhzJSf1KmY', { expiresIn: '1h' });
        res.cookie('authToken', token, { httpOnly: true });

        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        res.status(400).json({ message: 'Error creating user', error: err });
    }
});

router.post('/authentication/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, 'eVVXZfFk1QRTrbPyhzJSf1KmY', { expiresIn: '1h' });
        res.cookie('authToken', token, { httpOnly: true });

        res.status(200).json({ message: 'Logged in successfully', user });
    } catch (err) {
        res.status(400).json({ message: 'Error logging in', error: err });
    }
});

router.post('/authentication/logout', (req, res) => {
    try {
        // Clear the authToken cookie
        res.clearCookie('authToken', { httpOnly: true });

        // Send a successful logout message
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error logging out', error: err });
    }
});

module.exports = router;