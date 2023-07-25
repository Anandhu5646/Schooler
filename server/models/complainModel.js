const mongoose= require("mongoose")

let complainSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    className:{
        type:String,
       
    },
    date:{
        type:String,
        required:true
    },
    complainterId:{
        type:String,
        
    },
    complainPerson:{
        type:String
    }

})

const complainModel=mongoose.model('complain',complainSchema)
module.exports=complainModel