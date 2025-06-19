import { Application, Request, Response } from "express";
import express from "express";
import { model, Schema } from "mongoose";
import { notesRouter } from "./app/controllers/notes.controller";
import { usersRouter } from "./app/controllers/users.controller";



const app: Application=express()
app.use(express.json());


app.use("/notes", notesRouter )
app.use("/users", usersRouter )

app.get("/",(req: Request,res: Response)=>{
 res.send("Welcome to the Server")
})

export default app;