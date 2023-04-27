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
import { Navigate } from 'react-router-dom';


const Navbar=()=>{
    const [active,setActive]=useState(false);
	const {currentUser,token,setcurrentUser,Settoken}=usestateContext();
	const handleClick = event => {
		setActive(current => !current);
	  };

	  useEffect(() => {
		AxiosClients.get('/user')
		  .then(({data}) => {
			setcurrentUser(data)
		  })
		  .catch((error) => console.error(error));
	  }, [])

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
						<ul>
							<li>
								<a href="index.html" title="">
									<span><img src="images/icon1.png" alt=""/></span>
									Home
								</a>
							</li>
							<li>
								<a href="companies.html" title="">
									<span><img src="images/icon2.png" alt=""/></span>
									Companies
								</a>
								<ul>
									<li><a href="companies.html" title="">Companies</a></li>
									<li><a href="company-profile.html" title="">Company Profile</a></li>
								</ul>
							</li>
							<li>
								<a href="projects.html" title="">
									<span><img src="images/icon3.png" alt=""/></span>
									Projects
								</a>
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
								<a href="jobs.html" title="">
									<span><img src="images/icon5.png" alt=""/></span>
									Jobs
								</a>
							</li>
							<li>
								<a href="#" title="" className="not-box-open">
									<span><img src="images/icon6.png" alt=""/></span>
									Messages
								</a>
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
								<a href="#" title="" className="not-box-open">
									<span><img src="images/icon7.png" alt=""/></span>
									Notification
								</a>
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
							
							<i class="fa fa-arrow-down"></i>
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