const mongoose= require("mongoose")
const classSchema= new mongoose.Schema({
    className:{
        type:String,
        required:true
    }

})

const classModel= mongoose.model("class",classSchema)
module.exports= classModel