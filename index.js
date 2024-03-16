const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();

dotenv.config();
connectDB();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authRoutes = require('./routes/auth.routes');

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server 🌐 listening on port ${PORT}`);
});
