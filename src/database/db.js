import mongoose from "mongoose";

export const connectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.DatabaseURI);
        console.log("Database is connected sucessfully");
        
    }catch(err){
        console.log(err);
        console.log('Error while connecting to Database');
        process.exit(1);   
    }   
}