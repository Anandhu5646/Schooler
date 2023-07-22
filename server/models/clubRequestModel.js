const mongoose= require("mongoose")

const clubReqSchema = new mongoose.Schema({
    studentName:{
        type:String,
        required:true
    },
    className:{
        type:String,
        required: true
    },
    clubName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required: true,
    },
    facultyId:{
        type:String,
        required:true
    },
    facultyName:{
        type:String,
        required:true
    },
    clubId:{
        type:String,
        required:true
    },
    studentId:{
        type:String,
        required:true
    }
    ,date : { type : Date, default: Date.now }
})

const clubRequestModel=mongoose.model("clubRequest",clubReqSchema)

module.exports =clubRequestModel;