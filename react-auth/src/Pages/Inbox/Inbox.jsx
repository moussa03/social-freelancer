import { useEffect, useState } from "react";
import AxiosClients from "../../Utils/AxiosClients";
import Pusher from 'pusher-js';
import Dropdown from 'react-bootstrap/Dropdown';
import { usestateContext } from '../../Context/Context';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {faAt} from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import Aside from "../../Components/Aside";
import moment from 'moment';

const Inbox=()=>{

    // const [auth,setgoogleauth]=useState();
    const {currentUser,token,setcurrentUser,Settoken,counter,setCounter,previousCounter,setPreviousCounter}=usestateContext();
    const [notifications,setnotifications]=useState();
    const [loading, setLoading] = useState(false);
    const [countnotif,setcount]=useState();
    const [checkedItems, setCheckedItems] = useState([]);

    
   


 
    function time(utc){
      const oneHourBefore = moment(utc).subtract(-1, 'hour').fromNow();
      return oneHourBefore;
    }
    useEffect(()=>{
      setLoading(true)
      AxiosClients.get('notifications').then(({data})=>{
        setLoading(false)
       setCounter(data.length);
       setnotifications(data);
     
      })
     
      .catch(() => {
        setLoading(false)
      })
       },[counter]);
       let count = (notifications!=undefined) && notifications.filter(notification => {
        return notification.type == "App\\Notifications\\messagenotification";

      })

       useEffect(()=>{
       let count = (notifications!=undefined) && notifications.filter(notification => {
        return notification.type == "App\\Notifications\\messagenotification";

      })
      setcount(count.length);
      
    },[]);

   
    // Step 2: Handle change event
    const handleCheckboxChange = (event) => {
      const value = event.target.value;
    
      if (event.target.checked) { 
        setCheckedItems([...checkedItems, value]);
      } 
      else {
        setCheckedItems(checkedItems.filter(item => item !== value));
      }
    };
   
    const markimportant=()=>{
      const payload={
        items:checkedItems
      }
      AxiosClients.post('important_emails',payload).then(({data})=>{
       console.log(data);
       })

    }
    // useEffect(()=>{
       
    //   const payload={
    //     items:checkedItems
    //   }
     
     
    // },[checkedItems]);
      

  
     
    return (
    <>
  <div class="container">
  <div class="mail-box">
    <Aside/>
    <aside class="lg-side">
      <div class="inbox-head">
        <h3>Inbox</h3>
        <form action="#" class="pull-right position">
          <div class="input-append">
            <input type="text" class="sr-input" placeholder="Search Mail"/>
            <button class="btn sr-btn" type="button"><i class="fa fa-search"></i></button>
          </div>
        </form>
      </div>
      <div class="inbox-body">
        <div class="mail-option">
          <div class="chk-all">
            <input type="checkbox" class="mail-checkbox mail-group-checkbox" />
            <div class="btn-group">
             
                                     <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <a data-toggle="dropdown" href="#" class="btn mini all" aria-expanded="false">
                                         All
                                         <i class="fa fa-angle-down "></i>
               </a>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={markimportant}>Mark as important</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
            </div>
          </div>

          <div class="btn-group">
            <a data-original-title="Refresh" data-placement="top" data-toggle="dropdown" href="#" class="btn mini tooltips">
              <i class=" fa fa-refresh"></i>
            </a>
          </div>
          <div class="btn-group hidden-phone">
            <a data-toggle="dropdown" href="#" class="btn mini blue" aria-expanded="false">
                                     More
                                     <i class="fa fa-angle-down "></i>
                                 </a>
            <ul class="dropdown-menu">
              <li><a href="#"><i class="fa fa-pencil"></i> Mark as Read</a></li>
              <li><a href="#"><i class="fa fa-ban"></i> Spam</a></li>
              <li class="divider"></li>
              <li><a href="#"><i class="fa fa-trash-o"></i> Delete</a></li>
            </ul>
          </div>
          <div class="btn-group">
            <a data-toggle="dropdown" href="#" class="btn mini blue">
                                     Move to
                                     <i class="fa fa-angle-down "></i>
                                 </a>
            <ul class="dropdown-menu">
              <li><a href="#"><i class="fa fa-pencil"></i> Mark as Read</a></li>
              <li><a href="#"><i class="fa fa-ban"></i> Spam</a></li>
              <li class="divider"></li>
              <li><a href="#"><i class="fa fa-trash-o"></i> Delete</a></li>
            </ul>
          </div>

          <ul class="unstyled inbox-pagination">
            <li><span>1-50 of 234</span></li>
            <li>
              <a class="np-btn" href="#"><i class="fa fa-angle-left  pagination-left"></i></a>
            </li>
            <li>
              <a class="np-btn" href="#"><i class="fa fa-angle-right pagination-right"></i></a>
            </li>
          </ul>
        </div>
       
        <table class="table table-inbox table-hover">
          
          <tbody>
          {loading ? (
											<p> 
									{/* <FontAwesomeIcon icon={faEllipsis} beatFade size='2xl' style={{ color:"#e44d3a" }}/> */}
                  <FontAwesomeIcon icon={faAt} beatFade size='1xl' style={{ color:"#e44d3a" }}/>
											</p>
					          ):
                   
                    notifications && notifications.map((notificaton, index) => (
                    
                      <tr  className={notificaton.read_at="null"? "unread-emails":""}>
                    
                      <td class="inbox-small-cells">
                        <input type="checkbox" value={notificaton.id} class="mail-checkbox" onChange={handleCheckboxChange}/>
                      </td>
                      <Link to={`/singlemail/${notificaton.id}`} className="single-mail">
                      <td class="view-message  dont-show">{JSON.parse(notificaton.data).data[0][0].job_title}</td>
                      <td class="view-message ">{JSON.parse(notificaton.data).data[4]}</td>
                      <td class="view-message  inbox-small-cells"><i class="fa fa-paperclip"></i></td>
                      <td class="view-message  text-right">{time(notificaton.created_at)}</td>
                      </Link>
                      </tr>
                    
                    
                    
                    
          ))}
         
           
           
          </tbody>
        </table>
      </div>
    </aside>
  </div>
</div>
    </>
    )
}

export default Inbox;