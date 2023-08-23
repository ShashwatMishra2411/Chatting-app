import React,{useRef} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'
import { useContacts } from '../contexts/createContact'

export default function NewContact(prop) {
    let {createContact} = useContacts()
    let idRef = useRef()
    let nameRef = useRef()
    function handleOnSubmit(e){
        e.preventDefault()
        createContact(idRef.current.value, nameRef.current.value)
        prop.close()
    }
  return (
    <div>
        <Modal.Header closeButton>New Contact</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleOnSubmit}>
            <Form.Group>
                <Form.Label>ID</Form.Label>
                <Form.Control type='text' ref={idRef} required></Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' ref={nameRef} required></Form.Control>
            </Form.Group>
            <Button type="submit">Create Contact</Button>
            </Form>
        </Modal.Body>
    </div>
  )
}
