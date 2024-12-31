const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require('path') 
 
const dotenv = require('dotenv');
dotenv.config();



const PORT=process.env.PORT






mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database conneted")}).catch((err)=>{
        console.log(err);
    })
    const cookieParser=require("cookie-parser")
const cors = require('cors');

app.use(express.static(path.join(__dirname,"","public")))
console.log(__dirname);

app.use(cookieParser()); 

app.use(cors(
    { origin: 'https://front-endblog.vercel.app/', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  credentials: true,  
    }
)); 
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("database conneted")}).catch((err)=>{
        console.log(err);
    })

  


app.use(express.static(path.join(__dirname,"","public")))
console.log(__dirname);

app.use(express.json());

const userRouter=require("./router/routes")

app.use("/",userRouter);
app.listen(PORT,()=>{
    console.log("server started",PORT);
}) 
