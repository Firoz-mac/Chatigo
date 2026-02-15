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
const usersRoutes = require('./routes/usersRoutes');
const conversationRoutes = require('./routes/conversationRoutes');

app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/conversations', conversationRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
});