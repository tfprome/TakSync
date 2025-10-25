import dotenv from 'dotenv'
import { Request,Response } from "express";
import usermodel from "../models/usermodel";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

dotenv.config()

export const signupuser=async(req:Request,res:Response)=>{
     try{
        const {name,email,password}=req.body
        console.log(name,email,password)
     const existinguser=await usermodel.findOne({email})
     if(existinguser)
        {return res.status(400).json('user already exists')}
        const hashedpassword=await bcrypt.hash(password,10)
        const newuser=await usermodel.create({name,email,password:hashedpassword})
        return res.status(200).json({message:'user created',data:newuser})
     
     }
     catch(e){
        return res.status(500).json({message:'error during signup',e})
     }
}

export const loginuser=async(req:Request,res:Response)=>{
    try{
           const {email,password}=req.body
           const findemail=await usermodel.findOne({email})
           if(!findemail)
              return res.status(401).json({message:'Wrong email'})
                const match=await bcrypt.compare(password,findemail.password)
                if(match){
                  const token = jwt.sign(
                     { id: findemail._id, email: findemail.email },
                     process.env.JWT_SECRET_KEY as string,
                     { expiresIn: "24h" }
                 );
         
                  return res.status(200).json({message:'Login successful',token,user:{name:findemail.name}})
                }
                else
                return res.status(401).json({message:'Wrong password'})
             

    }
    catch(e){
          return res.status(500).json({message:'error while login',e})
    }
}