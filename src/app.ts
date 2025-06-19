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

app.get("/notes", async(req,res)=>{
    const notes=await Note.find();
    res.status(200).send({
        success: true,
        message:"Notes Found Successfully",
        body: notes
    })
})

app.get("/notes/:noteID", async(req,res)=>{
    const id=req.params.noteID;
    const notes=await Note.findById(id);
    //find one=>{title:"learning"}
    res.status(200).send({
        success: true,
        message:"Single Note Found Successfully",
        body: notes
    })
})

app.patch("/update/:noteID",async (req,res)=>{
    const id=req.params.noteID;
    const updatedNote=req.body;
    const note= await Note.findByIdAndUpdate(id,updatedNote,{new:true});
    //note1 and note 2 are same in output
    const note1=await Note.findOneAndUpdate({_id:id},updatedNote,{new:true});
    //same as previous mongodb result<=note
    const note2=await Note.updateOne({_id:id},updatedNote,{new:true});

console.log(note)
    res.status(201).send({
        success:true,
        message:"note updated successfully",
        body:[note,note1,note2]

    })
})


app.delete("/delete/:noteID",async(req,res)=>{
   const id=req.params.noteID;
//    const note= await Note.findByIdAndDelete(id);
//    const note1=await Note.findOneAndDelete({_id:id});
   const note2=await Note.deleteOne({_id:id})


   res.status(200).send({
    success:true,
    Message:"Delete Done",
    body:note2
   })
})

app.get("/",(req: Request,res: Response)=>{
 res.send("Welcome to the Server")
})

export default app;