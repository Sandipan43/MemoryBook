import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
const app=express();
dotenv.config();
app.use(express.json());
//app.use(express.urlencoded());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    optionsSuccessStatus:200

}));
app.use("/posts",postRoutes);


const PORT=process.env.PORT||5000;

const connectDb=async ()=>{
    try{
        const conn= await mongoose.connect(process.env.CONNECTION_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log(`MongoDB connected :${conn.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

connectDb();
app.listen(PORT,console.log(`server running in ${PORT}`));
