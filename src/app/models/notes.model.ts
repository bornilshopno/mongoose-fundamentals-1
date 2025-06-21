import { model, Schema } from "mongoose"
import { INotes } from "../interfaces/notes.interface"




const noteSchema= new Schema<INotes>({
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
    },
    userId: {type: Schema.Types.ObjectId, ref: "User", required:true}
},{
    versionKey:false,
    timestamps:true,
    
})

//model-builder/class
//convention to start with capital letter
//con== type mode name with "variable name"
export const Note= model("Note", noteSchema)