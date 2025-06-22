import { model } from "mongoose";
import { INotes } from "../interfaces/notes.interface";
import { noteSchema } from "../schemas/notes.schema";


export const Note = model<INotes>("Note", noteSchema);

//model-builder/class
//convention to start with capital letter
//con== type mode name with "variable name"
