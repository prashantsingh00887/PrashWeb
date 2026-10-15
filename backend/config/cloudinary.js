import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ggb1dd3d',
  api_key: process.env.CLOUDINARY_API_KEY || '116273271835525',
  api_secret: process.env.CLOUDINARY_API_SECRET || '0YjKg2DD7ltpOGpSTfh9fGCs-EQ',
  secure: true
});

export const uploadToCloudinary = (fileBuffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'prashweb',
        resource_type: options.resource_type || 'auto',
        transformation: options.transformation || undefined,
        ...options
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export const uploadBase64ToCloudinary = async (base64String, options = {}) => {
  return await cloudinary.uploader.upload(base64String, {
    folder: 'prashweb',
    resource_type: options.resource_type || 'auto',
    ...options
  });
};

export { cloudinary };
