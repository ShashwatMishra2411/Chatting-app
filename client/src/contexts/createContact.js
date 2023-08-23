import React,{useContext} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
const ThemeContext = React.createContext()

export function useContacts(){
    return useContext(ThemeContext)
}
export default function Contactprovider({children}) {
    let [contacts, setContact] = useLocalStorage('contacts',[])
    function createContact(id,name){
        setContact(prev=>{
            return [...prev,{id, name}]
        })
    }
  return (
    <ThemeContext.Provider value={{contacts, createContact}}>
        {children}
    </ThemeContext.Provider>
  )
}
