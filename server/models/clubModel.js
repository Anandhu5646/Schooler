const mongoose= require("mongoose")

const clubSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   
    description:{
        type:String,
       
    },
    facultyName:{
        type:String
    },
   
    members:[],
    date : { type : Date, default: Date.now }
})

const clubModel=mongoose.model("club",clubSchema)

module.exports =clubModel;