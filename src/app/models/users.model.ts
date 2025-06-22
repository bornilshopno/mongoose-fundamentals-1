import { model } from "mongoose";
import { IUser, UserStaticMethods } from "../interfaces/users.interface";
import { userSchema } from "../schemas/users.schema";


export const User = model<IUser, UserStaticMethods>("User", userSchema);
