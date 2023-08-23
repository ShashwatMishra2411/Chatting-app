import React,{useContext, useState} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useContacts } from './createContact'
const ConvoContext = React.createContext()

export function useConvo(){
    return useContext(ConvoContext)
}
export default function Convoprovider({id,children}) {
    const {contacts} = useContacts()
    let [conversations, setConversations] = useLocalStorage('conversations',[])
    const [selectedConversationIndex, setselectedConversationIndex] = useState(0)
    function createConversation(recipients){
        setConversations(prev=>{
            return [...prev,{recipients, messages:[]}]
        })
    }
    function addMessageToConversation({recipients, text, sender}){
        // console.log({sender})
        setConversations(prev=>{
            let madeChange = false
            const newMessage = {sender, text}
            const newConversations = prev.map(conversation=>{
                if(arrayEquality(conversation.recipients, recipients)){
                    madeChange = true
                    return {
                        ...conversation,messages:[...conversation.messages, newMessage]
                    }
                }
                return conversation
            })
            if(madeChange){
                return newConversations
            }else{
                return [...prev,{recipients, messages:[newMessage]}]
            }
        })
    }
    function sendMessage(recipients,text){
        // console.log(id)
        addMessageToConversation({recipients, text, sender:id[0]})
    }
    function arrayEquality(a,b){
        if(a.length !== b.length) return false
        a.sort()
        b.sort()
        return a.every((e,i)=>{
            return e === b[i]
        })
    }

    const formattedConversations = conversations.map((conversation,index)=>{
        const recipients = (conversation.recipients).map(recipient=>{
            const contact = contacts.find(contact=>{
                return contact.id === recipient
            })
            // console.log("contact = "+contact)
            const name = (contact&&contact.name)||recipient
            return {id:recipient,name}
        })
        const messages = conversation.messages.map(message=>{const contact = contacts.find(contact=>{
            return contact.id === message.sender
        })
        const name = (contact&&contact.name)||message.sender
        return {...message,senderName:name}})
        const selected = index===selectedConversationIndex
        return {...conversation, recipients,messages,selected}
    })
    console.log(formattedConversations[selectedConversationIndex])
    const value = {conversations:formattedConversations,
        selectConversationIndex:setselectedConversationIndex,
        selectedConversation:formattedConversations[selectedConversationIndex],
        sendMessage,
        createConversation}
  return (
    <ConvoContext.Provider value={value}>
        {children}
    </ConvoContext.Provider>
  )
}
