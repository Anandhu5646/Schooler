const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken")
var salt= bcrypt.genSaltSync(10)
const adminAuthController={

    postAdminLogin:async(req,res)=>{
        try{
            const {email,password}=req.body;
            const admin=await adminModel.findOne({email})
            if(!admin){
                return res.json({err:true, message:"You have no admin access"})

            }
            const adminValid= bcrypt.compareSync(password,admin.password)
            if(!adminValid){
                return res.json({err:true, message:"wrong password"})
            }
            const token=jwt.sign({
                admin:true,
                id:admin._id
            },"myjwtsecretkey")
            return res.cookie("adminToken",token,{
                httpOnly:true,
                secure:true,
                maxAge:1000*60*60*24*7,
                sameSite:"none"
            }).json({err:false})
        }catch(err){
            res.json({message:"server error",err:true,error:err})
            console.log(err);
        }
    },
    postAdminLogout: async(req,res)=>{
        res.cookie("adminToken",token,{
            httpOnly:true,
            expires:new Date(0),
            secure:true,
            sameSite:"none"
        }).json({message:"logged out", error:false})
    },
    checkAdminLoggedIn:async(req,res)=>{
        try{
            const token=res.cookie.adminToken
            if(!token){
                return res.json({loggedIn:false,error:true,message:"no token"})
                
            }

            const verifiedJwt =jwt.verify(token,"myjwtsecretkey")
            const admin= await adminModel.findById(verifiedJwt.id,{password:0})
            if(!admin){
                return res.json({loggedIn:false})

            }
            return res.json({admin,loggedIn:true})

        }catch(err){
            console.log(err);
            res.json({loggedIn:false,error:err})
        }
    }
}

module.exports=adminAuthController



