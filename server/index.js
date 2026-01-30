// importing
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.config.js';

import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js';
import userRoutes from './routes/user.routes.js';

//init app
const app = express();
//middleware
app.use(express.json());
app.use(cors());
dotenv.config();



const PORT = process.env.PORT || 2026
connectDB();

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/movie", movieRoutes);

app.get("/", (req, res) => {
    res.send(
        "WatchLog-v2.0.1"
    )
})


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})