import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate=useNavigate()
  const[login,setLogin]=useState({})
  const handleChange=(e)=>{
      setLogin({...login,[e.target.name]:e.target.value})
  }


  console.log(login)

  const handleSubmit=(e)=>{
      axios.post('https://project1-3-gflo.onrender.com/auth/login',login).then((res)=>{
          console.log(res)
         
          localStorage.setItem('loginId',res.data.loginId)
          localStorage.setItem('role',JSON.stringify(res.data.role));
          console.log(res.data.loginId);
          console.log(res.data.role);

      }).catch((err)=>{
          console.log(err)
      })
  }

  return (
    <div>
       <div>
       <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail"      >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  name='email'  onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name='password' onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" onClick={handleSubmit}>login</Button>

    </Form>
       </div>
    </div>
  )
}

export default Login
