import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const SingupHandler=async(req,res)=>{
    const {fullName,email,password}=req.body;
    console.log(fullName,email,password);
    try{
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({fullName,email,password:hashedPassword});
        await newUser.save();
        res.status(201).json({message:"User created successfully",user:newUser});
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message});
    }
}
export {SingupHandler};
 
const LoginHandler=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid password"});
        }
        const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1h"});
        res.status(200).json({message:"Login successful",user,token});
    }catch(error){
        res.status(500).json({message:"Internal server error",error:error.message});
    }
}
    
export {LoginHandler};