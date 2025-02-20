import express from 'express';
import colors from 'colors';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/connectDB.js';
import gallaryRoutes from './routes/galleryroutes.js'
import path from 'path';
import { fileURLToPath } from 'url';

// Create the Express app
const app = express();

// Configure dotenv
dotenv.config();

// Database connection
connectDB();


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Define __dirname for ES6 modules
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Routes

app.use('/api/v1/gallery', gallaryRoutes);

app.use(express.static(path.join(__dirname, "frontend/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

// Serve static files from the "galleryupload" directory
app.use('/galleryuploads', express.static('galleryuploads'));




// Define the port
const PORT = process.env.PORT || 8045;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.cyan.bold);
});