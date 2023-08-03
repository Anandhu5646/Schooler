const mongoose= require("mongoose")
mongoose.set("strictQuery", false)
function dbConnect(){
    mongoose.connect(process.env.DATABASE_URL).then(response=>{
        console.log("Database connected")
    }).catch((err)=>{
        console.log("Data base error"+err);
    })
}     
module.exports= dbConnect