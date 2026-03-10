import express from "express";
import mongoose from "mongoose";
import UserRouter from "./routes/user.js";
import PrivateRouter from "./routes/private.js";
import GroupRouter from "./routes/group.js";
import ExpenseRouter from "./routes/expense.js";



import {restrictToLoggedInUserOnly} from "./middleware/auth.js"

//iske bina req ni jari thi front end se backend ko 
import cors from "cors";
import cookieParser from "cookie-parser";


const app=express();
app.use(cors({
    origin:"http://localhost:5173", //will allow req only from this 
    credentials:true //allows cookie and authentication headers to be sent
}));
app.use(cookieParser()); //bcz we are using cookie


//this is a builtin middleware to parse form data into readable javascript object
app.use(express.urlencoded({extended:false}));


//this is a builtin middleware used to parse json data into javascript object
app.use(express.json());

//connect MONGODB
const URL="mongodb://127.0.0.1:27017/split-mates";
mongoose.connect(URL).then(()=>console.log("MongoDB connected")).catch((err)=>console.log("Mongo Error",err));

//making routes go to user routes
app.use('/api/user',UserRouter);

//making routes for the access of data in the dashboard
app.use('/api/private',restrictToLoggedInUserOnly,PrivateRouter);

//making route to create group
// middleware will automatifally add the user email and _id
app.use('/api/group',restrictToLoggedInUserOnly,GroupRouter);

//making route to add expenses
app.use('/api/expense/',restrictToLoggedInUserOnly,ExpenseRouter)

const PORT=7000;
app.listen(PORT,()=>console.log("Server Started at port",PORT));


