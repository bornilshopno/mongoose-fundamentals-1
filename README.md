
## SCHEMA

```js
import { model, Schema } from "mongoose";

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

const Note= model("Note", noteSchema)

 //approach-1
    const myNote=new Note({
        title:"Learning express",
        content: "first note",
        tags:{label:"June"}
    })
    



```

## BUILT IN
user.create ==static method
user.save==instance method


#### virtuals
```
 {
        versionKey: false,
        timestamps: true,
        toJSON:{virtuals: true},
        toObject:{virtuals: true}
    }

userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`
})

```