const adminModel = require("../models/adminModel");
const facultyModel = require("../models/facultyModel");
const studentModel = require("../models/studentModel");
const subjectModel = require("../models/subjectModel");

let adminController = {
    postAdminAddStudent: async (req, res) => {
        try {
            console.log('dfdfddddddddddd');
            // let {
            //     name,
            //     motherName,
            //     fatherName,
            //     dob,
            //     age,
            //     gender,
            //     className,
            //     admYear,
            //     email,
            //     password,
            //     mobile,
            //     rollNo,
            //     address,
            // } = req.body;

            // let student = new studentModel({
            //     name,
            //     motherName,
            //     fatherName,
            //     email,
            //     password,
            //     dob,
            //     age,
            //     gender,
            //     className,
            //     admYear,
            //     rollNo,
            //     address,
            //     mobile,
            // });
            // await student.save();
        } catch (err) {
            console.log(err);
        }
    },

    postAdminAddFaculty: async (req, res) => {
        try {
            console.log("fffffffffffffffffffff");
            let {
                name,
                dob,
                age,
                gender,
                joiningYear,
                teachingArea,
                email,
                password,
                qualification,
                mobile,
                employeeId,
                address,
                className
            } = req.body;
            let faculty = new facultyModel({
                name,
                dob,
                age,
                gender,
                joiningYear,
                teachingArea,
                mobile,
                employeeId,
                email,
                password,
                qualification,
                address,
                className
            });
            await faculty.save();
            console.log(faculty, "ddddddddddddddddddd");
        } catch (err) {
            console.log(err);
        }
    },

    postAdminAddSubject:async(req,res)=>{
        try {
            console.log('ooooooooooooooo');
            let {subName,subCode,subClass,subCredit}=req.body
            let subject=new subjectModel({
                subName,
                subCode,
                subClass,
                subCredit
            })
            await subject.save();
            console.log(subject,'iiiiiiiiiiiiiiii');
        } catch (error) {
            console.log(error);
        }

    }
};

module.exports = adminController;
