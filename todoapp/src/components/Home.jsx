import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


const Home = () => {
 const [task,setTask]=useState("");
 const [message,setMessage]=useState("");
 const [error,setError]=useState("");


  const handleSubmit=async(e)=>{
    const loginId= localStorage.getItem("loginId");
    e.preventDefault();
      
    

    if(!task.trim()){
      setError("Please enter a task")
      return;
    }
    setError("")


    try{
      const response = await axios.post (`https://todo-app-yiaz.onrender.com/todo/task/${loginId}`,{task})
      console.log(response.data)
      setMessage(response.data.message)
      alert(response.data.message)
  
    }
   catch(error){
    setMessage(error.response?.data?.message || 'Error adding task')

   }
   
  }
  
  return (
    <div>
      <div className='container '>
      
      <Form className='' onSubmit={handleSubmit} >
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control   as="textarea" name='task'   rows={3}  onChange={(e)=>setTask(e.target.value)}  />
        {error && <Alert variant="warning"  dismissible >{error}</Alert>} 

      </Form.Group>
      <Button variant="primary"  type='submit'>Add</Button>
    </Form>

      </div>
     
      
      
    </div>
  )
}

export default Home
