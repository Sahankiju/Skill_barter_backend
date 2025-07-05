import mongoose from "mongoose";
import { type } from "os";


const skillSchema = new mongoose.Schema({
   skillName:{
    type: String,
    required: true,
    maxlength: 50
    },
  level:{ 
    type: String, 
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner"
},
category:{
    type:String,
    enum:['Coding','Music','Graphics']
}
}
)



const availabilitySchema= new mongoose.Schema({
    day:{
        type:String,
        enum:['sunday','monday','tuesday','wednesday','thrusday','friday','saturday'],
        required: true
    },
    timeRange:{
        type: String,
        maxlength:50
    }
})

const requestSchema = new mongoose.Schema({
    skillToLearn: skillSchema,
    skillToTeach : skillSchema,
    requestedBy : {
        type: mongoose.Schema.Types.ObjectId,
        required :true
    }
})


const userSchema = new  mongoose.Schema({
    username:{
        type:String,
        maxlength:50,
        minlength:3,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type: String,
        maxlength:50,
        required:true,
        unique:true,
        lowercase:true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    hashpassword:{
        type: String,
        required: true,
        minlength: 8
    },
    skillToTeach:[skillSchema],

    skillToLearn:{
        type: String,
        maxlength:25
    },
    bio:{
        type :String,
        maxlength : 350
    },
    availability:[availabilitySchema],
    profilePicURL:{
        type:String,
        maxlength:500
    },
    profilePicPublicId:{
        type:String
    },
    tradeRequest :[requestSchema]
},{timestamps:true})

export const userCollection = mongoose.model('userCollection',userSchema)