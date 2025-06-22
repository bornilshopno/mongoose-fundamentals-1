import { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { IAddress, IUser, UserInstanceMethod, UserStaticMethods } from "../interfaces/users.interface";
import { Note } from "../models/notes.model"; // Adjust path if needed

const addressSchema = new Schema<IAddress>({
  city: { type: String },
  street: { type: String },
  zip: { type: Number }
}, { _id: false });

export const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethod>({
  firstName: { type: String, required: true, minlength: 2, maxlength: 10 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 10 },
  age: {
    type: Number,
    required: true,
    min: [18, 'age to be minimum 18, received {VALUE}'],
    max: 60
  },
  email: {
    type: String,
    unique: [true, 'email is repeated'],
    required: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email {VALUE}']
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: 'Role must be user or admin but got {VALUE}'
    },
    default: 'user'
  },
  address: addressSchema
}, {
  versionKey: false,
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 👉 Instance method
userSchema.method("hashPassword", async function (password: string) {
  return await bcrypt.hash(password, 10);
});

// 👉 Static method
userSchema.static("hashPassword", async function (password: string) {
  return await bcrypt.hash(password, 10);
});

// 👉 Middleware
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.post("save", function (doc, next) {
  console.log("User saved:", doc);
  next();
});

userSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Note.deleteMany({ userId: doc._id });
    next();
  }
});

userSchema.pre("find", function (next) {
  console.log("Running find query");
  next();
});

// 👉 Virtual
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});





// const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethod>({
//     firstName: { type: String, required: true, minlength: 2, maxlength: 10 },
//     lastName: { type: String, required: true, minlength: 2, maxlength: 10 },
//     age: { type: Number, min: [18, 'age to be minimum 18, received {VALUE}'], max: 60, required: true },
//     email: {
//         type: String, unique: [true, 'email is repeated'], required: true, trim: true, lowercase: true,
//         //    validation will done with below isEmail validator 
//         // validate:{
//         //     validator:function(v){
//         //       return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
//         //     },
//         //     message:function(props){
//         //         return `email ${props.value} is not valid email`

//         //     }
//         // } 
//         validate: [validator.isEmail, 'Invalid Email {VALUE}']

//     },
//     password: { type: String, required: true },
//     role: {
//         type: String, enum: {
//             values: ['user', 'admin'], message: 'Role must be user or admin but got {VALUE}'
//         }, default: 'user'
//     },
//     address: addressSchema

// },
//     {
//         versionKey: false,
//         timestamps: true
//     })