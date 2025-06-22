import express from 'express';
import { User } from '../models/users.model';
import { z } from 'zod';
import bcrypt from "bcrypt"

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
        // const zodBody = await CreateUserZodSchema.parseAsync(req.body);
        const body = req.body

        //build in and custom instance method

        // console.log(body, "zod body")
        // // const cryptedPassword= await bcrypt.hash(body.password, 10)
        // // body.password=cryptedPassword;
        // // console.log(cryptedPassword)
        // // const user = await User.create(body);
        // const user= new User(body);
        // const cryptingPassword=await user.hashPassword(body.password);
        // user.password=cryptingPassword;

        // await user.save()

        //build in and custom static method
        // const staticPassword= await User.hashPassword(body.password);
        // console.log("static password", staticPassword)
        // body.password=staticPassword;

        const user = await User.create(body)



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
   //sorting
   // const users = await User.find().sort({"email":-1});
    //skipping
    // const users = await User.find().skip(5);
    // limiting
    // const users = await User.find().limit(5);
    const users = await User.find();
    res.status(200).send({
        success: true,
        message: "Users Found Successfully",
        body: users
    })
})

// usersRouter.get("/", async (req, res) => {
//     const userEmail = req.query.email;
//     let user = []
//     if (userEmail) {
//         user = await User.find({ email: userEmail });
//     }
//     else {
//         user = await User.find();
//     }

//     console.log(userEmail, user)


//     res.status(200).send({
//         success: true,
//         message: "Users Found Successfully",
//         body: user
//     })
// })

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
    // const result = await User.findByIdAndDelete(id);
    const result = await User.findOneAndDelete({ _id: id });
    //    const user=await User.deleteOne({_id:id})


    res.status(200).send({
        success: true,
        Message: "Delete Done",
        body: result
    })
})