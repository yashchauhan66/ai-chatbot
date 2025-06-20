import express from "express";
const app=express();
import connectDB from "./moduls/db.js";
import dotenv from "dotenv";
import AuthRouth from "./routes/AuthRouth.js";
import cors from "cors";


dotenv.config();
 //middleware

app.use(express.json());
app.use(cors());

app.use("/api/auth",AuthRouth);


app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.listen(3000,()=>{
    connectDB();
    console.log("Server is running on port 3000");
});