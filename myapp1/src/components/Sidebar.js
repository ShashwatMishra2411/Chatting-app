import React,{useState} from 'react'
import '../App.css'
import {Nav,Tab,Button, Modal} from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewContact from './NewContact'
import NewConversation from './Newconversation'

const convo_key = "conversations"
const contact_key="contacts"
export default function Sidebar(prop) {
    let [activekey,setActiveKey] = useState(convo_key)
    const [modalOpen, setModalOpen] = useState(false)
    function modalClose(){
        setModalOpen(false)
    }
      return (
        <div style={
            {alignSelf:"flex-start"}} className='d-flex flex-column flex-grow-1 sidebar'>
        <Tab.Container activeKey={activekey} onSelect={setActiveKey}>
            <Nav variant='tabs' className='justify-content-center'>
                <Nav.Item>
                    <Nav.Link eventKey={convo_key}>
                        Conversations
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={contact_key}>
                        Contacts
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Tab.Content className='overflow-auto flex-grow-1' style={{borderRight:"1px solid lightgrey"}}>
            <Tab.Pane eventKey={convo_key}>
                <Conversations></Conversations>
            </Tab.Pane>
            <Tab.Pane eventKey={contact_key}>
                <Contacts></Contacts>
            </Tab.Pane>
            </Tab.Content>
            <div className="iDdisplay border-right">
                Your ID: {prop.id}
            </div>
            <Button className='rounded-0 sidebarbutton' onClick={()=>setModalOpen(true)}>
                New {activekey===convo_key?"Conversation":"Contact"}
            </Button>
            <Modal show={modalOpen} onHide={modalClose}>
            {activekey===convo_key?<NewConversation close={modalClose}/>:<NewContact close={modalClose}/>}
            </Modal>
        </Tab.Container>
        </div>
      );
}
