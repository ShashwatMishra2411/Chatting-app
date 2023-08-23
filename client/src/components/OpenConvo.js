import React, {useState, useCallback} from 'react'
import {Form, Button} from 'react-bootstrap'
import { InputGroup } from 'react-bootstrap'
import {useConvo} from '../contexts/createConvo'
import '../App.css'

export default function OpenConvo(prop) {
    const[text, setText] = useState('')
    const setRef = useCallback((node) => {
      if(node){
        node.scrollIntoView({smooth:true})
      }
    },[])
    const {sendMessage, selectedConversation} = useConvo()
    function handleSubmit(e){
      e.preventDefault()
      sendMessage(selectedConversation.recipients.map(recipient=>recipient.id),text)
      setText('')
    }
  return (
    <div className='d-flex flex-column flex-grow-1 convobox'>
      <div className="flex-grow-1 overflow-auto convodisplay">
        <div className="d-flex flex-column align-itmes-start justify-content-end px-3">
          {selectedConversation.messages.map((message,index)=>{
            let lastmessage = selectedConversation.messages.length-1 === index
            return (
              <div
              ref={(lastmessage)?setRef:null}
              key = {index}
              className="my-1 d-flex flex-column align-items-end">
                <div className='rounded px-2 py-1 message'>{message.text}</div>
                <div className='sender'>{(prop.id === message.senderName)?"You":message.senderName}</div>
              </div>
            )
          })}
          </div>      
        </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
            <InputGroup>
            <Form.Control 
            as="textarea" 
            required 
            value={text}
            onChange={e=>setText(e.target.value)}
            style={{height:"5.5vh", resize:"none"}}/>
            <Button type='submit'>Send</Button>
            </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
        // {/* <InputGroup.Append>
        //     <Button type='submit'>Send</Button>
        // </InputGroup.Append> */}