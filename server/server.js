const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const path = require('path');
const morgan = require('morgan');
require('dotenv').config();
const adminRoute= require("./routers/adminRoute.js")
const facultyRoute = require('./routers/facultyRoute.js');
const studentRoute = require('./routers/studentRoute.js');
const adminAuthRoute= require('./routers/adminAuthRoute.js') 
const facultyAuthRoute= require('./routers/facultyAuthRoute.js')
const studentAuthRoute= require("./routers/studentAuthRoute.js")
const dotenv = require("dotenv").config();

app.use(express.json({limit:'50mb'}));
app.use(cookieParser({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended:false ,limit: '10mb'}));
app.use(express.static(path.resolve() + "/public"));


app.use(
  cors({
    origin: ["http://localhost:3000","https://schoolerr.netlify.app","https://schooler.onrender.com"],
    credentials: true,
  })
);

dbConnect();

app.use('/admin', adminRoute);
app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);
app.use('/admin/auth',adminAuthRoute)
app.use('/faculty/auth',facultyAuthRoute)
app.use('/student/auth',studentAuthRoute)

app.listen(1800, () => {
  console.log("Server running on http://localhost:1800");
});
