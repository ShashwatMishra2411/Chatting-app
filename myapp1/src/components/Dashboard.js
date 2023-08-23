import React from 'react'
import Sidebar from './Sidebar'
import '../App.css'
// import ContactProvider from '../contexts/createContact'
// import Convoprovider from '../contexts/createConvo'
import OpenConvo from './OpenConvo'
import { useConvo } from '../contexts/createConvo'

export default function Dashboard(prop) {
  
  const {selectedConversation} = useConvo()
  // console.log(selectedConversation&&<OpenConvo></OpenConvo>)
  let id = prop.id
  // console.log(id)
  return (
    <div className="dashboard">
    <Sidebar id = {id}></Sidebar>
    {selectedConversation && <OpenConvo id={id}/>}
    </div>
    
  )
}
