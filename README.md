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

A schema in Mongoose defines the structure, types, and rules for documents in a MongoDB collection.

Think of it as a blueprint that tells Mongoose:

- What fields a document should have

- What data types those fields must be

- What validations or defaults to apply

```ts
import { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 18 },
});
```

## Data Types

| Mongoose Type | Description                     | Example                                                |
| ------------- | ------------------------------- | ------------------------------------------------------ |
| `String`      | Text values                     | `name: { type: String }`                               |
| `Number`      | Numeric values                  | `age: { type: Number }`                                |
| `Boolean`     | `true` or `false`               | `isActive: { type: Boolean }`                          |
| `Date`        | Date and time                   | `createdAt: { type: Date }`                            |
| `Array`       | A list of values                | `tags: { type: [String] }`                             |
| `ObjectId`    | Reference to another document   | `userId: { type: Schema.Types.ObjectId, ref: "User" }` |
| `Buffer`      | Binary data (e.g., image, file) | `file: { type: Buffer }`                               |
| `Mixed`       | Any type (use with caution)     | `metadata: { type: Schema.Types.Mixed }`               |
| `Map`         | Key-value pairs                 | `settings: { type: Map, of: String }`                  |
| `Decimal128`  | High-precision numbers          | `price: { type: Schema.Types.Decimal128 }`             |



Always use Schema.Types.ObjectId for references.

Use Array types like [String] or [Schema.Types.ObjectId].

Don't use Mixed unless necessary — it disables strict validation.

## 📘 Mongoose Conventions & Best Practices

```
These are the conventions we follow for using **Mongoose** with **Node.js/TypeScript** to keep our code clean, consistent, and scalable.

**One model per file:**  
Each model (e.g., `User`, `Note`, `Task`) should have its own file for better separation and organization.

**Separate schema and model (optional but recommended):**  
Define the schema in a `schemas/` folder and the model in a `models/` folder for large projects.

**PascalCase for model names:**  
Model names should use PascalCase, like `User`, `Note`, or `Product`.

**camelCase for field names:**  
Use camelCase for document field names like `firstName`, `userId`, or `createdAt`.

**Pluralized collection names:**  
Mongoose automatically pluralizes model names to form the collection name (`User` → `users`).

**Use TypeScript interfaces:**  
Define interfaces (`IUser`, `INote`, etc.) for strict typing, better intellisense, and maintainability.

**Use schema-level validation:**  
Define validations such as `required`, `min`, `max`, `enum`, and `validate` directly in the schema.

**Enable timestamps:**  
Add `{ timestamps: true }` in schema options to automatically create `createdAt` and `updatedAt`.

**Disable version key if unused:**  
Add `{ versionKey: false }` in schema options to remove the `__v` field from documents.

**Use virtuals for computed fields:**  
Add computed properties like `fullName` using `schema.virtual()`, which won't be stored in the DB.

**Use pre/post middleware for logic:**  
Apply `schema.pre()` and `schema.post()` hooks for logic like hashing passwords or cleanup after deletion.

**Reference other models with ObjectId:**  
Use `Schema.Types.ObjectId` with `ref: "ModelName"` to relate documents between collections.

**Use default values:**  
Add `default` to fields where applicable (e.g., `default: 'user'` for roles, `default: Date.now` for dates).

**Use trim and lowercase for strings:**  
Clean user input by setting `trim: true`, `lowercase: true` for string fields like email and names.

**Avoid `Mixed` type unless necessary:**  
Only use `Schema.Types.Mixed` for flexible data when you can't define a strict structure.

**Use instance and static methods:**  
Attach methods to `schema.methods` (for documents) or `schema.statics` (for the model itself).

```




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

## Detail Example ofSchema with all conventions

```ts
import { Schema } from "mongoose";
import validator from "validator";

// ✅ Embedded schema for address
const addressSchema = new Schema({
  city: { type: String, required: true, trim: true },     // City name (required string, trimmed)
  street: { type: String, required: true },               // Street name (required string)
  zip: { type: Number, min: 1000 }                        // ZIP code with minimum value
}, { _id: false });                                        // Prevent Mongoose from adding _id to embedded schema

// ✅ Main User Schema
export const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true                                          // First name (2–30 chars, trimmed)
  },

  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true                                          // Last name (2–30 chars, trimmed)
  },

  age: {
    type: Number,
    required: true,
    min: [18, 'Age must be at least 18'],               // Minimum age 18
    max: [60, 'Age must be below 60']                   // Maximum age 60
  },

  email: {
    type: String,
    required: true,
    unique: true,                                       // Must be unique
    lowercase: true,                                    // Auto-convert to lowercase
    trim: true,                                         // Trim whitespace
    validate: [validator.isEmail, 'Invalid email address']  // Validates email format using validator.js
  },

  password: {
    type: String,
    required: true,
    minlength: 6                                        // Password with at least 6 characters
  },

  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'Role must be either user or admin'
    },
    default: 'user'                                     // Role must be "user" or "admin"; default is "user"
  },

  address: addressSchema                                 // Embedded address schema
}, {
  timestamps: true,                                      // Adds createdAt and updatedAt fields
  versionKey: false,                                     // Removes __v field
  toJSON: { virtuals: true },                            // Include virtuals in JSON output
  toObject: { virtuals: true }                           // Include virtuals in object output
});

// ✅ Virtual field: fullName (not stored in DB)
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;           // Combines firstName + lastName
});

// ✅ Instance method: greet
userSchema.method("greet", function () {
  console.log(`Hi, I'm ${this.firstName}`);              // Logs greeting with first name
});

// ✅ Pre-save hook: trims names before saving
userSchema.pre("save", function (next) {
  this.firstName = this.firstName.trim();                // Trim first name
  this.lastName = this.lastName.trim();                  // Trim last name
  next();                                                // Proceed to next middleware
});

// ✅ Post-save hook: logs user after save
userSchema.post("save", function (doc, next) {
  console.log(`User ${doc.fullName} has been saved.`);   // Log after user is saved
  next();
});


```