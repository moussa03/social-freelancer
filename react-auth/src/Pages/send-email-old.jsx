import { useParams } from "react-router-dom";
// import  "../assets/css/mail.css";
import './css/mail.css';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from "react";
import { createRef } from "react";
import AxiosClients from "../../Utils/AxiosClients";
import ImageEmail from './img/2880031.jpg';
import { useEffect } from "react";
import Pusher from 'pusher-js';
import { useNavigate } from "react-router-dom";
import Echo from 'laravel-echo';
import { usestateContext } from "../../Context/Context";

<script src="https://js.pusher.com/7.2/pusher.min.js"></script>



const SendMail=()=>{
    const {job_id}=useParams();
    const username=createRef();
    const email=createRef();
    const [jobs,setjobs]=useState();
    const [notifications, setNotifications] = useState([]);
    const [editorContent,setEditorContent]=useState();
    const navigate = useNavigate();
    window.Pusher = Pusher;
    const {currentUser,token,setcurrentUser,asset,Settoken}=usestateContext();

    window.Pusher = require('pusher-js');
    
    window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'f41d512dc6d2e9d0f14a',
        cluster: 'eu',
        forceTLS: true
    });

  
  useEffect(() => {
    const current=2;
    var urlChannel = 'App.User.' + current;
    window.Echo.private(urlChannel)
        .notification((notification) => {
           console.log(notification);
        });
    
    
      return () => {
        // channel.stopListening('user.');
      };

}, []);
const handleEditorChange = (content, editor) => {
  setEditorContent(content);
  
};
    const cancel=(e)=>{
      e.preventDefault();
      navigate("/jobs");
     }
    useEffect(() => {
			// setLoading(true)
			AxiosClients.get('/jobs')
		.then(({ data }) => {
			// setLoading(false)
			setjobs(data)
      
			
		})
		.catch(() => {
			// setLoading(false)
		})
		
		}, []);
   
  
    // Using the find() method to get the item with the desired job_id

    const sendmail=(e)=>{

      e.preventDefault();
      // const currentjob = jobs.find(item => item.id === job_id);
      // console.log(currentjob);
        
      const payload={
      Username:username.current.value,
      Email:email.current.value,
      Content:editorContent,
      Job_id:job_id,

     }
     
     AxiosClients.post('/notifications',payload)
     .then(({ data }) => {
      // setNotifications(data);
      // console.log(data);
     
    
     })
     .catch((e) => {
       // setLoading(false)
       console.log(e);
     })
    }
return (
<>
<div class="sign_in_sec current send-mails-form" id="tab-1">
									
                 
									<form onSubmit={sendmail} enctype="multiple/form-data">
                 
										<div class="row">
                      <div className="col-sm-6 col-md-6 col-lg-6" >
                      <div class="col-lg-12 no-pdd">
												<div class="sn-field">
													<input ref={username} type="text" name="username" placeholder="Username"/>
													<i class="la la-user"></i>
												</div>
                        {/* <!--sn-field end--> */}
											</div>
											<div class="col-lg-12 no-pdd">
												<div class="sn-field">
													<input ref={email} name="email" placeholder="Email"/>
													<i class="la la-lock"></i>
												</div>
											</div>
                      <div class="col-lg-12 no-pdd">
												<div class="sn-field">
													<input ref={subject} name="subject" placeholder="Subject"/>
													<i class="la la-lock"></i>
												</div>
											</div>
                     
                      <div className="col-lg-12 no-pdd">
                      <div class="sn-field">
                      <Editor  onEditorChange={handleEditorChange}

                             apiKey='obhg0220ha7v6f5r27rkllslsjxtxv1ul3zh52r63z5hr9lq'
                            //  onInit={(evt, editor) => editorRef.current = editor}
                             initialValue="<p>This is the initial content of the editor.</p>"
                             init={{
                               height: 500,
                               menubar: false,
                               plugins: [
                                 'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                               ],
                               toolbar: 'undo redo | blocks | ' +
                                 'bold italic forecolor | alignleft aligncenter ' +
                                 'alignright alignjustify | bullist numlist outdent indent | ' +
                                 'removeformat | help',
                               content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                             }}
                           />
                           {/* <button onClick={log}>Log editor content</button> */}
												</div>
                      </div>
                      <div className="col-lg-12 no-pdd">
                      <div class="sn-field">
                      <ul className="update">
                        <li><button class="active" type="submit" value="post" onClick={sendmail}>Save and Exit</button></li>
                        <li><button class="back" type="submit" value="post" onClick={cancel} > Cancel  </button></li>
                        
                      </ul>
												</div>
                           
                     </div>
										
                     
                      </div>
                      <div className=" d-none d-sm-block col-sm-6 col-md-6 col-lg-6">
                        
                      <img src={ImageEmail} class="img-fluid" alt="..."/>
                      </div>
										
										</div>
									</form>
								
                  {/* <!--login-resources end--> */}
								</div>
                {/* <!--sign_in_sec end--> */}
</>)

}

export default SendMail;