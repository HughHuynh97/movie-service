const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

const users = []; // Giả lập database người dùng

// Đăng ký
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered' });
});

// Đăng nhập
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: '1h',
    });

    res.json({ token });
});

// Route được bảo vệ
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: `Hello ${req.user.username}, bạn đã vào được route bảo vệ!` });
});

module.exports = router;
