import axios from 'axios';
import React, { useState,useEffect } from 'react';

import {Form,Button} from 'react-bootstrap'

const Addstudent = () => {
 const [formData,setFormDtata]=useState({
   id:'',
   stname:'',
   course:'',
   fee:''

})
function handleChange(e){
  setFormDtata({
    ...formData,
    [e.target.name]:e.target.value,
  })
}

const handleSubmit=(e)=>{
    e.preventDefault();
 

 if(formData.id){
     axios.put(`http://localhost:8080/api/student/update/${formData.id}`,formData)
     .then((res)=>{
         console.log(res.data)
     })
     .catch(err=>{
         console.log("something went wrong" + err)
     })
 }else{
     axios.post('http://localhost:8080/api/student/add',formData)
     .then((res)=>{
         console.log("success")
         setFormDtata({id:'',stname:'',course:'',fee:''})
     }).catch(err=>{
       console.log(err)
     })
 }
}
useEffect(() => {
  if (formData.id) {
    axios.get(`/api/users/${formData.id}`).then((response) => {
      setFormDtata(response.data);
    }).catch(() => {
      // handle error
    });
  }
}, [formData.id]);
    return (
        <div>
            <Form>
      
      <Form.Group className="mb-3" >
        <Form.Label>Student Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={formData.stname} onChange={handleChange} name='stname'/>
       
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Course</Form.Label>
        <Form.Control type="text" placeholder="enter course" value={formData.course} onChange={handleChange} name='course'/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Fee</Form.Label>
        <Form.Control type="text" placeholder="course fee" value={formData.fee} onChange={handleChange} name='fee'/>
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
        </div>
    );
}

export default Addstudent;
