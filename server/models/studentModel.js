const mongoose= require("mongoose")


const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    motherName:{
        type:String,
    },
    fatherName:{
        type:String,
    },
    dob:{
        type:String,
    },
    age:{
        type:String
    },
    gender:{
       type:String
    },
    className:{
        type:String,
        required:true
    },
    admYear:{
        type:String,
        
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
   
    
    mobile:{
        type:String,
        
    },
    rollNo:{
        type:String,
        required:true
    }, 
    address:{
        type:String,
        
    },
    attdenList:[],
    markList:[],
    pList:[],
    pic:{
     type:String,
     default:"/admin/avatar.jpg"
    }
})
const studentModel=mongoose.model("student",studentSchema)


module.exports= studentModel