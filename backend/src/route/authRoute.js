const express = require("express");
const signupDB = require("../model/signupSchema");
const loginDB = require("../model/loginSchema");
const compsignupDB = require("../model/compSignupSchema");
const authroutes= express.Router();





authroutes.post('/signup',async(req,res)=>{
    console.log("body is",req.body);
    try{
        const login={
            email:req.body.email,
            password:req.body.password,
            role:2,
        }
        const loginresult = await loginDB(login).save();
        console.log(loginresult)
        console.log("result is",loginresult);
        
        const signup={
            loginId:loginresult._id,
            name:req.body.name,
            number:req.body.number,         
        }
        
        const signupresult= await signupDB(signup).save();
        if(signupresult){
            return   res.status(200).json({
                success:true,
                error:false,
                data:signupresult,
                message:"successfully registered",
                loginId:loginresult._id,
                role:loginresult.role,
            })}
            else{
        return res.status(400).json({
                success:false,
                error:true,
                message:"not registered",
            })
        }
    }
    catch(error){
       return res.status(500).json({
            success:false,
            error:true,
            errorMessage:error.message,
            message:"something went wrong",
        })
    }
})



authroutes.post('/login',async(req,res)=>{
    // console.log("data is",req.body);

    try{

        const email=req.body.email;
        const password=req.body.password;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                error:true,
                message:"All fields are required", 
            })
        }else{
        const result=await loginDB.findOne({email:req.body.email});
        if(!result){
            return res.status(400).json({
                success:false,
                error:true,
                message:"email does not exist",
            })
        }else{
            if(result.password==password){

               
                return res.status(200).json({
                    success:true,
                    error:false,
                    message:"successfully login",
                    loginId:result._id,
                    role:result.role,
                    // token:token,
                })
            }
            // else{
            //   return  res.status(400),json({
            //         success:false,
            //         error:true,
            //         message:"not logged in",
            //     })
            // }

        }
    }     
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:true,
            errorMessage:error.message,
            message:"something went wrong",
        })
    }


})



authroutes.post('/compsignup',async(req,res)=>{
    // console.log("body is",req.body);
    try{
        const login={
            email:req.body.email,
            password:req.body.password,
            role:3,
        }
        const loginresult = await loginDB(login).save();
        // console.log(loginresult)
        // console.log("result is",loginresult);
        
        const signup={
            loginId:loginresult._id,
            username:req.body.username,
        }
        
        const signupresult= await compsignupDB(signup).save();

        if(signupresult){
            return  res.status(200).json({
                success:true,
                error:false,
                data:signupresult,
                message:"successfully registered",
                loginId:loginresult._id,
                role:loginresult.role,
            })}
            else{
        return res.status(400).json({
                success:false,
                error:true,
                message:"not registered",
            })
        }
    }
    catch(error){
       return res.status(500).json({
            success:false,
            error:true,
            errorMessage:error.message,
            message:"something went wrong",
        })
    }
})





module.exports= authroutes;




