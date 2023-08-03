const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs")
const jwt =require("jsonwebtoken")
var salt= bcrypt.genSaltSync(10)
const adminAuthController={

    postAdminLogin: async (req, res) => {
        try {
            const {email,password} = req.body;    
            console.log(req.body);
            const admin=await adminModel.findOne({email})
        
            if(!admin){
                return res.json({error: true, message: "You have no admin access"})
            }
           
            if (password !== admin.password) {
              return res.json({ error: true, message: 'Wrong password' });
            }
            const token = jwt.sign({
                id: admin._id
            },"myjwtsecretkey"
            ) 
            console.log("token" , token);
            return res.cookie("adminToken",token ,{
                httpOnly: true,
                maxAge: 1000*60*60*24*7,
                secure: true,
                sameSite: "none"
                
            }).json({error: false, success:true})
           
        } catch (error) {
            res.status(500).json({error: error,success:false, message: "Server error"})
            console.log(error)
        }
      }
      ,
    postAdminLogout: async(req,res)=>{
        const token= req.cookies.adminToken
        res.cookie("adminToken",token,{
            httpOnly:true,
            expires:new Date(0),
            secure:true,
            sameSite:"none"
        }).json({success:true,message:"logged out", error:false})
    },
    checkAdminLoggedIn:async(req,res)=>{
        try {
            const token =req.cookies.adminToken
            if(!token){
              return  res.json({loggedIn :false, message:"no token"})
            }
            const verifiedJWT= jwt.verify(token, "myjwtsecretkey")
            return res.json({name: verifiedJWT.name, loggedIn: true})
        } catch (error) {
            res.json({loggedIn: false, error})
        }
    }
}

module.exports=adminAuthController



