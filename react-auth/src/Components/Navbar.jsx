// import 'bootstrap/dist/css/bootstrap.min.css' ;
// import animate from "../assets/css/animate.css"
// import flatpickr from "../assets/css/flatpickr.min.css"
// import jquery_mCustomScrollbar from "../assets/css/jquery.mCustomScrollbar.min.css"
// import line_awesome from "../assets/css/line-awesome.css"
// import Style from "../assets/css/main.module.css"
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import search from '../img/search-address.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { usestateContext } from '../Context/Context';
import AxiosClients from '../Utils/AxiosClients';
import { Link, Navigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Echo from 'laravel-echo'
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

const Navbar=()=>{
    const [active,setActive]=useState(false);
	const {currentUser,token,setcurrentUser,Settoken,counter,setCounter,previousCounter,setPreviousCounter}=usestateContext();
	const [notifications,setnotifications]=useState();
	const handleClick = event => {
		setActive(current => !current);
	  };
	//   function subtractHours(utc, hours) {
	// 	utc.setHours(moment(utc).fromNow() - hours);
	// 	console.log(utc);
	// 	return date;
	//   }
	  function time(utc){
		const oneHourBefore = moment(utc).subtract(-1, 'hour').fromNow();
		return oneHourBefore;
	}
	// {setInterval(time, 60000)}
	
	  useEffect(() => {
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: 'b3c6c9ccda6f354e3dc2',
        cluster: 'mt1',
        encrypted: true,
        auth: {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
          },
      },
        authorizer: (channel, options) => {
       
          return {
              authorize: (socketId, callback) => {
                AxiosClients.post('http://127.0.0.1:8000/api/broadcasting/auth', {
                       socket_id: socketId,
                       channel_name: channel.name
                  })
                  .then(response => {
                      callback(null, response.data);
                      // console.log(response);
                  })
                  .catch(error => {
                      callback(error);
                      
                  });
              }
          };
      },
      
    });
    if(currentUser.id!=undefined){
      window.Echo.private('send-email-job.'+currentUser.id)
      .listen('EmailRecrutor', (event) => {
        //  setNotifications(event.notifications);
        //  console.log(notifications);
        incrementCounter();
      });
    }

}, [counter])

// if(notifications != undefined){
// 	// let notificationData = JSON.parse(notifications, true);
// 	// console.log(JSON.parse(notifications[0].data));
// 	{notifications.map((tag, index) => (
		
