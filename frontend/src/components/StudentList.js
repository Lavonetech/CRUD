import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Table,Button} from 'react-bootstrap'



const Studentlist = () => {


const [data,setData]=useState([]);
const baseUrl="http://localhost:8080/api/student";

useEffect(()=>{
    axios.get(baseUrl).then((res)=>{
        setData(res.data.data)
        /*console.log(data)*/
    })
},[data])

async function handleDelete(id){

  await axios.delete(`http://localhost:8080/api/student/delete/${id}`)
   .then((res)=>{
     console.log("Successfully Deleted" + res.data)
    
   })
   .catch(err=>{
     console.log(err)
   })
}
    return (
      <>
            <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      {
          data.map((item)=>(
<tbody>
        <tr key={item}>
          <td>{item.id}</td>
          <td>{item.stname}</td>
          <td>{item.course}</td>
          <td>{item.fee}</td>
          <td><Button onClick={()=>{
            handleDelete()
          }}>Delete</Button></td>
        </tr>
        
       
        </tbody>
          ))
      
}
        </Table>
        </>
    );
}

export default Studentlist;
