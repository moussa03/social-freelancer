import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Delete_job=()=>{
    const {job_id}=useParams();
    Swal.fire({
        title: 'Deleted!',
        // text: 'Do you want to continue',
        icon: 'info',
        confirmButtonText: 'OK'
      })  


}
export default Delete_job

