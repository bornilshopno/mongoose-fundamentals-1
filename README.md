## MONGOOSE

## Basic folder structures

src/
│
├── models/
│   └── user.model.ts
│
├── schemas/
│   └── user.schema.ts
│
├── types/
│   └── user.type.ts
│
└── routes/
    └── user.routes.ts



## MODELS

A model is a *JavaScript class* that represents a MongoDB collection.

It is built on top of a schema, which defines the structure and rules of the documents.

Mongoose automatically creates a collection for each model (in plural, lowercase form by default).
```ts
const userSchema = new mongoose.Schema({ name: String });
const User = mongoose.model("User", userSchema);

// - Use PascalCase for model names. ie- User
// -Mongoose will automatically map it to a lowercase, plural collection name in MongoDB.
```
✅ collection = physical storage (native MongoDB)

✅ model = programmatic interface to a collection (Mongoose)


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