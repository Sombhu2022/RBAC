import { v2 as cloudinary } from 'cloudinary';


export const cloudinaryConfig = ()=>{

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_DB,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET
    })
}

