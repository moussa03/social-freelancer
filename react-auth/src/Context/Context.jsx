import { createContext, useState } from "react"
import { useContext } from "react"
import { useEffect } from "react"
import AxiosClients from '../Utils/AxiosClients';
import Echo from 'laravel-echo'
<script src="https://js.pusher.com/7.2/pusher.min.js"></script>


const StateContext=createContext({
    token:null,
    currentUser:null,
    Settoken:()=>{},
    setcurrentUser:()=>{},
    setCounter:()=>{},
    setPreviousCounter:()=>{},
    Notif:null

})



const ContextProvider=({children})=>{
     
    const [token,_SetToken]=useState(localStorage.getItem("ACCESS_TOKEN"));
    const [currentUser,setcurrentUser]=useState({});
    const [counter, setCounter] = useState();
    const [previousCounter, setPreviousCounter] = useState();
    // const [notifications,setnotification]=useState();
    const [Notif,setnotif]=useState();
 
    function asset(folder,path) {
        const assetUrl = import.meta.env.VITE_HOST;
        if(folder==="small"){
            return `${assetUrl}/images/profil_pictures/small/${path}`;
        }
    
        else if(folder==="origin"){
            return `${assetUrl}/images/profil_pictures/origin/${path}`;
        }
      }
     
    
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
            counter,
            previousCounter,
            Settoken,
            setcurrentUser,
            asset,
            setCounter,
            setPreviousCounter,
            Notif
        }}
           >
         {children}
           </StateContext.Provider>
           )
}

export const usestateContext=()=>useContext(StateContext);
export default ContextProvider;