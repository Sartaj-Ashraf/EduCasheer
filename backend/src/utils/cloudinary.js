import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SERCRET
});

const uploadOnCloudinary=async(localFilePath)=>{
    try {
        if(!localFilePath) return null
       const response= await cloudinary.uploader.upload
       (localFilePath,{
                resource_type:"auto"
            })
       console.log("File Uploaded",response.url)
       return response
    } catch (error) {
        console.log("Error while uploading the file",error)
        fs.unlinkSync(localFilePath) //Remove the file from the local storage
        return null;
        
    }

}
export {uploadOnCloudinary}
