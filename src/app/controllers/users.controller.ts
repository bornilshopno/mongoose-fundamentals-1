import express from 'express';
import { User } from '../models/users.model';
import { z } from 'zod';


export const usersRouter = express.Router()

const CreateUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional(),
})

usersRouter.post("/create-user", async (req, res) => {
    try {
        const body = await CreateUserZodSchema.parseAsync(req.body);
        console.log(body, "zod body")
        const user = await User.create(body);
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: error.message,
            error
        })
    }
})

usersRouter.get("/", async (req, res) => {
    console.log("GET")
    const users = await User.find();
    res.status(200).send({
        success: true,
        message: "Users Found Successfully",
        body: users
    })
})

usersRouter.get("/:UserID", async (req, res) => {
    const id = req.params.UserID;
    const user = await User.findById(id);
    //find one=>{title:"learning"}
    res.status(200).send({
        success: true,
        message: "Single User Found Successfully",
        body: user
    })
})

usersRouter.patch("/update/:UserID", async (req, res) => {
    const id = req.params.UserID;
    const updatedUser = req.body;
    const user = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    //User1 and User 2 are same in output
    // const User1=await User.findOneAndUpdate({_id:id},updatedUser,{new:true});
    //same as previous mongodb result<=User
    // const User2=await User.updateOne({_id:id},updatedUser,{new:true});


    res.status(201).send({
        success: true,
        message: "User updated successfully",
        body: user
    })
})


usersRouter.delete("/delete/:UserID", async (req, res) => {
    const id = req.params.UserID;
    const result = await User.findByIdAndDelete(id);
    //    const User1=await User.findOneAndDelete({_id:id});
    //    const user=await User.deleteOne({_id:id})


    res.status(200).send({
        success: true,
        Message: "Delete Done",
        body: result
    })
})