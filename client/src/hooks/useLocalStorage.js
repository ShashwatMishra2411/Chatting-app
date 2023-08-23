import {useEffect, useState} from 'react'

let prefix = "whatsapp-clone-"

export default function UseLocalStorage(key, initialValue) {
  let prefixedkey = prefix+key
  let [value, setValue] = useState(()=>{
  let jsonValue = localStorage.getItem(prefixedkey)
  // console.log("jval = "+jsonValue)
  // in the frist instance, the getitem wont find any key so it just returns null but due to this the value of value is changed and hence useEffect is called and there it creates a new key with value null or undefined
  if(jsonValue !== null && jsonValue !== undefined && jsonValue !== [])
   {
    console.log("Json called")
    return JSON.parse(jsonValue)}
  if(typeof initialValue === 'function')
  {
    console.log("function called")
    return initialValue() 
}
  else
  {
    console.log("value called")
    return initialValue}
})
useEffect(()=>{
  // console.log(value)
  // let jsonValue = localStorage.getItem("prefixedkey")
  // console.log(jsonValue)
  localStorage.setItem(prefixedkey,JSON.stringify(value))
},[value,prefixedkey])
return [value,setValue]
}

