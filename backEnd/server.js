require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();
const cors = require('cors');
app.use(express.json());
connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

const authRoutes = require('./routes/authRoutes');

app.use('/auth', authRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});