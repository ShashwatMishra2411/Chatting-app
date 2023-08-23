import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useConvo } from '../contexts/createConvo'

export default function Conversations() {
  const {conversations, selectConversationIndex} = useConvo()
  return (
    <div>
     <ListGroup variant="flush">
        {conversations.map((conversation,index) =>{
          return(<ListGroup.Item 
          key={index}
          action
          onClick={()=>selectConversationIndex(index)}
          active={conversation.selected}>
            {conversation.recipients.map(recipient=>recipient.name).join(", ")}
          </ListGroup.Item>)
        })}
      </ListGroup>
    </div>
  )
}
