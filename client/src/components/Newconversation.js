import React,{useState} from 'react'
import {Modal,Form,Button} from 'react-bootstrap'
import { useContacts } from '../contexts/createContact'
import { useConvo } from '../contexts/createConvo'

export default function NewContact(prop) {
    const [selectedContactIds, setSelectedContactIds] = useState([])
    const {contacts} = useContacts()
    const {createConversation} = useConvo()
    function handleOnSubmit(e){
      e.preventDefault()
      createConversation(selectedContactIds)
      prop.close()
    }
    function handleCheckBoxChange(contactId){
      setSelectedContactIds(prev =>{
       if(prev.includes(contactId)){
        return prev.filter(prevId =>{
          return contactId !== prevId
        })
       }else{
        return [...prev, contactId]
       }
      })
    }
  return (
    <div>
        <Modal.Header closeButton>New Conversation</Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleOnSubmit}>
              {contacts.map(contact =>(
            <Form.Group controlId={contact.id} key={contact.id}>
             <Form.Check
             type='checkbox'
             value={selectedContactIds.includes(contact.id)}
             label={contact.name}
             onChange={()=>(handleCheckBoxChange(contact.id))}>
              </Form.Check>   
            </Form.Group>
            ))}
            <Button type="submit">Create Conversation</Button>
            </Form>
        </Modal.Body>
    </div>
  )
}
