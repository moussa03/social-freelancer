import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { usestateContext } from "../Context/Context"
import Navbar from "./Navbar";
import axios from "axios";
import AxiosClients from "../Utils/AxiosClients";
const DefaulLayout=()=>{
const {token}=usestateContext();
if(!token){
    return (
          <Navigate to="/home"/>
          )
}
return (

<>
<Navbar/>
<Outlet/>
</>

)

}

export default DefaulLayout