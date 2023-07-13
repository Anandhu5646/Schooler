const mongoose= require("mongoose")

const subjectSchema= new mongoose.Schema({
    subName:{
        type:String,
        required:true
    },
    subCode:{
        type:String
       
    },
    // subClass:{
    //     type:String,
    //     required:true
    // },
    subCredit:{
        type:String
        
    }
})

const subjectModel= mongoose.model("subject",subjectSchema)

module.exports= subjectModel;