import { Navigate, Outlet } from "react-router-dom"
import { usestateContext } from "../Context/Context"


const GuestLayout=()=>{
    
    const {token}=usestateContext();

    if(token){
       return <Navigate to="/news_feed"/>
    }
return (
    <>
    <Outlet/>
    </>
     )


}

export default GuestLayout