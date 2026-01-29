// importing
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/connectDB.config.js';

//init app
const app = express();
//middleware
app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3000
connectDB();

app.get("/", (req, res) => {
    res.send(
        "WatchLog-v2.0.1"
    )
})


app.listen(PORT, () => {
    console.log(`Server is runnig at ${PORT}`)
})