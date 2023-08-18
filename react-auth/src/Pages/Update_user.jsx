import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import '../assets/css/custom.css';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import { createRef, useEffect, useState } from 'react';
import { usestateContext } from "../Context/Context";
import { useParams } from 'react-router-dom';
import AxiosClients from '../Utils/AxiosClients';
import axios from 'axios';


import { useRef } from 'react';




function Update_user() {
	const [show, setShow] = useState(false);
	const {user_id}=useParams();
    const {currentUser,token,setcurrentUser,Settoken}=usestateContext();
	const [notificationsound,setnotification]=useState(false);
	const [emailsound,setemailsound]=useState(false);
	const [chatsound,setchatsound]=useState(false);
	const [errors,Seterrors]=useState();
	const oldpass = createRef();
	const password=createRef();
	const confirmed_pass=createRef();
	const [passwordmatch,setmatch]=useState();
	const [not_match,setnotmatch]=useState();
	const [data, setData] = useState([] );
	const username=createRef();
	const profil=createRef();
	const ville=createRef();
	const email=createRef();
	const profil_picture=createRef();
	let id = useParams();


    useEffect(() => {
		const fetchData = async () => {
		  const result = await axios(
			'http://127.0.0.1:8000/api/cities',
		  );
	    //  console.log(result.data.cities);
		  setData(result.data);
		};
		
		fetchData();
	  }, []);

	
	  const [image, setImage] = useState(null);
	  function handleFileChange(event) {
		setImage(event.target.files[0]);
	  }
	  const formdata=new FormData();
	  const Update_User = async (ev) => {
      ev.preventDefault()
         formdata.append('Username',username.current.value);
         formdata.append('profil',profil.current.value);
         formdata.append('ville',ville.current.value); 
		 formdata.append('email',email.current.value); 
         formdata.append("picture", image);
        const response = await AxiosClients.post(`update_user/${id.user_id}`,formdata,
        {
            headers: {"Content-Type": "multipart/form-data"},
            
        }).then((res) => {

            //  alert("File Uploaded Successfully");
           
            }).catch((error) => {

             
             
        });
    } 
	// catch (error) {
    //     console.log(error)
    // }

    
    
   


		
	  
	  
	const [user, setUser] = useState({
		id: null,
		name: '',
		email: '',
		password: '',
		password_confirmation: ''
	  })
	function clearvalue(e){
		e.preventDefault();
		oldpass.current.value="";
		password.current.value="";
		confirmed_pass.current.value="";
	}
	
   const updatepassword=(e)=>{
	e.preventDefault();


	
	const payload={
		Old_pass:oldpass.current.value,
		Password:password.current.value,
		Confirmed_pass:confirmed_pass.current.value,
	  }
		AxiosClients.post('/updatepassword', payload)
		.then(({data}) => {

			 if(data.user==true){
				setmatch(true);
				Seterrors('');
				// window.location.reload();

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			 }
			 else {
				setmatch(false);
			 }
				
			 
		})
		
		.catch((err) => {
			const response = err.response;
		   if (response && response.status === 422) {
			Seterrors(response.data.errors);
		   }
		   // console.log(Erors.Name);
		  
		 })	
}


   function handlesound(sound){
	// setnotification(!notificationsound);
	if(sound=="notifsoundon"){
		setnotification(!notificationsound)
	}
	
	else if(sound=="emailsoundon"){
		setemailsound(!emailsound);
	}
	else if(sound="chatsoundon"){
		setchatsound(!chatsound);
	}
   }
   
//  console.log(notificationsound);
	
  return (
	<section class="profile-account-setting">
	<div class="container">
	<div class="account-tabs-setting">
    <Tab.Container id="left-tabs-example" defaultActiveKey="setting">
      <Row>
        <Col sm={3}>
		<div class="acc-leftbar">
          <Nav variant="pills" className="flex-column nav nav-tabs" id="nav-tab">
            <Nav.Item id="nav-acc-tab">
			  
              <Nav.Link eventKey="setting">
				<i class="fa fa-gears"></i>
				Account Setting n {user_id}

			  </Nav.Link>
            </Nav.Item>
			<Nav.Item>
              <Nav.Link eventKey="profil_detail">
			  <i class="fa fa-lock"></i>
				Profil Details
			  </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="status">
			  <i class="fa fa-lock"></i>
				Change password
			  </Nav.Link>
            </Nav.Item>
			<Nav.Item>
              <Nav.Link eventKey="notifications">
			  <i class="fa fa-bell"></i>
				Notifications
			  </Nav.Link>
            </Nav.Item>
			<Nav.Item>
              <Nav.Link eventKey="requests">
			  <i class="fa fa-users"></i>				
			  Requests
				</Nav.Link>
            </Nav.Item>
			<Nav.Item>
              <Nav.Link eventKey="deactivate-account">
			  <i class="fa fa-solid fa-minus"></i>
				Deactivate Account
				</Nav.Link>
            </Nav.Item>
          </Nav>
		  </div>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="setting">
              {/* <Sonnet /> */}
			  <div class="acc-setting">
										<h3>Account Setting</h3>
										<form>
											<div class="notbar">
												<h4>Notification Sound</h4>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium nulla quis erat dapibus, varius hendrerit neque suscipit. Integer in ex euismod, posuere lectus id</p>
												<div class="toggle-btn">
												<Form>
													<Form.Check 
														type="switch"
														id="custom-switch"
														onChange={()=>handlesound('notifsoundon')}
													/>
													
												</Form>
												</div>
											</div>
											{/* <!--notbar end--> */}
											<div class="notbar">
												<h4>Notification Email</h4>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium nulla quis erat dapibus, varius hendrerit neque suscipit. Integer in ex euismod, posuere lectus id</p>
												<div class="toggle-btn">
												<Form>
													<Form.Check 
														type="switch"
														id="custom-switch"
														onChange={()=>handlesound('emailsoundon')}
													/>
													
												</Form>
												</div>
											</div>
											{/* <!--notbar end--> */}
											<div class="notbar">
												<h4>Chat Message Sound</h4>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium nulla quis erat dapibus, varius hendrerit neque suscipit. Integer in ex euismod, posuere lectus id</p>
												<div class="toggle-btn">
													<a href="#" title="">
													<Form>
													<Form.Check 
														type="switch"
														id="custom-switch"
														onChange={()=>handlesound('chatsoundon')}
													/>
													
												</Form>
													</a>
												</div>
											</div>
											{/* <!--notbar end--> */}
											<div class="save-stngs">
												<ul>
													<li><button type="submit">Save Setting</button></li>
													<li><button type="submit">Restore Setting</button></li>
												</ul>
											</div>
											{/* <!--save-stngs end--> */}
										</form>
										</div>
										
			</Tab.Pane>
			
			<Tab.Pane eventKey="status">
              {/* <Sonnet /> */}
									   <div class="acc-setting">
										<h3>Account Setting</h3>
												
										{ (show  && passwordmatch==false) &&
                                        
										 <Alert className='alert-erros' variant="danger" onClose={() => setShow(false)} dismissible>
										
										 <p>
										 mot de passe invalide. Veuillez saisir à nouveau votre ancien mot de passe
										 </p>
									     </Alert>
										} 
									    { (show  && passwordmatch==true) &&

											<Alert className='alert-erros' variant="success" onClose={() => setShow(false)} dismissible>

											<p>
											Félicitations, votre mot de passe a été changé avec succès
											</p>
											
											</Alert>
											
										}

									    
                                        
										{errors &&
											<div className="alert-erros">
											{Object.keys(errors).map(key => (
												// <p key={key}>{errors[key][0]}</p>

												<Badge bg="warning" text="dark">
													<p key={key}>{errors[key][0]}</p>
												</Badge>

												
											))}
											</div>
										}
										<form onSubmit={updatepassword}>
											<div class="cp-field">
												<h5>Old Password</h5>
												<div class="cpp-fiel">
													<input  placeholder="Name"/>

													<i class="fa fa-lock"></i>
												</div>
											</div>
											<div class="cp-field">
												<h5>New Password</h5>
												<div class="cpp-fiel">
													<input ref={password} type="text" name="new-password" placeholder="New Password"/>
													<i class="fa fa-lock"></i>
												</div>
											</div>
											<div class="cp-field">
												<h5>Repeat Password</h5>
												<div class="cpp-fiel">
													<input ref={confirmed_pass} type="text" name="repeat-password" placeholder="Repeat Password"/>
													<i class="fa fa-lock"></i>
												</div>
											</div>
											<div class="cp-field">
												<h5><a href="#" title="">Forgot Password?</a></h5>
											</div>
											<div class="save-stngs pd2">
												<ul>
													<li><button type="submit" onClick={() => setShow(true)}> Save Setting</button></li>
													<li><button type="submit" onClick={clearvalue}>Restore Setting</button></li>
												</ul>
											</div>
											{/* <!--save-stngs end--> */}
										</form>
									</div>
            </Tab.Pane>
			<Tab.Pane eventKey="notifications">
              {/* <Sonnet /> */}
			  <div class="acc-setting">
							  			<h3>Notifications</h3>
							  			<div class="notifications-list">
							  				<div class="notfication-details">
								  				<div class="noty-user-img">
								  					<img src="http://via.placeholder.com/35x35" alt=""/>
								  				</div>
								  				<div class="notification-info">
								  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
								  					<span>2 min ago</span>
								  				</div>
												{/* <!--notification-info --> */}
							  				</div>
											{/* <!--notfication-details end--> */}
							  				<div class="notfication-details">
								  				<div class="noty-user-img">
								  					<img src="http://via.placeholder.com/35x35" alt=""/>
								  				</div>
								  				<div class="notification-info">
								  					<h3><a href="#" title="">Poonam Verma</a> Bid on your Latest project.</h3>
								  					<span>2 min ago</span>
								  				</div>
												{/* <!--notification-info --> */}
							  				</div>
											{/* <!--notfication-details end--> */}
							  				<div class="notfication-details">
								  				<div class="noty-user-img">
								  					<img src="http://via.placeholder.com/35x35" alt=""/>
								  				</div>
								  				<div class="notification-info">
								  					<h3><a href="#" title="">Tonney Dhman</a> Comment on your project.</h3>
								  					<span>2 min ago</span>
								  				</div>
												{/* <!--notification-info --> */}
							  				</div>
											{/* <!--notfication-details end--> */}
							  				<div class="notfication-details">
								  				<div class="noty-user-img">
								  					<img src="http://via.placeholder.com/35x35" alt=""/>
								  				</div>
								  				<div class="notification-info">
								  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
								  					<span>2 min ago</span>
								  				</div>
												{/* <!--notification-info --> */}
							  				</div>
											{/* <!--notfication-details end--> */}
							  				<div class="notfication-details">
								  				<div class="noty-user-img">
								  					<img src="http://via.placeholder.com/35x35" alt=""/>
								  				</div>
								  				<div class="notification-info">
								  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
								  					<span>2 min ago</span>
								  				</div>
												{/* <!--notification-info --> */}
							  				</div>
											{/* <!--notfication-details end--> */}
							  				<div class="notfication-details">
								  				<div class="noty-user-img">
								  					<img src="http://via.placeholder.com/35x35" alt=""/>
								  				</div>
								  				<div class="notification-info">
								  					<h3><a href="#" title="">Poonam Verma </a> Bid on your Latest project.</h3>
								  					<span>2 min ago</span>
								  				</div>
												{/* <!--notification-info --> */}
							  				</div>
											{/* <!--notfication-details end--> */}
							  				<div class="notfication-details">
								  				<div class="noty-user-img">
								  					<img src="http://via.placeholder.com/35x35" alt=""/>
								  				</div>
								  				<div class="notification-info">
								  					<h3><a href="#" title="">Tonney Dhman</a> Comment on your project</h3>
								  					<span>2 min ago</span>
								  				</div>
												{/* <!--notification-info --> */}
							  				</div>
											{/* <!--notfication-details end--> */}
							  				<div class="notfication-details">
								  				<div class="noty-user-img">
								  					<img src="http://via.placeholder.com/35x35" alt=""/>
								  				</div>
								  				<div class="notification-info">
								  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
								  					<span>2 min ago</span>
								  				</div>
												{/* <!--notification-info --> */}
							  				</div>
											{/* <!--notfication-details end--> */}
							  			</div>
										{/* <!--notifications-list end--> */}
							  		</div>
            </Tab.Pane>
			<Tab.Pane eventKey="requests">
			<div class="acc-setting">
							  			<h3>Requests</h3>
							  			<div class="requests-list">
							  				<div class="request-details">
							  					<div class="noty-user-img">
							  						<img src="http://via.placeholder.com/35x35" alt=""/>
							  					</div>
							  					<div class="request-info">
							  						<h3>Jessica William</h3>
							  						<span>Graphic Designer</span>
							  					</div>
							  					<div class="accept-feat">
							  						<ul>
							  							<li><button type="submit" class="accept-req">Accept</button></li>
							  							<li><button type="submit" class="close-req"><i class="la la-close"></i></button></li>
							  						</ul>
							  					</div>
												{/* <!--accept-feat end--> */}
							  				</div>
											{/* <!--request-detailse end--> */}
							  				<div class="request-details">
							  					<div class="noty-user-img">
							  						<img src="http://via.placeholder.com/35x35" alt=""/>
							  					</div>
							  					<div class="request-info">
							  						<h3>John Doe</h3>
							  						<span>PHP Developer</span>
							  					</div>
							  					<div class="accept-feat">
							  						<ul>
							  							<li><button type="submit" class="accept-req">Accept</button></li>
							  							<li><button type="submit" class="close-req"><i class="la la-close"></i></button></li>
							  						</ul>
							  					</div>
												{/* <!--accept-feat end--> */}
							  				</div>
											{/* <!--request-detailse end--> */}
							  				<div class="request-details">
							  					<div class="noty-user-img">
							  						<img src="http://via.placeholder.com/35x35" alt=""/>
							  					</div>
							  					<div class="request-info">
							  						<h3>Poonam</h3>
							  						<span>Wordpress Developer</span>
							  					</div>
							  					<div class="accept-feat">
							  						<ul>
							  							<li><button type="submit" class="accept-req">Accept</button></li>
							  							<li><button type="submit" class="close-req"><i class="la la-close"></i></button></li>
							  						</ul>
							  					</div>
												{/* <!--accept-feat end--> */}
							  				</div>
											{/* <!--request-detailse end--> */}
							  				<div class="request-details">
							  					<div class="noty-user-img">
							  						<img src="http://via.placeholder.com/35x35" alt=""/>
							  					</div>
							  					<div class="request-info">
							  						<h3>Bill Gates</h3>
							  						<span>C & C++ Developer</span>
							  					</div>
							  					<div class="accept-feat">
							  						<ul>
							  							<li><button type="submit" class="accept-req">Accept</button></li>
							  							<li><button type="submit" class="close-req"><i class="la la-close"></i></button></li>
							  						</ul>
							  					</div>
												{/* <!--accept-feat end--> */}
							  				</div>
											{/* <!--request-detailse end--> */}
							  				<div class="request-details">
							  					<div class="noty-user-img">
							  						<img src="http://via.placeholder.com/35x35" alt=""/>
							  					</div>
							  					<div class="request-info">
							  						<h3>Jessica William</h3>
							  						<span>Graphic Designer</span>
							  					</div>
							  					<div class="accept-feat">
							  						<ul>
							  							<li><button type="submit" class="accept-req">Accept</button></li>
							  							<li><button type="submit" class="close-req"><i class="la la-close"></i></button></li>
							  						</ul>
							  					</div>
												{/* <!--accept-feat end--> */}
							  				</div>
											{/* <!--request-detailse end--> */}
							  				<div class="request-details">
							  					<div class="noty-user-img">
							  						<img src="http://via.placeholder.com/35x35" alt=""/>
							  					</div>
							  					<div class="request-info">
							  						<h3>John Doe</h3>
							  						<span>PHP Developer</span>
							  					</div>
							  					<div class="accept-feat">
							  						<ul>
							  							<li><button type="submit" class="accept-req">Accept</button></li>
							  							<li><button type="submit" class="close-req"><i class="la la-close"></i></button></li>
							  						</ul>
							  					</div>
												{/* <!--accept-feat end--> */}
							  				</div>
											{/* <!--request-detailse end--> */}
							  			</div>
										{/* <!--requests-list end--> */}
							  		</div>
            </Tab.Pane>
			<Tab.Pane eventKey="deactivate-account">
			<div class="acc-setting">
										<h3>Deactivate Account</h3>
										<form>
											<div class="cp-field">
												<h5>Email</h5>
												<div class="cpp-fiel">
													<input type="text" name="email" placeholder="Email"/>
													<i class="fa fa-envelope"></i>
												</div>
											</div>
											<div class="cp-field">
												<h5>Password</h5>
												<div class="cpp-fiel">
													<input type="password" name="password" placeholder="Password"/>
													<i class="fa fa-lock"></i>
												</div>
											</div>
											<div class="cp-field">
												<h5>Please Explain Further</h5>
												<textarea></textarea>
											</div>
											<div class="cp-field">
												<div class="fgt-sec">
													<input type="checkbox" name="cc" id="c4"/>
													<label for="c4">
														<span></span>
													</label>
													<small>Email option out</small>
												</div>
												<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium nulla quis erat dapibus, varius hendrerit neque suscipit. Integer in ex euismod, posuere lectus id,</p>
											</div>
											<div class="save-stngs pd3">
												<ul>
													<li><button type="submit">Save Setting</button></li>
													<li><button type="submit">Restore Setting</button></li>
												</ul>
											</div>
											{/* <!--save-stngs end--> */}
										</form>
									</div>
            </Tab.Pane>
			<Tab.Pane eventKey="profil_detail">
              {/* <Sonnet /> */}
									   <div class="acc-setting">
										<h3>Account Setting</h3>
										<form onSubmit={Update_User} enctype="multipart/form-data">
											<div class="cp-field">
												<h5>Username</h5>
												<div class="cpp-fiel">
													{/* <input ref={oldpass} type="text" name="old-password" placeholder="Old Password" value={currentUser.password}/> */}
													<input ref={username} name="username" defaultValue={currentUser.name}  placeholder="Name"/>
													<i class="fa fa-user"></i>
												</div>
											</div>
											<div class="cp-field">
												<h5>Email</h5>
												<div class="cpp-fiel">
													<input ref={email} defaultValue={currentUser.email}  type="text" name="new-password" readOnly/>
													<i class="fa fa-envelope"></i>

												</div>
											</div>
											<div class="cp-field">
											<h5>Profil</h5>
											<Form.Select ref={profil}>
												<option value=""  disabled selected> Profil </option>
												<option> Client</option>
												<option> Freelancer </option>
											</Form.Select>
											
											</div>
											<div class="cp-field">
											<h5>City</h5>
											<Form.Select ref={ville}>
											<option value=""  disabled selected> Select a City </option>
											{data.map(item => (
														<option value={item.id}  >
															<li key={item.id}>
															<a >{item.City_Name}</a>
														     </li>
														</option>
														
														))}
											</Form.Select>
											
											</div>
											
											<div class="cp-field">
											<h5>Profil Picture</h5>
											<Form.Group controlId="formFile" className="mb-3" >
											<Form.Control type="file" onChange={handleFileChange}/>
								     		</Form.Group>

											</div>
											<div class="cp-field">
												<h5><a href="#" title="">Forgot Password?</a></h5>
											</div>
											<div class="save-stngs pd2">
												<ul>
													<li><button type="submit" > Save Setting</button></li>
													{/* <li><button type="submit" onClick={cancel}>Restore Setting</button></li> */}
												</ul>
											</div>
											{/* <!--save-stngs end--> */}
										</form>
									</div>
            </Tab.Pane>
          </Tab.Content>
        </Col>
		
      </Row>
    </Tab.Container>
	</div>
	</div>
	</section>
  )
}
export default Update_user;