const mongoose = require('mongoose');

// Define a schema for student marks
const studentMarkSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'studentModel',
    required: true
  },
  marks: {
    type: Number,
    required: true
  },
  markingDate: {
    type: Date,
    
  },
  grade:{
    type:String,
    required:true
  },
  status: {
    type: Boolean,
    default: false
  },
  subject:{
    type:String,
    
  }
});

const markModel = mongoose.model('studentMark', studentMarkSchema);

module.exports = markModel;
