import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';



const Viewtask = () => {
    const [task,setTask] = useState([])
    const[updatedTask,setUpdatedTask] = useState('')
    const [show, setShow] = useState(false);
    const [message,setMessage] = useState('')
   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   useEffect(()  => { 
    const getTask = async () =>{
      try{
            const response = await axios.get('https://todo-app-yiaz.onrender.com/todo/gettask')
            console.log(response.data.data)
            setTask(response.data.data)

        }
        catch(error){
            console.log(error)
       } }

 getTask();
    },[])


 

    const changeStatus = async(id,status)=>{

        console.log(id);
        console.log(status);
        try{
            const response = await axios.put(`https://todo-app-yiaz.onrender.com/todo/changestatus/${id}/${status}`)
            console.log(response.data.data)
        }
        catch(error){
            console.log(error)
        }
    }


 const deleteTask= async (id)=>{
  const loginId = localStorage.getItem('loginId')

  try{
    const response = await axios.delete(`https://todo-app-yiaz.onrender.com/todo/deletetask/${id}/${loginId}`)
    console.log(response.data.data)
  }
  catch(error){
    console.log(error)
  }
 
 }


 const updatetask= async (e)  =>{
 
  setUpdatedTask({updatedTask,[e.target.name]:e.target.value})
  console.log(updatedTask)
  
 }


 const taskupdate= async (id)=>{
     try{
      const loginId = localStorage.getItem('loginId');
      const response = await axios.put(`https://todo-app-yiaz.onrender.com/todo/updatetask/${id}/${loginId}`,updatedTask)
      console.log(response);
     }
     catch(error){
      console.log(error)
     }
 }
 


  return (
    <div >
        {task.map((item,index) => (
          
            <div >
              {index+1}
            <Card     style={{width:'800px',margin:'auto'}}>
                  <Card.Body className='d-flex'>
                  
                    <Card.Text style={{width:'500px'}}>
                     {item.task}
                    </Card.Text>
                    <Card.Text style={{width:'300px'}} >Date:{item.date}</Card.Text>
                    <Form.Group >
                  <Form.Label>
                    <strong>Status:</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    value={item.status}
                    onChange={(e) => changeStatus(item._id, e.target.value)}
                    style={{width:'150px'}}  className='text-center '
                  >
                    <option value="Pending" className='bg-sucess'>Pending</option>
                    <option value="completed">Completed</option>
                  </Form.Control>
                </Form.Group>
                    
                    <Button variant="danger" onClick={() => deleteTask(item._id)} style={{width:'100px'}}>Delete</Button>
                    <Button variant="danger"  onClick={handleShow} style={{width:'100px'}}>Edit task</Button>

                    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
           <Modal.Title>Edit Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
       <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control   as="textarea" name='task'    rows={3}  onChange={updatetask} />
      </Form.Group>
       </Form>
          </Modal.Body>
           <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
           </Button>
           <Button variant="primary" onClick={()=>taskupdate(item._id)}    >
           Update
          </Button>
        </Modal.Footer>
      </Modal>
                  </Card.Body>
                </Card>
            
            </div>
            
        ))
        }


        
      
    </div>
  )
}

export default Viewtask
