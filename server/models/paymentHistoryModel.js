const mongoose= require("mongoose")

const paymentHistorySchema= new mongoose.Schema({
 
      paymentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment',
      },
      paidDate:{
        type:Date,
        required:true
      },
     
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
      },
      status:{
        type:String,
        default:"Pending"
      }
      

})

const paymentHistoryModel= mongoose.model("paymentHistory",paymentHistorySchema)

module.exports= paymentHistoryModel;