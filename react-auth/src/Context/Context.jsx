import { createContext, useState } from "react"
import { useContext } from "react"

const StateContext=createContext({
    token:null,
    currentUser:null,
    Settoken:()=>{},
    setcurrentUser:()=>{}

})

const ContextProvider=({children})=>{
    const [token,_SetToken]=useState(localStorage.getItem("ACCESS_TOKEN"));
    const [currentUser,setcurrentUser]=useState({});
    
    const Settoken=(token)=>{
        _SetToken(token);
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token)
        }
        else {
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
    return (
           <StateContext.Provider value={{
            token,
            currentUser,
            Settoken,
            setcurrentUser}}
           >
         {children}
           </StateContext.Provider>
           )
}

export const usestateContext=()=>useContext(StateContext);
export default ContextProvider;