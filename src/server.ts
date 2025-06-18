import dotenv from 'dotenv';
dotenv.config(); 
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server; 

const port=5000;
const main=async()=>{
try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pqwog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
    
    console.log("connected to MongoDB with Mongoose")
    server=app.listen(port,()=>{
        console.log(`server is running at ${port}`)
    })
} catch (error) {
    console.log(error)
}
}

main()

//mongodb+srv://<db_username>:<db_password>@cluster0.pqwog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0