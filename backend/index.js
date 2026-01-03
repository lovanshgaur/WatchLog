import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// imports
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import movieRoutes from './routes/movie.routes.js'

// init app
const app = express();

// middleware
app.use(express.json());
app.use(cors());
dotenv.config();

//database connection
connectDB();

//Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes)
app.use("/movie", movieRoutes)

app.get("/", (req, res) => {
    res.send(`
        <div>
        <h1>WatchLog API running||LovanshGaur</h1>
        <a href="https://lovansh.me/">Watch Other Works</a>
        </div>
        `
    )
})

const PORT = process.env.PORT || '2026';

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})
