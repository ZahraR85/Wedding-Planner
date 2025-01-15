import { Buffer } from 'node:buffer';
import { v2 as cloudinary } from 'cloudinary';
import ErrorResponse from '../utils/ErrorResponse.js';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure_url: true,
});

// Upload multiple images
const cloudUploader = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) throw new ErrorResponse('Please upload files.', 400);

        const uploadPromises = req.files.map(async (file) => {
            const b64 = Buffer.from(file.buffer).toString('base64');
            const dataURI = 'data:' + file.mimetype + ';base64,' + b64;

            const cloudinaryData = await cloudinary.uploader.upload(dataURI, {
                resource_type: 'auto',
            });

            return cloudinaryData.secure_url;
        });

        const cloudinaryURLs = await Promise.all(uploadPromises);

        req.cloudinaryURLs = cloudinaryURLs;
console.log(cloudinaryURLs);
        next();
    } catch (error) {
        next(error);
    }
};

export default cloudUploader;