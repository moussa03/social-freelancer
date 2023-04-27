import { Button } from "bootstrap"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usestateContext } from "../Context/Context";
import AxiosClients from "../Utils/AxiosClients";
// import { useParams } from 'react-router-dom';
const Users=()=>{
   
    const {currentUser,token,setcurrentUser,Settoken}=usestateContext();
    const [password,setpass]=useState();
    useEffect(() => {
		AxiosClients.get('/user')
		  .then(({data}) => {
			setcurrentUser(data);
      // setpass(data.hashedPassword);

		  })
		  .catch((error) => console.error(error));
	  }, [])

    return(
         <>
        
         {
           currentUser && currentUser.id !==undefined && 
           <Link to={`/profile_setting/${currentUser.id}`}> go to user profile  </Link>
         }
        
      
         </>
       )
}

export default Users