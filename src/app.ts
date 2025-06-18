import { Application, Request, Response } from "express";
import express from "express";
import { model, Schema } from "mongoose";


const app: Application=express()
app.use(express.json());


const noteSchema= new Schema({
    // title: String,
     title:{type: String, required:true, trim: true},
    content:{type:String, default:''},
    category:{type: String,
        enum:["Personal","Work","Study"],
        default:"Personal",
    },
    pinned:{type:Boolean, default: false},
    tags:{
        label:{type:String, required: true},
        color:{type:String, default:"Green"}
    }
})

//model-builder/class
//convention to start with capital letter
//con== type mode name with "variable name"
const Note= model("Note", noteSchema)

app.post("/create-note", async (req,res)=>{
    
    const body=req.body;

    //approach-1
    // const myNote=new Note({
    //     title:"Learning express",
    //     tags:{label:"June"}
    // })
    //for saving the funciton otherwise it will not run
    // await myNote.save()

    //approach-2
    const note=await Note.create(body)
    console.log("after saving ")
    res.status(201).json({
        success:true,
        message:"Note created successfully",
        note:body
    })
})

app.get("/",(req: Request,res: Response)=>{
 res.send("Welcome to the Server")
})

export default app;