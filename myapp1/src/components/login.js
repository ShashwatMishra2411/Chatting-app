import React, { useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.css'
// import {v4 as uuidV4} from 'uuid'
// this is used to generate random ids
export default function Login(prop) {
    let id = useRef()
    let pass = useRef()
    function handleDefault(e){
        e.preventDefault()
        prop.set(()=>{
          return [id.current.value, pass.current.value]
        })
    }
    function createNewId(){
        prop.set(()=>{
          return [id.current.value, pass.current.value]
        })
    }
  return (
    <div>
    <Form onSubmit={handleDefault}>
      <Form.Group  className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Your Id</Form.Label>
        <Form.Control ref={id} type="text" placeholder="Enter ID" required/>
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={pass} required/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button  variant="primary" type="submit" className="lbtn">
        Login
      </Button>
      <Button variant='secondary' onClick={createNewId}>Create a New Id</Button>
    </Form>
    </div>
  )
}
