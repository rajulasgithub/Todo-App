const mongoose= require("mongoose");
const compsignupSchema=new mongoose.Schema({
    loginId:{type:mongoose.Types.ObjectId,ref:"login"},
    username:{type:String,required:true}, 

})

const compsignupDB= new mongoose.model('compregistration',compsignupSchema);
module.exports=compsignupDB;
