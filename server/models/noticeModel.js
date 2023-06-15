const mongoose= require("mongoose")

const noticeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
   
    content:{
        type:String,
        required:true
    },
    date : { type : Date, default: Date.now }
})

const noticeModel=mongoose.model("notice",noticeSchema)
module.exports= noticeModel;    