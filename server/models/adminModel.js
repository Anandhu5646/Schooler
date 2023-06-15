const mongoose= require("mongoose")

let adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const adminModel=mongoose.model('admin',adminSchema)
module.exports=adminModel