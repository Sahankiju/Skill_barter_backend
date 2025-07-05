import cloudinary from "../config/cloudinary.js";


export const uploadProfilePic = async (filePath) => {
  try {
     const result =await cloudinary.uploader.upload(filePath);
        return{
            url: result.secure_url,
            public_id:result.public_id
        }
  } catch (error) {
    console.log(error);
    console.log("error while uploading");
    
  }
};
