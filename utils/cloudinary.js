import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
// Configuration
cloudinary.config({
    cloud_name: process.env.cloudinary_db,
    api_key: process.env.cloudinary_apikey,
    api_secret: process.env.cloudinary_apisecret // Click 'View API Keys' above to copy your API secret
});

export const uploadOnCloudinary=async (filePath)=>{
    try {
        console.log(filePath);
        if(!filePath) return null
        const response=await cloudinary.uploader.upload(filePath,{
            resource_type:"image"
        })
        fs.unlinkSync('./'+filePath);
        return response.url;
    } catch (error) {
        fs.unlinkSync('./'+filePath);
        return null;
    }
}