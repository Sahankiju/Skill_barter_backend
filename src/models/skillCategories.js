import mongoose from "mongoose"


const skilledUserSchema = new mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    },
  level:{ 
    type: String, 
    enum: ["beginner", "intermediate", "advanced"],
    default: "beginner"
}
}
)


const codingSchema = new mongoose.Schema({
    python:[skilledUserSchema],
    javascript:[skilledUserSchema],
})
const musicSchema = new mongoose.Schema({
    guitar:[skilledUserSchema],
    flute:[skilledUserSchema],
})
const graphicSchema = new mongoose.Schema({
    photoshop:[skilledUserSchema],
    animation:[skilledUserSchema],
    threeD_modelling:[skilledUserSchema]
})



export const codingCategory = mongoose.model('codingCategory',codingSchema);
export const musicCategory = mongoose.model('musicCategory',musicSchema);
export const graphicCategory = mongoose.model('graphicSchema',graphicSchema);