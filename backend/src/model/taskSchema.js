const mongoose= require('mongoose');
const taskSchema = new mongoose.Schema({
    loginId:{type:mongoose.Types.ObjectId,ref:"login"},
    task:{type:String,required:true},
    status:{type:String,required:true},
    date:{type:String,required:true},
    // time:{type:String,required:true},
    
    
})

const taskDB= mongoose.model('tasklist',taskSchema);
module.exports=taskDB;
