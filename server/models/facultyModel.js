const mongoose= require("mongoose")

const facultySchema = new mongoose.Schema({
   
    name:{
        type:String,
        required:true
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
    joiningYear:{
        type:String,
        
    },
    teachingArea:{
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
    qulification:{
    type:String,
   },
    
    mobile:{
        type:String,
        required:true
        
    },
    employeeId:{
        type:String,
        
    }, 
    address:{
        type:String,
        
    },
    className:{
        type:String,
        required:true
    },
   
    attdenList:[],
    markList:[],
    pList:[],
    pic:{
     type:String,
     default:"/admin/avatar.jpg"
    }
})

const facultyModel= mongoose.model("faculty",facultySchema)
module.exports=facultyModel