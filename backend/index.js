const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes.js")
const movieRoutes = require("./routes/movie.routes.js")


dotenv.config();
connectDB();
const app = express();
app.use(cors());



app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});

app.use("/auth", authRoutes);
app.use("/movie", movieRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
