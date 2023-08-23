import React from 'react'
import { useContacts } from '../contexts/createContact'
import { ListGroup } from 'react-bootstrap'

export default function Contacts() {
  let {contacts} = useContacts()
  return (
    <div>
      <ListGroup variant="flush">
        {contacts.map(contact =>{
          return(<ListGroup.Item key={contact.id}>
            {contact.name}
          </ListGroup.Item>)
        })}
      </ListGroup>
    </div>
  )
}
