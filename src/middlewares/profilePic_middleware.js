import multer from "multer";
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(new Error("not an image ,please upload only image "))
    }
}

export const profilePicMiddleware = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{
        fieldSize:15*1024*1024
    }
});
