import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';



const Signup = () => {
  const[signup,setSignup]=useState({});
    const[error,setError]=useState({});



    const handleChange=(event)=>{
      setSignup({...signup,[event.target.name]:event.target.value})
   }
   console.log(signup)

 const validate=()=>{
   const errormessage={}
  if(!signup.name){
    errormessage.name='enter name'
  }
  if(!signup.number){
   errormessage.number='enter number'
 } 
 if(!signup.email){
   errormessage.email='enter email'
 }
 if(!signup.password){
   errormessage.password='enter password'
 } 
 setError(errormessage)
 return Object.keys(errormessage).length===0

 }


 const handleSubmit=(event)=>{
  if(!validate()){
     console.log("error")
     return
  }


  axios.post('http://localhost:8000/auth/signup',signup).then((response)=>{
      console.log(response.data)
      localStorage.setItem('loginId',response.data.loginId)
      localStorage.setItem('role',response.data.role)
     console.log(response.data.role)
  }).catch((error)=>{
      console.log(error)
  })
}





  return (
    <div>
      <div>
      <Form >
      <Form.Group className="mb-3" controlId="formEmail"   >
        <Form.Label>{error.name}</Form.Label>
        <Form.Control  required type="text" placeholder="Enter Name"  name='name'  onChange={handleChange}   />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>{error.number}</Form.Label>
        <Form.Control type="number" placeholder="number" name='number' onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>{error.email}</Form.Label>
        <Form.Control type="email" placeholder="email" name='email' onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>{error.password}</Form.Label>
        <Form.Control  required type="password" placeholder="password" name='password' onChange={handleChange}/>
        <Form.Control.Feedback type="invalid">
          Password must be at least 6 characters.
        </Form.Control.Feedback>
      </Form.Group>
      <Button variant="primary"  onClick={handleSubmit}>submit</Button>

    </Form>

      </div>
      
    </div>
  )
}

export default Signup
