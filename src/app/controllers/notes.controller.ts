import express from "express";
import { Note } from "../models/notes.model";


export const notesRouter = express.Router()

notesRouter.post("/create-note", async (req,res)=>{
    
    const body=req.body;

    //notesRouterRouterroach-1
    // const myNote=new Note({
    //     title:"Learning express",
    //     tags:{label:"June"}
    // })
    //for saving the funciton otherwise it will not run
    // await myNote.save()

    //notesRouterroach-2
    const note=await Note.create(body)
    console.log("after saving ")
    res.status(201).json({
        success:true,
        message:"Note created successfully",
        note:body
    })
})

notesRouter.get("/", async(req,res)=>{
    console.log("GET")
    const notes=await Note.find().populate("userId");
    res.status(200).send({
        success: true,
        message:"Notes Found Successfully",
        body: notes
    })
})

notesRouter.get("/:noteID", async(req,res)=>{
    const id=req.params.noteID;
    const notes=await Note.findById(id);
    //find one=>{title:"learning"}
    res.status(200).send({
        success: true,
        message:"Single Note Found Successfully",
        body: notes
    })
})

notesRouter.patch("/update/:noteID",async (req,res)=>{
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


notesRouter.delete("/delete/:noteID",async(req,res)=>{
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