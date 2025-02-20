import express from 'express'

import { createGalleryController, deleteGalleryController, getAllGalleryController } from '../controllers/gallerycontroller.js';
import multer from 'multer';
import path from 'path';

const router = express.Router()
    // Set up multer storage for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify the folder where the uploaded files should be stored
        cb(null, 'galleryuploads');
    },
    filename: (req, file, cb) => {
        // Add timestamp to filenames to avoid conflicts
        cb(null, Date.now() + '-' + file.originalname);
    },
});

// Initialize multer for image file upload
const gallery_upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Only allow image files (.jpg, .jpeg, .png)
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.mp4') {
            return cb(new Error('Only .jpg, .jpeg, .png and .mp4 files are allowed'));
        }
        cb(null, true);
    },
}).single('g_image'); // 'g_image' is the form field name in Postman

// Routes for Post
router.post('/create-gallery', gallery_upload, createGalleryController)

// Route to get all gallery records
router.get('/get-gallery', getAllGalleryController);

router.delete('/delete-gallery/:id', deleteGalleryController);

export default router;