const express= require('express');
const taskDB = require('../model/taskSchema');
const taskRoute = express.Router()







taskRoute.post('/task/:loginId', async (req, res) => {
    try{
        loginId=req.params.loginId;
        const { task} = req.body;
        if(!task){
           return   res.status(400).json({
            success:false,
            error:true,
             message: "Please provide task",
             
            })
        }
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
      
        const newTask = new taskDB({loginId,task,status: "pending",date:`${day}/${month}/${year}`});
        // console.log(`${day}/${month}/${year}`)
        const savedTask = await newTask.save();
       return  res.status(200).json({
            message:"Task added Successfully",
            data:savedTask,
        })


        }

    
    catch(error){
       return  res.status(500).json({
            message: "Internal server error",
            errorMessage: error.message,
        })
    }     
    
})


taskRoute.get('/gettask',async(req,res)=>{
    try{
        const tasks = await taskDB.find();
        if(tasks){
            return res.status(200).json({
                success:true,
                error:false,
                message:"Tasks fetched Successfully",
                data:tasks,
            })
        }
        else{
            return res.status(404).json({
                success:false,
                error:true,
                message:"No task found",
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:true,
            message: "Internal server error",
            errorMessage: error.message,
        })
    }
})


taskRoute.put('/changestatus/:id/:status',async(req,res)=>{
    try{

     const id= req.params.id;
     const status = req.params.status;
     if(!status || !id){
        return res.status(400).json({
            success:false,
            error:true,
            message:"Please provide all the required fields",
        })
     }

     const updatedtask = await taskDB.findByIdAndUpdate(id,{status:status},{new:true});
     if(!updatedtask){
        return res.status(200).json({
            success:false,
            error:true,
            message:"Task not updated Successfully",
          
        })
     }

     return res.status(200).json({
        success:true,
        error:false,
        message:"Task updated Successfully",
        data:updatedtask,
     })
        
    }
    catch(error){
        return res.status(500).json({
            success:false,
            error:true,
            message: "Internal server error",
            errorMessage: error.message,
        })
    }
})


taskRoute.delete('/deletetask/:id/:loginId',async(req,res)=>{
    try{
        
       const deletedtask = await taskDB.findByIdAndDelete({_id:req.params.id,loginId:req.params.loginId});
      
      if(!deletedtask){
        return res.status(200).json({
            success:true,
            error:false,
            message:"Task not deleted",
           
    });
    }
    else{
        return res.status(200).json({
            success:true,
            error:false,
            message:"Task deleted Successfully",
            data:deletedtask,
        })
    }
}
    catch(error){
        return res.status(500).json({
            success:false,
            error:true,
            message: "Internal server error",
            errorMessage: error.message,
        })
}
})


taskRoute.put('/updatetask/:id/:loginId',async(req,res)=>{
    try{
        const {task} = req.body;
        const updatedtask = await taskDB.findByIdAndUpdate({_id:req.params.id,loginId:req.params.loginId},task);
        if(!updatedtask){
            return res.status(200).json({
                success:true,
                error:false,
                message:"Task not updated",

        });
        }
        else{
            return res.status(200).json({
                success:true,
                error:false,
                message:"Task updated Successfully",
                data:updatedtask,
            })
        }
}
catch(error){
    return res.status(500).json({
        success:false,
        error:true,
        message: "Internal server error",
        errorMessage: error.message,
    })
}
}
)







module.exports = taskRoute;