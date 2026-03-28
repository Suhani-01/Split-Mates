import express from "express";
import mongoose from "mongoose";
import UserRouter from "./routes/user.js";
import PrivateRouter from "./routes/private.js";
import GroupRouter from "./routes/group.js";
import ExpenseRouter from "./routes/expense.js";
import 'dotenv/config';

import {restrictToLoggedInUserOnly} from "./middleware/auth.js"

//To ensure cross origin connection (as frontend and backend both are on diff routes...) 
import cors from "cors";

//Enable reading of Cookie
import cookieParser from "cookie-parser";


const app=express();
app.use(cors({
    origin:"http://localhost:5173", //will allow req only from this 
    credentials:true //allows cookie and authentication headers to be sent
}));
app.use(cookieParser()); //Because we are using cookie


//Built in middleware to parse form data into readable javascript object
app.use(express.urlencoded({extended:false}));

//Built In middleware to parse json data into javascript object
app.use(express.json());

// connect MONGODB
// const URL="mongodb://127.0.0.1:27017/split-mates";

//Database connection using environment variable
const URL=process.env.MONGO_URI; //Database connection using environment variable
mongoose.connect(URL).then(()=>console.log("MongoDB connected")).catch((err)=>console.log("Mongo Error",err));

// Routes to handles user Signup and Login
app.use('/api/user',UserRouter);

//Route to search User to add him/her in the Group
app.use('/api/private',restrictToLoggedInUserOnly,PrivateRouter);

// Route to create group
// middleware will automatifally add the current user email and _id
app.use('/api/group',restrictToLoggedInUserOnly,GroupRouter);

// Routes to add expenses
app.use('/api/expense/',restrictToLoggedInUserOnly,ExpenseRouter)

const PORT=7000;
app.listen(PORT,()=>console.log("Server Started at port",PORT));


