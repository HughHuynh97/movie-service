const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./db/connect');

const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB(); // kết nối MongoDB

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
