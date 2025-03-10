import { Router } from "express";
import { signInSchema, signUpSchema } from "../types/types";
import prisma from "../db";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authRouter = Router(); 

authRouter.post("/signup" ,async (req , res) => {
   
    const parsedData = signUpSchema.safeParse(req.body);
    if(!parsedData.success) {
      res.status(400).json({
          message : "Invalid data"
      })
      return
    }
    try {
  const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prisma.user.create({
      data : {
          email : parsedData.data.email,
          password : hashedPassword,
          name : parsedData.data.name,
      }
    })
    console.log(user.id);
    res.json({
      user : user.id
     })
   } catch (error) {
    res.status(500).json({
      message : "Internal server error"
    })
   }
})

authRouter.post("/signin" ,async (req , res) => {
    const parsedData = signInSchema.safeParse(req.body);
    if(!parsedData.success) {
      res.status(400).json({
          message : "Invalid data"
      })
      return
    }
  
    try {
        const user = await prisma.user.findUnique({
            where : {
              email : parsedData.data.email,
            }
          })
          if(!user) {
              res.status(401).json({
                  message : "Invalid credentials"
              })
              return
          }
          const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);
          if(!isPasswordValid) {
              res.status(401).json({
                  message : "Invalid credentials"
              })
              return
          }
          const token = jwt.sign({
            id : user.id,
            email : user.email,
            name : user.name
          }, JWT_SECRET);
          
          console.log(token);

          res.json({
            token
          })
    } catch (error) {
        res.status(500).json({
            message : "Internal server error"
        })
    }
})