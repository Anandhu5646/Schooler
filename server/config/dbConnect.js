const mongoose= require("mongoose")
mongoose.set("strictQuery", false)
function dbConnect(){
    mongoose.connect("mongodb://127.0.0.1/schoolMngSystem").then(response=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log("Data base error"+err);
    })
}     
module.exports= dbConnect