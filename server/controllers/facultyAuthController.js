const facultyModel = require("../models/facultyModel");


let facultyController={
    postFacLogin: async(req,res)=>{
        try {
            const {email,password}=req.body
        console.log(req.body);
        const faculty= await facultyModel.findOne({email})
        if(!faculty){
            return res.json({error:true,message:"You have no login access"})
        }
        if(password !== faculty.password)
        res.json({error:true,message:"wrong password" })
        const token= jwt.sign({
           id:faculty._id
        }, "myjwtsecretkey")
        console.log("token",token);   

        return res.cookie("adminToken",token,{
            httpOnly:true,
            maxAge: 1000*60*60*24*7,
            secure: true,
            sameSite: "none"
        }).status(200).json({error:false, success:true})

        } catch (error) {
            console.log(error);
            res.status(500).json({err:error, success:false, message:"server error"})
        }

    },
    postFacLogout:async(req,res)=>{
        const token=req.cookies.adminToken
        res.cookie("facultyToken",token,{
            httpOnly:"true",
            expires:new Date(0),
            secure:"true",
            sameSite:"none"
        }).status(200).json({success:true,message:"logged out",error:false})
    },
    checkFacLoggedIn: async(req,res)=>{
        try {
            const token=req.cookies.facultyToken
            if(!token){
                return res.status(404).json({loggedIn:false,message:"no token"})
            }
            const verifiedJwt= jwt.verify(token, "mysecretkey")
            return res.status(200).json({name:verifiedJwt.name,loggedIn:true})
            
        } catch (error) {
            console.log(error);
            res.status(500).json({loggedIn:false,error,message:"server error"})
        }
    }
}
module.exports= facultyController