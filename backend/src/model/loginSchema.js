const mongoose= require("mongoose");
const loginSchema=new mongoose.Schema({ 
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
})

const loginDB= new mongoose.model('login',loginSchema);
module.exports=loginDB;