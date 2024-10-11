import express from "express"; // Express Server
import bodyParser from "body-parser"; // For parsing body of requests in desired format
import mongoose from "mongoose"; // Library for easy use of mongodb
import cors from "cors"; // Library to allow cross origin requests
import dotenv from "dotenv"; // For extracting data from env files
import morgan from "morgan"; // For logging requests into console

import { fileURLToPath } from "url";
import { dirname } from "path";

import authRoutes from "./routes/auth.js"; // importing authentication related routers
import mediaRoutes from "./routes/media.js"; // importing media related routers
import cloudinary from "cloudinary"; // For uploading media to cloudinary
// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});