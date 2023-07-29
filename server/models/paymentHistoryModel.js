const mongoose= require("mongoose")

const paymentHistorySchema= new mongoose.Schema({
 
      title:{
        type:String,
        required:true
      },
      amount:{
        type:String,
        required:true
      },
      paidDate:{
        type:Date,
        required:true
      },
      paymentId:{
        type:String,
        required:true
      },
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
      },
      status:{
        type:String,
        default:"Not paid"
      }
      

})

const paymentHistoryModel= mongoose.model("payment",paymentHistorySchema)

module.exports= paymentHistoryModel;