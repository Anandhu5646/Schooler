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

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve() + "/public"));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

dbConnect();

app.use('/admin', adminRoute);
app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);

app.listen(1800, () => {
  console.log("Server running on http://localhost:1800");
});
