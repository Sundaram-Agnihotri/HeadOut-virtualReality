import express from "express"; // Express Server
import bodyParser from "body-parser"; // For parsing body of requests in desired format
import mongoose from "mongoose"; // Library for easy use of mongodb
import cors from "cors"; // Library to allow cross origin requests
import dotenv from "dotenv"; // For extracting data from env files
import morgan from "morgan"; // For logging requests into console

import { fileURLToPath } from "url";
import { dirname } from "path";

import authRoutes from "./routes/auth.js"; // Importing authentication related routers
import mediaRoutes from "./routes/media.js"; // Importing media related routers
import cloudinary from "cloudinary"; // For uploading media to cloudinary

dotenv.config(); // Load environment variables

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: 'dnctvkwuo', 
  api_key: '413423532152765', 
  api_secret: 'Qflnwdrbs3AXzHNQLFjNYcPloiw' 
});

// Log the Cloudinary configuration
console.log("Cloudinary configured:", cloudinary.v2.config());

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("dist", { dotfiles: "allow" }));

// Routes
app.use("/auth", authRoutes);
app.use("/media", mediaRoutes);

app.get("/api", (req, res) => {
  res.send("API is running");
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/dist/index.html");
});

// MongoDB Connection
const CONNECTION_URL = "mongodb+srv://agnihotrisundaram8:s123@cluster0.o3zcv.mongodb.net/"

const PORT = process.env.PORT || 6001;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

export default app;
