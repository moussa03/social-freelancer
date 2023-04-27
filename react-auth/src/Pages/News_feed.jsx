
 import Navbar from '../Components/Navbar.jsx'
import animate from "../assets/css/animate.css"
import flatpickr from "../assets/css/flatpickr.min.css"
import  "../assets/css/jquery.mCustomScrollbar.min.css"
import  "../assets/css/line-awesome.css"
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom'
import { createRef, useEffect, useState } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import EpicIcon from '../img/icons/epic.png'; // path to your image file
import Position from '../img/icons/position.png'; // path to your image file
import AxiosClients from '../Utils/AxiosClients.js'
import { usestateContext } from '../Context/Context.jsx'

import { useRef } from 'react'


// import  "../assets/css/main.css";
// import 'bootstrap/dist/css/bootstrap.css';

const News_feed=()=>{
   
    const [post,setpost]=useState(false);
    const [close,closepostForm]=useState(false)
	const [postproject,setproject]=useState(false);
	const [closproject,closeProject]=useState(false);
	const [succes,setMessage]=useState();
	const [show, setShow] = useState(false);
    const [errors,SetErors]=useState();
	const [nameEror,SetNameEror]=useState();
	const post_title=createRef();
	const category=createRef();
	const post_type=createRef();
	const price=createRef();
	const description=createRef();
	const [jobs,setjobs]=useState();
	const [loading, setLoading] = useState(false);
     const {currentUser,token,setcurrentUser,Settoken}=usestateContext();
	
       
	useEffect(() => {
		
		setLoading(true)
		AxiosClients.get('/jobs')
      .then(({ data }) => {
        setLoading(false)
        setjobs(data)
      })
      .catch(() => {
        setLoading(false)
      })
	  
	}, []);
	
	    useEffect(() => {
			AxiosClients.get('/jobs')
		.then(response => {
			const posts = response;
			console.log(posts.data);
		})
		.catch(error => {
			console.log(error);
		});
	  }, []); 
	
	
	useEffect(() => {
	    if(succes !==undefined){
			setShow(true)
		}
	  }, [succes]); 
	
	
	 
	
    const post_job=(e)=>{
		e.preventDefault();
		setpost(true);
		
	}
	
	const post_project=(e)=>{
		e.preventDefault();
		setproject(true);
	}
	const close_project_form=(e)=>{
		e.preventDefault();
		closeProject(true);
		if(closproject==true){
			setproject(false);
		}
		
	}
	
	const close_form=(e)=>{
		e.preventDefault();
		closepostForm(true);
		if(close==true){
			setpost(false);
		}
		
	}
	
	const [tags, setTags] = useState([])
	

	function handleKeyDown(e){
		
		if(e.key !== 'Enter')
			return 
			const value = e.target.value
		    e.preventDefault();
			// if(value.trim())
			// return
			if(tags.length<=8){
				setTags([...tags, value])
				e.target.value = ''
			}
	}
	
	function removeTag(index){
        setTags(tags.filter((el, i) => i !== index))
    }

	const Post_job=(e)=>{

		e.preventDefault();
		const payload={
			Post_Title:post_title.current.value,
			category:category.current.value,
			Post_type:post_type.current.value,
			Price:price.current.value,
			Description:description.current.value,
			Tags:tags
		}
	
        
		AxiosClients.post('/jobs',payload).then(({data})=>{

			setMessage(data.succes);
			SetErors('');
		})
		.catch((err) => {

			const response = err.response;
		    if (response && response.status === 422) {
			SetErors(response.data.errors);
		
		   }
		 });
		
	
	}

    return (
          <>
        <div>
        <div class="wrapper ">
		<main>
			<div class="main-section">
				<div class="container">
					<div class="main-section-data">
						<div class="row">
							<div class="col-lg-3 col-md-4 pd-left-none no-pd">
								<div class="main-left-sidebar no-margin">
									<div class="user-data full-width">
										<div class="user-profile">
											<div class="username-dt">
												<div class="usr-pic">
													<img src="http://via.placeholder.com/100x100" alt=""/>
												</div>
											</div>
											<div class="user-specs">
												<h3>{currentUser.name}</h3>
												<span><h4>{currentUser.profil}</h4></span>
											</div>
										</div>
										<ul class="user-fw-status">
											<li>
												<h4>Following</h4>
												<span>34</span>
											</li>
											<li>
												<h4>Followers</h4>
												<span>155</span>
											</li>
											<li>
												<a href="#" title="">View Profile</a>
											</li>
										</ul>
									</div>
                                    {/* <!--user-data end--> */}
									<div class="suggestions full-width">
										<div class="sd-title">
											<h3>Suggestions</h3>
											{/* <i class="la la-ellipsis-v"></i> */}
											{/* <FontAwesomeIcon icon={faEllipsisVertical} /> */}
										</div>
                                        {/* <!--sd-title end--> */}
										<div class="suggestions-list">
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>Jessica William</h4>
													<span>Graphic Designer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>John Doe</h4>
													<span>PHP Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>Poonam</h4>
													<span>Wordpress Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>Bill Gates</h4>
													<span>C & C++ Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>Jessica William</h4>
													<span>Graphic Designer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>John Doe</h4>
													<span>PHP Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="view-more">
												<a href="#" title="">View More</a>
											</div>
										</div>
                                        {/* <!--suggestions-list end--> */}
									</div>
                                    {/* <!--suggestions end--> */}
									<div class="tags-sec full-width">
										<ul>
											<li><a href="#" title="">Help Center</a></li>
											<li><a href="#" title="">About</a></li>
											<li><a href="#" title="">Privacy Policy</a></li>
											<li><a href="#" title="">Community Guidelines</a></li>
											<li><a href="#" title="">Cookies Policy</a></li>
											<li><a href="#" title="">Career</a></li>
											<li><a href="#" title="">Language</a></li>
											<li><a href="#" title="">Copyright Policy</a></li>
										</ul>
										<div class="cp-sec">
											<img src="images/logo2.png" alt=""/>
											<p><img src="images/cp.png" alt=""/>Copyright 2018</p>
										</div>
									</div>
                                    {/* <!--tags-sec end--> */}
								</div>
                                {/* <!--main-left-sidebar end--> */}
							</div>
							<div class="col-lg-6 col-md-8 no-pd">
								<div class="main-ws-sec">
									<div class="post-topbar">
									
										<div class="user-picy">
											<img src="http://via.placeholder.com/100x100" alt=""/>
										</div>
										<div class="post-st">
											<ul>
												<li>
													<a class="post_project" href="#" title="" onClick={post_project}>Post a Project</a>
												</li>
												<li>
													<a class="post-jb active" href="#" title="" onClick={post_job} >Post a Job</a>
													{/* <button class="post-jb active" onClick={post_job}>
                                                      post job
													</button> */}

												</li>
											</ul>
										</div>
                                        {/* <!--post-st end--> */}
									</div>
									{loading ? (
        <p> 
<FontAwesomeIcon icon={faEllipsis} beatFade size='2xl' style={{ color:"#e44d3a" }}/>
		</p>
      ) :(<>
	  
	  {jobs && jobs.map((item, index) => (
														<div class="posts-section">
														<div class="post-bar">
															<div class="post_topbar">
																<div class="usy-dt">
																	<img src="http://via.placeholder.com/50x50" alt=""/>
																	<div class="usy-name">
																		<h3 key={index}>{item.users.name}</h3>
																		<span><img src="images/clock.png" alt=""/>3 min ago</span>
																	</div>
																</div>
																<div class="ed-opts">
																	{currentUser.id === item.user_id && 

																
																		<Dropdown>
																		  <Dropdown.Toggle variant="success" id="dropdown-basic">
																		  <FontAwesomeIcon icon={faEllipsis} size="lg" rotation={90} />
																		  </Dropdown.Toggle>
																	
																		  <Dropdown.Menu>
																		  
																			<Dropdown.Item ><Link to={`/single_job/${item.id}`}> Edit  </Link></Dropdown.Item>
																			<Dropdown.Item >Delete</Dropdown.Item>
																			
																		  </Dropdown.Menu>
																		</Dropdown>
																	
																	
																	}
																	
																	<ul class="ed-options">
																		<li><a href="#" title="">Edit Post</a></li>
																		<li><a href="#" title="">Unsaved</a></li>
																		<li><a href="#" title="">Unbid</a></li>
																		<li><a href="#" title="">Close</a></li>
																		<li><a href="#" title="">Hide</a></li>
																	</ul>
																</div>
															</div>
															<div class="epi-sec">
																<ul class="descp">
																	<li>
																		
																		<img src={EpicIcon} alt=""/><span>{item.category}</span></li>
																	<li><img src={Position} alt=""/>
																	{ Object.keys(item.users.ville).map(key => (
								                                    <li key={key}>{item.users.ville[key].City_Name}</li>
							                                          ))}
																	{/* <span>{item.users.ville}</span> */}
																	</li>
																</ul>
																<ul class="bk-links">
																	<li><a href="#" title="">
																	<FontAwesomeIcon icon={faBookmark} style={{color: "#ffffff",}} />
																		</a></li>
																	<li>
																	<a href="#" title=""><FontAwesomeIcon icon={faEnvelope} style={{color: "#ffffff",}} /></a>
																	</li>
																</ul>
															</div>
															<div class="job_descp">
																<h3>{item.users.profil}</h3>
																<ul class="job-dt">
																	<li><a href="#" title="">{item.post_type}</a></li>
																	<li><span>${item.salary}/ hr</span></li>
																</ul>
															
														 
															<ul class="skill-tags">
																	<li><a href="#" title="">HTML</a></li>
															</ul>
																
															</div>
															<div class="job-status-bar">
																<ul class="like-com">
																	<li>
																		<a href="#"><i class="la la-heart"></i> Like</a>
																		<img src="images/liked-img.png" alt=""/>
																		<span>25</span>
																	</li> 
																	<li><a href="#" title="" class="com">
																		<img src="images/com.png" alt=""/> Comment 15</a></li>
																</ul>
																<a><i class="la la-eye"></i>Views 50</a>
															</div>
														</div>
													  
													</div>
										)) }
	  </>)
	  }
										
									{/* { tags.map((tag, index) => (
													<div className="tag-item" key={index}>
														
															<li className="text"><a href="#" title="">{tag}</a></li>
															<li className="close" onClick={() => removeTag(index)}>
															<FontAwesomeIcon icon={faXmark} style={{color: "#c4bfbf",}} />
															</li>
														
														
													</div>
												)) } */}
                                    {/* <!--post-topbar end--> */}
									{/* <div class="posts-section">
										<div class="post-bar">
											<div class="post_topbar">
												<div class="usy-dt">
													<img src="http://via.placeholder.com/50x50" alt=""/>
													<div class="usy-name">
														<h3>John Doe</h3>
														<span><img src="images/clock.png" alt=""/>3 min ago</span>
													</div>
												</div>
												<div class="ed-opts">
													<a href="#" title="" class="ed-opts-open">
													<FontAwesomeIcon icon={faEllipsis} size="sm" rotation={90}/>
													</a>
													<ul class="ed-options">
														<li><a href="#" title="">Edit Post</a></li>
														<li><a href="#" title="">Unsaved</a></li>
														<li><a href="#" title="">Unbid</a></li>
														<li><a href="#" title="">Close</a></li>
														<li><a href="#" title="">Hide</a></li>
													</ul>
												</div>
											</div>
											<div class="epi-sec">
												<ul class="descp">
													<li>
														
                                                        <img src={EpicIcon} alt=""/><span>Epic Coder</span></li>
													<li><img src={Position} alt=""/><span>India</span></li>
												</ul>
												<ul class="bk-links">
													<li><a href="#" title="">
													<FontAwesomeIcon icon={faBookmark} style={{color: "#ffffff",}} />
														</a></li>
													<li>
													<a href="#" title=""><FontAwesomeIcon icon={faEnvelope} style={{color: "#ffffff",}} /></a>
													</li>
												</ul>
											</div>
											<div class="job_descp">
												<h3>Senior Wordpress Developer</h3>
												<ul class="job-dt">
													<li><a href="#" title="">Full Time</a></li>
													<li><span>$30 / hr</span></li>
												</ul>
											
									     
											<ul class="skill-tags">
													<li><a href="#" title="">HTML</a></li>
											</ul>
												
											</div>
											<div class="job-status-bar">
												<ul class="like-com">
													<li>
														<a href="#"><i class="la la-heart"></i> Like</a>
														<img src="images/liked-img.png" alt=""/>
														<span>25</span>
													</li> 
													<li><a href="#" title="" class="com">
                                                        <img src="images/com.png" alt=""/> Comment 15</a></li>
												</ul>
												<a><i class="la la-eye"></i>Views 50</a>
											</div>
										</div>
                                      
									</div> */}
                                    {/* <!--posts-section end--> */}
								</div>
                                {/* <!--main-ws-sec end--> */}
							</div>
							<div class="col-lg-3 pd-right-none no-pd">
								<div class="right-sidebar">
									<div class="widget widget-about">
										<img src="images/wd-logo.png" alt=""/>
										<h3>Track Time on Workwise</h3>
										<span>Pay only for the Hours worked</span>
										<div class="sign_link">
											<h3><a href="#" title="">Sign up</a></h3>
											<a href="#" title="">Learn More</a>
										</div>
									</div>
                                    {/* <!--widget-about end--> */}
									<div class="widget widget-jobs">
										<div class="sd-title">
											<h3>Top Jobs</h3>
											<i class="la la-ellipsis-v"></i>
										</div>
										<div class="jobs-list">
											<div class="job-info">
												<div class="job-details">
													<h3>Senior Product Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div class="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>
                                            {/* <!--job-info end--> */}
											<div class="job-info">
												<div class="job-details">
													<h3>Senior UI / UX Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div class="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>
                                            {/* <!--job-info end--> */}
											<div class="job-info">
												<div class="job-details">
													<h3>Junior Seo Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div class="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>
                                            {/* <!--job-info end--> */}
											<div class="job-info">
												<div class="job-details">
													<h3>Senior PHP Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div class="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>
                                            {/* <!--job-info end--> */}
											<div class="job-info">
												<div class="job-details">
													<h3>Senior Developer Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div class="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>
                                            {/* <!--job-info end--> */}
										</div>
                                        {/* <!--jobs-list end--> */}
									</div>
                                    {/* <!--widget-jobs end--> */}
									<div class="widget widget-jobs">
										<div class="sd-title">
											<h3>Most Viewed This Week</h3>
											<i class="la la-ellipsis-v"></i>
										</div>
										<div class="jobs-list">
											<div class="job-info">
												<div class="job-details">
													<h3>Senior Product Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div class="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>
                                            {/* <!--job-info end--> */}
											<div class="job-info">
												<div class="job-details">
													<h3>Senior UI / UX Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div class="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>
                                            {/* <!--job-info end--> */}
											<div class="job-info">
												<div class="job-details">
													<h3>Junior Seo Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div class="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>
                                            {/* <!--job-info end--> */}
										</div>
                                        {/* <!--jobs-list end--> */}
									</div>
                                    {/* <!--widget-jobs end--> */}
									<div class="widget suggestions full-width">
										<div class="sd-title">
											<h3>Most Viewed People</h3>
											<i class="la la-ellipsis-v"></i>
										</div>
                                        {/* <!--sd-title end--> */}
										<div class="suggestions-list">
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>Jessica William</h4>
													<span>Graphic Designer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>John Doe</h4>
													<span>PHP Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>Poonam</h4>
													<span>Wordpress Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>Bill Gates</h4>
													<span>C &amp; C++ Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>Jessica William</h4>
													<span>Graphic Designer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="suggestion-usd">
												<img src="http://via.placeholder.com/35x35" alt=""/>
												<div class="sgt-text">
													<h4>John Doe</h4>
													<span>PHP Developer</span>
												</div>
												<span><i class="la la-plus"></i></span>
											</div>
											<div class="view-more">
												<a href="#" title="">View More</a>
											</div>
										</div>
                                        {/* <!--suggestions-list end--> */}
									</div>
								</div>
                                {/* <!--right-sidebar end--> */}
							</div>
						</div>
					</div>
                    {/* <!-- main-section-data end--> */}
				</div> 
			</div>
		</main>
		
		<div className={`post-popup pst-pj ${postproject==true ? "active" : ""}`}>
			<div class="post-project">
				<h3>Post a project</h3>
				<div class="post-project-fields">
					<form>
						<div class="row">
							<div class="col-lg-12">
						
								<input type="text" name="title" placeholder="Title"/>
								
								
								{/* { errors.map((tag, index) => (
													<div className="tag-item" key={index}>
														
														
															<li className="text"><a href="#" title="">{tag}</a></li>
		
														
													
													</div>
								)) } */}
							</div>
							<div class="col-lg-12">
								<div class="inp-field">
									<select>
										<option key="1">Content Creation</option>
										<option key="2">Customer Service</option>
										<option key="3">Data Entry</option>
										<option key="4">Digital Marketing</option>
										<option key="5">Graphic Design</option>
										<option key="6">IT and Programming</option>
										<option key="7">Online Teaching and Tutoring</option>
										<option key="8">Translation and Localization</option>
										<option key="9">Web Development</option>
										<option key="10">Writing and Editing</option>
										
									</select>
								</div>
							</div>
							<div class="col-lg-12">
								<input type="text" name="skills" placeholder="Skills"/>
							</div>
							<div class="col-lg-12">
								<div class="price-sec">
									<div class="price-br">
										<input  type="text" name="price1" placeholder="Price"/>
										<i class="la la-dollar"></i>
									</div>
									<span>To</span>
									<div class="price-br">
										<input type="text" name="price1" placeholder="Price"/>
										<i class="la la-dollar"></i>
									</div>
								</div>
							</div>
							<div class="col-lg-12">
								<textarea name="description" placeholder="Description"></textarea>
							</div>
							<div class="col-lg-12">
								<ul>
									<li><button class="active" type="submit" value="post">Post</button></li>
									<li onClick={close_project_form}><a href="good" title="" >Cancel</a></li>
								</ul>
							</div>
						</div>
					</form>
				</div>
                {/* <!--post-project-fields end--> */}
				<a href="#" title="" onClick={close_project_form}>
				<FontAwesomeIcon icon={faXmark} style={{color: "#c4bfbf",}} />
					</a>
			</div>
            {/* <!--post-project end--> */}
		</div>
      
      
		<div className={`post-popup job_post ${post==true ? "active" : ""}`}>
			<div class="post-project">
				<h3>Post a job</h3>
				<div class="post-project-fields">
					<form onSubmit={Post_job}> 
						<div class="row">
							<div class="col-lg-12">
								<input ref={post_title} className={`${errors && errors.Post_Title ? "input_eror" : ""}`}   type="text" name="title" placeholder="Title"/>
							</div>
							{errors && 
									<div className='error-message'>
										{errors.Post_Title}
									</div>
							}
									


							{/* <ul>
							{ errors && Object.keys(errors).map(key => (
								<li key={key}>{key}: {errors[key]}</li>
							))}
	
							</ul> */}
							<div class="col-lg-12">
								<div class="inp-field">
									<select className={` ${ errors && errors.category ? "input_eror" : "input_succes"}`}  ref={category} placeholder='job category'>
									<option value=""  disabled hidden>Select a categorie</option>
									    <option key="1">Content Creation</option>
										<option key="2">Customer Service</option>
										<option key="3">Data Entry</option>
										<option key="4">Digital Marketing</option>
										<option key="5">Graphic Design</option>
										<option key="6">IT and Programming</option>
										<option key="7">Online Teaching and Tutoring</option>
										<option key="8">Translation and Localization</option>
										<option key="9">Web Development</option>
										<option key="10">Writing and Editing</option>
									</select>
									{errors && 
									<div className='error-message'>
										{errors.category}
									</div>
									}
									
								</div>
							</div>
							<div class="col-lg-12">
							<div className="tags-input-container">
							<input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="To assign a tag, please press the 'Enter' key"   />
							   
							{/* <ul className='skill-tags'>
												{ tags.map((tag, index) => (
													<div className="tag-item" key={index}>
														
															<li className="text"><a href="#" title="">{tag}</a></li>
															<li className="close" onClick={() => removeTag(index)}>
															<FontAwesomeIcon icon={faXmark} style={{color: "#c4bfbf",}} />
															</li>
														
													</div>
												)) }
							</ul> */}
							</div>
							</div>
							<div class="col-lg-6">
								<div class="price-br">
									<input className={` ${ errors && errors.Price ? "input_eror" : ""}`} ref={price} type="text" name="price1" placeholder="Price"/>
									{errors && 
									<div className='error-message'>
										{errors.Price}
									</div>
									}
									
									<i>
									<FontAwesomeIcon icon={faHandHoldingDollar} />
									</i>
									
								</div>
							</div>
							<div class="col-lg-6">
								<div class="inp-field">
									<select className={` ${errors && errors.Post_type ? "input_eror" : ""}`} ref={post_type}>
									<option value=""  disabled hidden>Employment Contract</option>
										<option key="1">Full Time</option>
										<option key="2">Half time</option>
									</select>
									{errors && 
									<div className='error-message'>
										{errors.Post_type}
									</div>
									}
								</div>
							</div>
							<div class="col-lg-12">
								<textarea className={` ${errors && errors.Description ? "input_eror" : ""}`} ref={description} name="description" placeholder="Description"></textarea>
								{errors && 
									<div className='error-message'>
										{errors.Description}
									</div>
								}
								{show==true && 
									     
										 <Alert className='alert-succes' variant="success" onClose={() => setShow(false)} dismissible>
										   <Alert.Heading>Congratulations! Your job offer has been successfully registered</Alert.Heading>
										   <p>
										   Thank you for using our platform to post your job offer. We appreciate your trust in us and look forward to helping you find the right fit for your team
										   </p>
						   				 </Alert>							   
			                  	}
									


							</div>
							<div class="col-lg-12">
								<ul>
									<li><button class="active" type="submit" value="post">Post</button></li>
									<li><a href="#" title="" onClick={close_form}>Cancel</a></li>
								</ul>
							</div>
						</div>
					</form>
				</div>
				<a href="#" title="" onClick={close_form}>
				<FontAwesomeIcon icon={faXmark} style={{color: "#c4bfbf",}} />
				</a>
			</div>
		</div>
		<div class="chatbox-list">
			<div class="chatbox">
				<div class="chat-mg">
					<a href="#" title=""><img src="http://via.placeholder.com/70x70" alt=""/></a>
					<span>2</span>
				</div>
				<div class="conversation-box">
					<div class="con-title mg-3">
						<div class="chat-user-info">
							<img src="http://via.placeholder.com/34x33" alt=""/>
							<h3>John Doe <span class="status-info"></span></h3>
						</div>
						<div class="st-icons">
							<a href="#" title=""><i class="la la-cog"></i></a>
							<a href="#" title="" class="close-chat"><i class="la la-minus-square"></i></a>
							<a href="#" title="" class="close-chat"><i class="la la-close"></i></a>
						</div>
					</div>
					<div class="chat-hist mCustomScrollbar" data-mcs-theme="dark">
						<div class="chat-msg">
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor.</p>
							<span>Sat, Aug 23, 1:10 PM</span>
						</div>
						<div class="date-nd">
							<span>Sunday, August 24</span>
						</div>
						<div class="chat-msg st2">
							<p>Cras ultricies ligula.</p>
							<span>5 minutes ago</span>
						</div>
						<div class="chat-msg">
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor.</p>
							<span>Sat, Aug 23, 1:10 PM</span>
						</div>
					</div>
                    {/* <!--chat-list end--> */}
					<div class="typing-msg">
						<form>
							<textarea placeholder="Type a message here"></textarea>
							<button type="submit"><i class="fa fa-send"></i></button>
						</form>
						<ul class="ft-options">
							<li><a href="#" title=""><i class="la la-smile-o"></i></a></li>
							<li><a href="#" title=""><i class="la la-camera"></i></a></li>
							<li><a href="#" title=""><i class="fa fa-paperclip"></i></a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="chatbox">
				<div class="chat-mg">
					<a href="#" title=""><img src="http://via.placeholder.com/70x70" alt=""/></a>
				</div>
				<div class="conversation-box">
					<div class="con-title mg-3">
						<div class="chat-user-info">
							<img src="http://via.placeholder.com/34x33" alt=""/>
							<h3>John Doe <span class="status-info"></span></h3>
						</div>
						<div class="st-icons">
							<a href="#" title=""><i class="la la-cog"></i></a>
							<a href="#" title="" class="close-chat"><i class="la la-minus-square"></i></a>
							<a href="#" title="" class="close-chat"><i class="la la-close"></i></a>
						</div>
					</div>
					<div class="chat-hist mCustomScrollbar" data-mcs-theme="dark">
						<div class="chat-msg">
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor.</p>
							<span>Sat, Aug 23, 1:10 PM</span>
						</div>
						<div class="date-nd">
							<span>Sunday, August 24</span>
						</div>
						<div class="chat-msg st2">
							<p>Cras ultricies ligula.</p>
							<span>5 minutes ago</span>
						</div>
						<div class="chat-msg">
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum congue leo eget malesuada. Vivamus suscipit tortor eget felis porttitor.</p>
							<span>Sat, Aug 23, 1:10 PM</span>
						</div>
					</div>
                    {/* <!--chat-list end--> */}
					<div class="typing-msg">
						<form>
							<textarea placeholder="Type a message here"></textarea>
							<button type="submit"><i class="fa fa-send"></i></button>
						</form>
						<ul class="ft-options">
							<li><a href="#" title=""><i class="la la-smile-o"></i></a></li>
							<li><a href="#" title=""><i class="la la-camera"></i></a></li>
							<li><a href="#" title=""><i class="fa fa-paperclip"></i></a></li>
						</ul>
					</div>
				</div>
			</div>
			<div class="chatbox">
				<div class="chat-mg bx">
					<a href="#" title=""><img src="images/chat.png" alt=""/></a>
					<span>2</span>
				</div>
				<div class="conversation-box">
					<div class="con-title">
						<h3>Messages</h3>
						<a href="#" title="" class="close-chat"><i class="la la-minus-square"></i></a>
					</div>
					<div class="chat-list">
						<div class="conv-list active">
							<div class="usrr-pic">
								<img src="http://via.placeholder.com/50x50" alt=""/>
								<span class="active-status activee"></span>
							</div>
							<div class="usy-info">
								<h3>John Doe</h3>
								<span>Lorem ipsum dolor <img src="images/smley.png" alt=""/></span>
							</div>
							<div class="ct-time">
								<span>1:55 PM</span>
							</div>
							<span class="msg-numbers">2</span>
						</div>
						<div class="conv-list">
							<div class="usrr-pic">
								<img src="http://via.placeholder.com/50x50" alt=""/>
							</div>
							<div class="usy-info">
								<h3>John Doe</h3>
								<span>Lorem ipsum dolor <img src="images/smley.png" alt=""/></span>
							</div>
							<div class="ct-time">
								<span>11:39 PM</span>
							</div>
						</div>
						<div class="conv-list">
							<div class="usrr-pic">
								<img src="http://via.placeholder.com/50x50" alt=""/>
							</div>
							<div class="usy-info">
								<h3>John Doe</h3>
								<span>Lorem ipsum dolor <img src="images/smley.png" alt=""/></span>
							</div>
							<div class="ct-time">
								<span>0.28 AM</span>
							</div>
						</div>
					</div>
                    {/* <!--chat-list end--> */}
				</div>
                {/* <!--conversation-box end--> */}
			</div>
		</div>
        {/* <!--chatbox-list end--> */}

	</div>
    {/* <!--theme-layout end-->             */}
           </div>
           </>
           )
}

export default News_feed