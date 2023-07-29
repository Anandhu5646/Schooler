const mongoose= require("mongoose")

const paymentSchema= new mongoose.Schema({
 
      title:{
        type:String,
        required:true
      },
      amount:{
        type:String,
        required:true
      },
      currentDate:{
        type:Date,

      },
      lastDate:{
        type:Date,
        required:true
      }

})

const paymentModel= mongoose.model("payment",paymentSchema)

module.exports= paymentModel;