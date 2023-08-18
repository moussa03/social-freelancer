import { Navigate, Outlet } from "react-router-dom";
import { usestateContext } from "../Context/Context"
import Navbar from "./Navbar";

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