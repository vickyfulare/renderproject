import Gallery from "../models/gallerymodel.js";
import fs from "fs";

export const createGalleryController = async(req, res) => {
    try {
        const { gname, date } = req.fields; // Extract text fields
        const g_image = req.files.g_image; // Extract uploaded image

        // ✅ Validation
        switch (true) {
            case !gname:
                return res.status(400).json({ error: "Gallery name is required" });
            case !date:
                return res.status(400).json({ error: "Date is required" });
            case !g_image:
                return res.status(400).json({ error: "Image is required" });
            case g_image.size > 2 * 1024 * 1024:
                return res.status(400).json({ error: "Image should be less than 2MB" });
        }

        // ✅ Save Image to MongoDB
        const gallery = new Gallery({ gname, date });

        if (g_image) {
            gallery.g_image.data = fs.readFileSync(g_image.path); // Use `path`, not `filepath`
            gallery.g_image.contentType = g_image.type;
        }

        await gallery.save();

        res.status(201).json({
            success: true,
            message: "Gallery item created successfully",
            gallery,
        });
    } catch (error) {
        console.error("Gallery creation error:", error);
        res.status(500).json({
            success: false,
            message: "Error in creating gallery item",
            error: error.message,
        });
    }
};