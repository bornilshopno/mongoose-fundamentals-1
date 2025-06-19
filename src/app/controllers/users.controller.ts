import express from 'express';
import { User } from '../models/users.model';


export const usersRouter = express.Router()

usersRouter.post("/create-User", async (req,res)=>{
    
    const body=req.body;
    const user=await User.create(body);
    console.log("after saving ")
    res.status(201).json({
        success:true,
        message:"User created successfully",
        user:body
    })
})

usersRouter.get("/", async(req,res)=>{
    console.log("GET")
    const Users=await User.find();
    res.status(200).send({
        success: true,
        message:"Users Found Successfully",
        body: Users
    })
})

usersRouter.get("/:UserID", async(req,res)=>{
    const id=req.params.UserID;
    const users=await User.findById(id);
    //find one=>{title:"learning"}
    res.status(200).send({
        success: true,
        message:"Single User Found Successfully",
        body: users
    })
})

usersRouter.patch("/update/:UserID",async (req,res)=>{
    const id=req.params.UserID;
    const updatedUser=req.body;
    const user= await User.findByIdAndUpdate(id,updatedUser,{new:true});
    //User1 and User 2 are same in output
    // const User1=await User.findOneAndUpdate({_id:id},updatedUser,{new:true});
    //same as previous mongodb result<=User
    // const User2=await User.updateOne({_id:id},updatedUser,{new:true});


    res.status(201).send({
        success:true,
        message:"User updated successfully",
        body:user
    })
})


usersRouter.delete("/delete/:UserID",async(req,res)=>{
   const id=req.params.UserID;
   const result= await User.findByIdAndDelete(id);
//    const User1=await User.findOneAndDelete({_id:id});
//    const user=await User.deleteOne({_id:id})


   res.status(200).send({
    success:true,
    Message:"Delete Done",
    body:result
   })
})