// 	console.log(JSON.parse(tag.data).data)
// )) } 

	  
// }




	  useEffect(() => {
		AxiosClients.get('/user')
		  .then(({data}) => {
			setcurrentUser(data)
		  })
		  .catch((error) => console.error(error));
	  }, [])

	  useEffect(()=>{
		AxiosClients.get('notifications').then(({data})=>{
		 setCounter(data.length);
		 setnotifications(data);
		
		})
	   },[counter]);

	   const incrementCounter = () => {
        setPreviousCounter(counter);
        setCounter(prevCounter => prevCounter + 1);
      };

	//   useEffect(() => {
	// 	AxiosClients.get('/notifications')
	// 	  .then(({data}) => {
	// 		// setcurrentUser(data)
	// 		setnotifications(data.length);
	// 		// console.log(data.length);

	// 	  })
	// 	  .catch((error) => console.error(error));
	//   }, [])

	  const logout=()=>{
		AxiosClients.post('/logout')
		
		setcurrentUser({})
		Settoken(null);
		//   <Navigate to="/home"/>
		// })
	  }
	 
    return (
            <>
            
		<header>
			<div className="container">
				<div className="header-data">
					<div className="logo">
						<a href="index.html" title=""><img src="images/logo.png" alt=""/></a>
					</div>
					<div className="search-bar">
						<form>
							<input type="text" name="search" placeholder="Search..."/>
							<button type="submit">
							   <img src={search}/>
							</button>
						</form>
					</div>
					<nav>
						<ul className='nav-menu-list'>
						<li>
								{/* <a href="projects.html" title=""> */}
								<Link to='/news_feed'>
								
								<span>
									<img src="images/icon3.png" alt=""/> 
								</span>
								Home
								</Link>
									
									
								{/* </a> */}
							</li>
							{/* <li>
								<a href="companies.html" title="">
									<span><img src="images/icon2.png" alt=""/></span>
									Companies
								</a>
								<ul>
									<li><a href="companies.html" title="">Companies</a></li>
									<li><a href="company-profile.html" title="">Company Profile</a></li>
								</ul>
							</li> */}
							<li>
								{/* <a href="projects.html" title=""> */}
								<Link to='projects'>
								<span><img src="images/icon3.png" alt=""/></span>
									Projects
								</Link>
									
								{/* </a> */}
							</li>
							<li>
								<a href="profiles.html" title="">
									<span><img src="images/icon4.png" alt=""/></span>
									Profiles
								</a>
								<ul>
									<li><a href="user-profile.html" title="">User Profile</a></li>
									<li><a href="my-profile-feed.html" title="">my-profile-feed</a></li>
								</ul>
							</li>
							<li>
								{/* <a href="" title=""> */}
								<Link to='jobs'>
									<span><img src="images/icon5.png" alt=""/></span>
									Jobs
								</Link>
								{/* </a> */}
							</li>
							<li>
								{/* <a href="#" title="" className="not-box-open"> */}
								<Link to='inbox'>
								<span><img src="images/icon6.png" alt=""/></span>
									Inbox
								</Link>
									
								{/* </a> */}
								<div className="notification-box msg">
									<div className="nt-title">
										<h4>Setting</h4>
										<a href="#" title="">Clear all</a>
									</div>
									<div className="nott-list">
										<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img1.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="messages.html" title="">Jassica William</a> </h3>
							  					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do.</p>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img2.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="messages.html" title="">Jassica William</a></h3>
							  					<p>Lorem ipsum dolor sit amet.</p>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img3.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="messages.html" title="">Jassica William</a></h3>
							  					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo incididunt ut labore et dolore magna aliqua.</p>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="view-all-nots">
						  					<a href="messages.html" title="">View All Messsages</a>
						  				</div>
									</div>
								</div>
							</li>
							<li>
								{/* <a href="#" title="" className="not-box-open">
									<span><img src="images/icon7.png" alt=""/></span>
									Notification
								</a> */}
								<Dropdown className='dropdown-notif'>
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									
								{/* <Button variant="primary"> */}
								<a href="#" title="" className="not-box-open ">
								<span><img src="images/icon7.png" alt=""/></span>

								Notification
								 <Badge bg="secondary" className='badge-notif'>
									{/* <div> */}
																		{/* <span><img src="images/icon7.png" alt=""/></span> */}

									<span className='badge-sub-item'>{counter}</span>
									
									
									{/* </div> */}
									
								</Badge>
								<span className="visually-hidden">unread messages</span>
								</a>
								{/* </Button> */}

								</Dropdown.Toggle>

								<Dropdown.Menu>
									{/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
									<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
									<Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
									
									{(notifications && notifications!=undefined)&& notifications.map((notification, index) => (  
										<Dropdown.Item href="#/action-1">Vous avez recu en email de {JSON.parse(notification.data).data[1]}... 
										<span><img src="images/clock.png" alt=""/>
																     	{time(notification.created_at)}
										</span>
										</Dropdown.Item>
										
									)) } 
									 

								</Dropdown.Menu>
								</Dropdown>
								
								<div className="notification-box">
									<div className="nt-title">
										<h4>Setting</h4>
										<a href="#" title="">Clear all</a>
									</div>
									<div className="nott-list">
										<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img1.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img2.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img3.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="notfication-details">
							  				<div className="noty-user-img">
							  					<img src="images/resources/ny-img2.png" alt=""/>
							  				</div>
							  				<div className="notification-info">
							  					<h3><a href="#" title="">Jassica William</a> Comment on your project.</h3>
							  					<span>2 min ago</span>
							  				</div>
						  				</div>
						  				<div className="view-all-nots">
						  					<a href="#" title="">View All Notification</a>
						  				</div>
									</div>
								</div>
                                {/* <!--notification-box end--> */}
							</li>
						</ul>
					</nav>
                    {/* <!--nav end--> */}
					<div className="menu-btn">
						<a href="#" title=""><i className="fa fa-bars"></i></a>
					</div>
                    {/* <!--menu-btn end--> */}
					<div className="user-account">
						<div className="user-info" onClick={handleClick}>
							<img src="http://via.placeholder.com/30x30" alt=""/>
							{currentUser && 
							<a href="#" title="">{currentUser.name}</a>
							}
							
							<i className="fa fa-arrow-down"></i>
						</div>
						
						<div className={active==true ? "user-account-settingss active" :"user-account-settingss"}>
							<h3>Online Status</h3>
							<ul className="on-off-status">
								<li>
									<div className="fgt-sec">
										<input type="radio" name="cc" id="c5"/>
										<label htmlFor="c5">
											<span></span>
										</label>
										<small>Online</small>
									</div>
								</li>
								<li>
									<div className="fgt-sec">
										<input type="radio" name="cc" id="c6"/>
										<label htmlFor="c6">
											<span></span>
										</label>
										<small>Offline</small>
									</div>
								</li>
							</ul>
							<h3>Custom Status</h3>
							<div className="search_form">
								<form>
									<input type="text" name="search"/>
									<button type="submit">Ok</button>
								</form>
							</div>
                            {/* <!--search_form end--> */}
							<h3>Setting</h3>
							{/* <h3> <a href="http://"></a> logout</h3> */}
							<h3><button onClick={logout} className="logout-btn">logout</button></h3>
							<ul className="us-links">
								<li><a href="profile-account-setting.html" title="">Account Setting</a></li>
								<li><a href="#" title="">Privacy</a></li>
								<li><a href="#" title="">Faqs</a></li>
								<li><a href="#" title="">Terms & Conditions</a></li>
							</ul>
							{/* <h3 className="tc"><button><a onClick={logout}>Logout</a></button></h3> */}
						</div>
                        {/* <!--user-account-settingss end--> */}
					</div>
				</div>
                {/* <!--header-data end--> */}
			</div>
		</header>
            </>
)
}

export default Navbar