const mongoose= require("mongoose");
const signupSchema=new mongoose.Schema({
    loginId:{type:mongoose.Types.ObjectId,ref:"login"},
    name:{type:String,required:true},
    number:{type:Number,required:true},
})

const signupDB= new mongoose.model('registration',signupSchema);
module.exports=signupDB;
