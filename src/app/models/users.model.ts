import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethod, UserStaticMethods } from "../interfaces/users.interface";
import validator from 'validator';
import bcrypt from 'bcrypt'
import { Note } from "./notes.model";
const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
},
    {
        _id: false
    }
)

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

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethod>({
    firstName: { type: String, required: true, minlength: 2, maxlength: 10 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 10 },
    age: { type: Number, min: [18, 'age to be minimum 18, received {VALUE}'], max: 60, required: true },
    email: {
        type: String, unique: [true, 'email is repeated'], required: true, trim: true, lowercase: true,
        //    validation will done with below isEmail validator 
        // validate:{
        //     validator:function(v){
        //       return  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
        //     },
        //     message:function(props){
        //         return `email ${props.value} is not valid email`

        //     }
        // } 
        validate: [validator.isEmail, 'Invalid Email {VALUE}']

    },
    password: { type: String, required: true },
    role: {
        type: String, enum: {
            values: ['user', 'admin'], message: 'Role must be user or admin but got {VALUE}'
        }, default: 'user'
    },
    address: addressSchema

},
    {
        versionKey: false,
        timestamps: true,
        toJSON:{virtuals: true},
        toObject:{virtuals: true}
    })


userSchema.method("hashPassword", async function (password: string) {
    const cryptedPassword = await bcrypt.hash(password, 10)
    console.log(cryptedPassword)
    return cryptedPassword
})

userSchema.static("hashPassword", async function (password: string) {
    const cryptedPassword = await bcrypt.hash(password, 10)
    console.log(cryptedPassword)
    return cryptedPassword
})

//document middleware
userSchema.pre("save", async function(next) {
     console.log("password from pre", this.password)
 this.password= await bcrypt.hash(this.password,10)    
 console.log("password from hash", this.password);
 next();
})
//document middleware
userSchema.post("save", function(doc, next){
    console.log("post save hook", doc);
    next()
})

//query middeware 
// post hook
userSchema.post("findOneAndDelete", async function(doc, next){
if(doc){
    console.log(doc);
    await Note.deleteMany({userId: doc._id});
    next()
}
})
//query middeware 
// pre hook
userSchema.pre('find', function(next){
    console.log("find Operation")
    next()
})

userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`
})

export const User = model <IUser, UserStaticMethods>("User", userSchema)

