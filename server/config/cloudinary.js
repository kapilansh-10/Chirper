const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require("multer");


// Configure Cloudinary with credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer to use cloudinary storeage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'chirper-uploads', // thre name of the folder in cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg'], // allowed image formats
    },
});


// Create the upload multer instance
const upload = multer({ storage: storage });

module.exports = upload
