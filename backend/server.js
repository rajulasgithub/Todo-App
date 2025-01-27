const express = require("express");
const app= express();
const mongoose=require("mongoose");
const authroutes = require("./src/route/authRoute");
const taskRoute = require("./src/route/taskRoute");
const cors = require("cors");




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



mongoose.connect('mongodb+srv://rajulasrazak688:5s6WcR2LfTDYepHb@cluster0.0kzd0lb.mongodb.net/todoapp').then((response)=>{
    console.log('Database is connected');
}).catch((error)=>{
    console.log('Database not connected'); 
})

app.use('/todo',taskRoute)
app.use('/auth',authroutes)
app.get('/',(req,res)=>{
    res.send('hiiii')
})
app.listen(8000,(req,res)=>{
    console.log("server is running  on:http://localhost:8000");
})