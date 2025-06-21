import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/users.interface";
import validator from 'validator';

const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
},
    { _id: false
     }
)

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true, minlength: 2, maxlength: 10 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 10 },
    age: { type: Number, min: [18, 'age to be minimum 18, received {VALUE}'], max: 60, required: true },
    email: {
        type: String, unique: [true, 'email is repeated'], required: true, trim: true, lowercase: true,
        //     validate:{
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
        timestamps: true
    })

export const User = model("User", userSchema)

