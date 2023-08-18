import  "../assets/css/jquery.mCustomScrollbar.min.css"
import  "../assets/css/line-awesome.css"
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom'
import { createRef, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import 'font-awesome/css/font-awesome.min.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
import {faHandHoldingDollar} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import EpicIcon from '../img/icons/epic.png'; // path to your image file
import Position from '../img/icons/position.png'; // path to your image file
import AxiosClients from '../Utils/AxiosClients.js'
import { usestateContext } from '../Context/Context.jsx'
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import InputGroup from 'react-bootstrap/InputGroup';

import moment from 'moment';

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

	const [Projectsucces,setProjectMessage]=useState();
	const [showProject, setShowProject] = useState(false);

    const [errors,SetErors]=useState();
    const [Project_errors,SetProjectErors]=useState();

	const [nameEror,SetNameEror]=useState();
	const [isVisible, setIsVisible] = useState(false);
	const [islike, setlike] = useState(true);
	const [isitem,setitem]=useState();
	//post values 
	const job_title=createRef();
	const project_category=createRef();
	const job_category=createRef();
	const job_contract=createRef();
	const price=createRef();
	const description=createRef();
	const [jobs,setjobs]=useState();
	const [projects,setprojects]=useState();
	const [allitems,setall]=useState();
	const [likejob,setLike]=useState(false);


    //project values
	const project_title=createRef();
	const Min_price=createRef();
	const Max_price=createRef();
	const Project_description=createRef();
	const [loading, setLoading] = useState(false);
	const project_contract=createRef();
    const {currentUser,token,setcurrentUser,asset,Settoken}=usestateContext();
	const [image, setImage] = useState(null);
	// const [textareaValue, setTextareaValue] = useState('');
	const [inputValues, setInputValues] = useState([]);
	const [comment,setcomment]=useState(false);
	const [job_id, setJobId] = useState(null); // Set the initial value here
	const [commentIndex,setIndex]=useState();
	const [currentIndex,setCurrentIndex]=useState();
	 const [currentComm,setCurrentcomment]=useState();
	 const [currentpost,setcurrentpost]=useState();
     const textareaValue=createRef();
	//  setinputValue(textareaValue.current.value);
	
	const targetRef = useRef(null);
	

	// function Currentcomment(item){
	// 	setCurrentcomment(item.id)
	// }
	useEffect(() => {
		setIsVisible(false);
	  }, [currentComm]);

	const show_comments=(item,index)=>{
		setCurrentcomment(item.id);
	   //  setCurrentIndex(index);
	     setIsVisible(!isVisible);
	   }
	   

	//   console.log(!isVisible);
	//comment valus 
	const comment_description=createRef();
	// const job_id=createRef();

	function setCommentText(jobId){
		setJobId(jobId)
	}
	
	
   //upload image
    function handleFileChange(event) {
      setImage(event.target.files[0]);
    }
	//<--------------->

	//set time for postig jobs 
	function time(item){
		const diff = moment(item).fromNow();
		return diff;
	}
	{setInterval(time, 60000)}
	

	
	// console.log(currentComm);
	
	
	// console.log(isVisible);
	const handleInputChange = (index, value,item) => {
		setInputValues(prevState => {	
		  const updatedValues = [...prevState];
		  updatedValues[index] = value;
		  setIndex(item.id);
		  return updatedValues;
		});
	
	  };

	   const  handleSubmit=(item,index) => (e) =>{
		 e.preventDefault();
		  
		  let  filteredData = jobs.find(item => item.id==job_id);
	     const postype = filteredData.project_title ? "project" : "job";
		
		 const payload={
			comment:inputValues[index],
			user:currentUser.id,
			postType:postype,
			id:filteredData.id
		 }
		
		 AxiosClients.post(`/comments`,payload).then(({data})=>{
							
						  setInputValues('');
						  filteredData.comments.push(data)
							Swal.fire({
								title: 'comment added Successfully',
								icon: 'info',
								confirmButtonText: 'OK'
							})  
	
					})
					// console.log(filteredData.comments)

					
					.catch((err) => {
						const response = err.response;
					    if (response && response.status === 422) {
						// SetErors(response.data.errors);
						console.log(response);
					   }
					 });	
	   }

		
	
	
    // //<--------------->

	 const handleTextareaChange = (event,item) => {		
			// setTextareaValue(event.target.value);
			setIndex(item.id);
	  };
    //<--------------->

	


	//get the public url directory 
	const assetUrl = import.meta.env.VITE_HOST;
	//<--------------->
    //display image from public folder 
	

	//   const imageUrl = asset(currentUser.profil_picture);
    //<--------------->

	//open and close register post pop up  
	  const post_job=(e)=>{
		e.preventDefault();
		setpost(true);
		
	}

	const close_form=(e)=>{
		e.preventDefault();
		closepostForm(true);
		if(close==true){
			setpost(false);
		}
		
	}
	///<-------------------------------------------->

	//show insert job succes message 
	useEffect(() => {
	    if(succes !==undefined){
			setShow(true)
		}
	  }, [succes]);
	
	///<-------------------------------------------->

	//open and close register project  pop up  

	  useEffect(() => {
	    if(Projectsucces!==undefined){
			setShowProject(true)

		}
	  }, [Projectsucces])

	  const close_project_form=(e)=>{
		e.preventDefault();
		closeProject(true);
		if(closproject==true){
			setproject(false);
		}
		
	}
	///<-------------------------------------------->

	  //insert new project 
	  const post_project=(e)=>{
		e.preventDefault();
		setproject(true);
	}

	function delay(ms) {
		return new Promise((resolve) => {
		   setTimeout(resolve, ms);
		})
	 }
///<-------------------------------------------->

useEffect(() => {
	
AxiosClients.get('/getpost')
	.then(( {data} ) => {
		setitem(data);
	})


}, []);

// function returnitem(item){
// 	if(isitem!==undefined){
// 		const student = isitem.find((student) => student.job_id === item.id);
// 		return student.id;
// 	}

// }




// const result = isitem.find(item => isitem.id === 20);
// console.log(result);
function checklike(item){
	// console.log(isitem);
	//  const result = isitem.find(item => isitem.id === 20);
	//  console.log(result);

	// let  filterlike = isitem.find(Item => item.id==isitem.job_id);
	//  console.log(filterlike);

}
	 // get the list of jobs 
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
		// get list of jobs without shuffle 
		// useEffect(() => {
		// 	AxiosClients.get('/Jobs')
		// .then(({ data }) => {
		// 	SetJobs(data)
			
		// })
		// .catch(() => {
		// 	// setLoading(false)
		// })
		
		// }, []);
		///<--------------->
		
	///<-------------------------------------------->

	//get the list of projects 
	useEffect(() => {
		setLoading(true)
		AxiosClients.get('/projects')
	.then(({ data }) => {
		setLoading(false)
		setprojects(data)
	})
	.catch(() => {
		setLoading(false)
	})
	
	}, []);

	{
       
    }
	
    //add tags for job 
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
	///<-------------------------------------------->

	//add tags for project 
	const[projectTags,SetTags]=useState([])
	function projectkeydown(e){
		if(e.key !== 'Enter')
			return 
			const value = e.target.value
		    e.preventDefault();
			// if(value.trim())
			// return
			if(projectTags.length<=8){
				SetTags([...projectTags, value])
				e.target.value = ''
			}
	}
	
///<-------------------------------------------->
	//<----------------------->
	const formdata=new FormData();
	const Post_job = async (ev) => {
	ev.preventDefault()
	formdata.append('job_title',job_title.current.value);
	formdata.append('job_category',job_category.current.value);
	formdata.append('job_contract',job_contract.current.value);
	formdata.append('Price',price.current.value);
	formdata.append('Description',description.current.value);
	formdata.append('Tags',tags); 
	// formdata.append("job_picture", image);

	
	  // We will send formData object as a data to the API URL here.
	  const response = await AxiosClients.post("/jobs",formdata,
	  {
		  headers: {"Content-Type": "multipart/form-data"},
		  
	  }).then((data) => {
		    
		  	setMessage(data.data.succes);
			SetErors('');
			//delay before hide insert job pop up 
			async function Delay() {
				await delay(2000);
				setpost(false);
			 }
			 Delay();
			 Swal.fire({
				title: 'Job Added Successfully',
				// text: 'Do you want to continue',
				icon: 'success',
				confirmButtonText: 'OK'
			  }) 
			//refresh list of jobs
			 AxiosClients.get('/jobs')
			 .then(({ data }) => {
				 setLoading(false)
				 setjobs(data)
			 })

             
		    
		  }).catch((error) => {
			const res=error.response.data;
			SetErors(res.errors);
		    
	  });
  
   

	
   
  
  }
	//delete single job 
	const handleDelete = (id) => {
		AxiosClients.delete(`/jobs/${id}`).then(({data})=>{
			Swal.fire({
				title: 'Job Deleted Successfully',
				// text: 'Do you want to continue',
				icon: 'info',
				confirmButtonText: 'OK'
			  })  
		
			setLoading(true)
			AxiosClients.get('/jobs')
			.then(({ data }) => {
				setLoading(false)
				setjobs(data)
			})
		})
		.catch((err) => {

		// 	const response = err.response;
		//     if (response && response.status === 422) {
		// 	SetErors(response.data.errors);
		
		//    }
		 });		}
	//<----------------------->
	const deletecomment = (item,id,index) => {
		 let  filteredData = jobs.find(item => item.id==id);
		 let filterComments=filteredData.comments.find(Item => item.id==id)
		

		AxiosClients.delete(`/comments/${filterComments.id}`).then(({data})=>{
			
				if (index !== -1) {
					filteredData.comments.splice(index,1);
					setIsVisible(!isVisible);
				}
			
			  

			Swal.fire({
				title: 'comment Deleted Successfully',
				// text: 'Do you want to continue',
				icon: 'info',
				confirmButtonText: 'OK'
			  })  
		})
		.catch((err) => {

		// 	const response = err.response;
		//     if (response && response.status === 422) {
		// 	SetErors(response.data.errors);
		
		//    }
		 });		}
		//delete single project
		const handleDeleteproject = (id) => {
			AxiosClients.delete(`/projects/${id}`).then(({data})=>{
				Swal.fire({
					title: 'Project Deleted Successfully',
					// text: 'Do you want to continue',
					icon: 'info',
					confirmButtonText: 'OK'
				  }) 
				setLoading(true)
				AxiosClients.get('/jobs')
				.then(({ data }) => {
					setLoading(false)
					setjobs(data)
				})
			})
			.catch((err) => {
	
			// 	const response = err.response;
			//     if (response && response.status === 422) {
			// 	SetErors(response.data.errors);
			
			//    }
			 });		}
		//<----------------------->


    //add new project 
	const Post_Project=(e)=>{
		e.preventDefault();
		const payload={
			Project_Title:project_title.current.value,
			project_category:project_category.current.value,
			project_contract:project_contract.current.value,
			Min_Price:Min_price.current.value,
			Max_Price:Max_price.current.value,
			project_Description:Project_description.current.value,
			ProjectTags:projectTags
		}
		
		AxiosClients.post('/projects',payload).then(({data})=>{
			setProjectMessage(data.Projectsucces);
			SetProjectErors('');
			//delay before hide insert new project pop up 
			 
			async function Delay() {
				await delay(2000);
				setproject(false);
				
			 }
			 Delay();
			 Swal.fire({
				title: 'Project Added Successfully',
				// text: 'Do you want to continue',
				icon: 'success',
				confirmButtonText: 'OK'
			  }) 
			   AxiosClients.get('/jobs')
			 .then(({ data }) => {
				 setLoading(false)
				 setjobs(data)
			 })
			// const payload={};
			
		})
		.catch((err) => {

			const response = err.response;
		    if (response && response.status === 422) {
				SetProjectErors(response.data.errors);
		   }
		 });
	}
	//<----------------------->
  //update profile 
  const show_profile=(e)=>{
	e.preventDefault();
	AxiosClients.delete(`/profile_setting/${id}`).then(({data})=>{
	
		AxiosClients.get('/jobs')
		.then(({ data }) => {
			setLoading(false)
			setjobs(data)
		})
	})
	.catch((err) => {

	// 	const response = err.response;
	//     if (response && response.status === 422) {
	// 	SetErors(response.data.errors);
	
	//    }
	 });
  }

 
 
//   debugger;
   function checkitem(item){
	const payload={
		job_id:item.id,
	 }
	AxiosClients.post(`/check/${item.id}`,payload).then(({data})=>{
		
	 return {data}
		
	})
	.catch((err) => {

	// 	const response = err.response;
	//     if (response && response.status === 422) {
	// 	SetErors(response.data.errors);
	
	//    }
	 });

   }

  
	  
	 
   const getlike=(item)=>{
	setLike(true);
   }
  const likepost=(item)=>{
     setlike(true);
	const payload={
       job_id:item.id,
	   is_like:islike
	}
	
	AxiosClients.post(`/like/${item.id}`,payload).then(({data})=>{
		
	  console.log({data});
		
	})
	.catch((err) => {

	// 	const response = err.response;
	//     if (response && response.status === 422) {
	// 	SetErors(response.data.errors);
	
	//    }
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
												<img src={asset("origin",currentUser.profil_picture)}  alt=""/>
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
												<a href="#" title=""  ><Link to={`/profile_setting/${currentUser.id}`}>View Profile</Link> </a>
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
									
									{currentUser.profil=="Client" &&
										<div class="post-topbar">
									
										<div class="user-picy">
											<img  alt=""/>
										</div>
										<div class="post-st">
											<ul>
												<li>
													<a class="post_project" href="#" title="" onClick={post_project}> Post a Project </a>
												</li>
												<li>
													<a class="post-jb active" href="#" title="" onClick={post_job}> Post a Job </a>
													
												</li>
											</ul>
										</div>
									</div>
									} 
								
									
									{loading ? (
											<p> 
									<FontAwesomeIcon icon={faEllipsis} beatFade size='2xl' style={{ color:"#e44d3a" }}/>
											</p>
										) :(<>
										
										{jobs && jobs.map((item, index) => (
														<div class="posts-section" >
														<div class="post-bar"  id={index}>
															<div class="post_topbar">
																<div class="usy-dt">
																	<img src={asset("small",item.users.profil_picture)} alt=""/>
																	<div class="usy-name">
																		<h3 key={index}>{item.users.name}</h3>
																   		<span><img src="images/clock.png" alt=""/>
																     	{time(item.created_at)}

																		   {/* { time(item.created_at)} */}
																		   {/* {timePassed} */}
																		</span>
																	</div>
																</div>
																<div class="ed-opts">
																	{currentUser.id === item.user_id && 

																
																		<Dropdown>
																		  <Dropdown.Toggle variant="success" id="dropdown-basic">
																		  <FontAwesomeIcon icon={faEllipsis} size="lg" rotation={90} />
																		  </Dropdown.Toggle>
																	
																		  <Dropdown.Menu>
																		    {item.job_title &&
																			<Dropdown.Item ><Link to={`/single_job/${item.id}`}> Edit  </Link></Dropdown.Item>
																			}
																			{ 
																			item.project_title &&
																			<Dropdown.Item ><Link to={`/single_project/${item.id}`}> Edit  </Link></Dropdown.Item>
																			}
																			 {item.job_title &&
																			<Dropdown.Item onClick={() => handleDelete(item.id)}> Delete  </Dropdown.Item>
																			}
																			{ 
																			item.project_title &&
																			<Dropdown.Item onClick={() => handleDeleteproject(item.id)}> Delete  </Dropdown.Item>
																			}
																			
																			
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
																		
																	<img src={EpicIcon} alt=""/><span> {item.project_category ?  item.project_category : item.job_category }</span></li>
																	<li><img src={Position} alt=""/>
																	{item.users.cities.City_Name}
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
																<h3>
																	{item.job_title}
																	{item.project_title}
																</h3>
																<ul class="job-dt">
																	{item.job_contract && 
																	<li>
																	<a href="#" title="">{item.job_contract}</a>
																    </li>
																	}
																	{item.project_category && 
																	<li>
																	<a href="#" title="">{item.project_category}</a>
																    </li>
																	}
																	{item.salary && 
																		<li><span>${item.salary}/ Month</span></li>
																	}
																	
																	{item.min_price && 
																	<div>
																		<li><span>${item.min_price}/ hr</span>  To </li>
																		  
																		 <li><span>${item.max_price}/ hr</span></li>
																	</div>
																	
																	}
																	


																</ul>
															
														 
																<ul class="skill-tags">
																	<li>
																	
																	{  item.tags.map((tag, index) => (
																tag.tag_name !== '0' &&
															<div className="tag-item" key={index}>
																	<li className="text"><a href="#" title="">{(tag.tag_name !== '0') ? tag.tag_name:""}</a></li>
															</div>
												     )) } 
															     	
															      </li>
															</ul>
															<p>
															{item.job_description}
															{item.project_description}

															</p>
																
															</div>

															<div class="job-status-bar" >
																<ul class="like-com">
																	<li>
																		 {/* <a href="#" className={`${likejob==true  ? "isactive":""}`} onClick={() =>{getlike(item)}}><i class="la la-heart"></i> Like</a> */}
				
																		<a className={``} onClick={() => {likepost(item)}}><i class="la la-heart"></i> Like</a>
																		 {/* <a  className={checklike(item)}><i class="la la-heart"></i> Like</a>  */}
																		
																		<img src="images/liked-img.png" alt=""/>
																		<span>25</span>
																	</li> 
																	<li><a title=""  class="com" onClick={() => {show_comments(item,index)}}>
																	<img src="images/com.png" alt=""/> Comment {item.comments.length}  </a></li>
																</ul>
																
									 
	

	

{item.comments.map((comment,index) => (
<div  className={`comment-section ${isVisible==true && item.id==currentComm ? "isVisible" : "hide_comment"}`} id={item.comments[index].id} >
{/* {console.log(item.comments[1])} */}
<div class="comment-sec">
	<ul>
		<li>
			<div class="comment-list" id={item.comments[index].id}>
				{/* <div class="bg-img">
					<img src="http://via.placeholder.com/40x40" alt=""/>
				</div> */}
				<div class="comment">
					<h3>
						{item.comments && item.comments[index].User_Name}
					</h3>
					<span className="Image-Comment">
					{item.comments && 	<Image src={asset("small",item.comments[index].profile_picture)}  roundedCircle className="image-comment" />
                     }

                        {time(item.comments[index].created_at)}
						</span>
					<p>
						{item.comments && item.comments[index].comment_content}
					.</p>
				</div>
				
				<div class="ed-opts">
																	{item.comments[index] && currentUser.id === item.comments[index].user_id && 
																		<Dropdown>
																		  <Dropdown.Toggle variant="success" id="dropdown-basic">
																		  <FontAwesomeIcon icon={faEllipsis} size="lg" rotation={90} />
																		  </Dropdown.Toggle>
																	
																		  <Dropdown.Menu>
																		   
																			{(item.job_title || item.project_title )&&
																			<Dropdown.Item onClick={() => deletecomment(item,item.id,index)}> Delete  </Dropdown.Item>
																			}
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
			{/* <!--comment-list end--> */}
		</li>
	</ul>
</div>
{/* <!--comment-sec end--> */}

{/* <!--post-comment end--> */}
</div> 
		 ))}

												 

											
												 
												
											   
											 
												
											{/* <!--comment-section end--> */}
																<a><i class="la la-eye"></i>Views 50</a>
													            <form >
                                                                 <div className="container comment-container">
																	{/* onChange={(e) => { setCommentText(item.id); handleTextareaChange(e,item);	  }}  */}
																<div class="comment-sect" >
																	
																	<input key={index} onChange={e => {handleInputChange(index,e.target.value,item);setCommentText(item.id)}} name="textareaValue" type="text" placeholder="Input field" value={inputValues[index] || ""}/>
																	<div   className="comment-send-button">
																	<button onClick={handleSubmit(item,index)} type="submit" className={`comment-send-container icon ${ ((inputValues[index]) && (inputValues[index].trim()))!=="" && item.id==commentIndex ? "active-icon" : "disable-icon"}`} ><FontAwesomeIcon icon={faPaperPlane}  className='comment-send-icon' />
																	</button>
																	</div>
																	{/* onChange={() => { setCommentText(item.id); handleSubmit() }} */}
																	{/* <i class="fas fa-search icon"></i> */}
																</div>
															

																</div>
																<div className="image-container">
																{/* <Image src="holder.js/171x180" roundedCircle className="image-comment" /> */}
																<Image src={asset("small",currentUser.profil_picture)}  roundedCircle className="image-comment" />
																</div>
																</form>

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
					<form onSubmit={Post_Project}>
						<div class="row">
							<div class="col-lg-12">
						
							<input ref={project_title} className={` ${ Project_errors && Project_errors.Project_Title ? "input_eror" : "input_succes"}`} type="text" name="title" placeholder="Title"/>
							{Project_errors && 
									<div className='error-message'>
										{Project_errors.Project_Title}
									</div>
							}
							</div>
							<div class="col-lg-12">
								<div class="inp-field">
									<select className={` ${ Project_errors && Project_errors.project_category ? "input_eror" : "input_succes"}`}  ref={project_category}>
									   <option value=""  disabled selected> Select a categorie </option>
									  
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
								{Project_errors && 
									<div className='error-message'>
										{Project_errors.project_category}
									</div>
								}

							</div>
							<div class="col-lg-12">
								<input type="text" name="skills" placeholder="Skills" onKeyDown={projectkeydown}/>
							</div>
							<div class="col-lg-12">
							<div class="inp-field">
									<select className={` ${errors && errors.project_contract ? "input_eror" : ""}`} ref={project_contract}>
										<option value=""  disabled selected> Employement Contract </option>
										<option key="1">Full Time </option>
										<option key="2">Half time</option>
										<option key="3">Hourly</option>
									</select>
									{errors && 
									<div className='error-message'>
										{errors.job_contract}
									</div>
									}
								</div>
							</div>

							<div class="col-lg-12">
								<div class="price-sec">
									<div class="price-br">
										<input className={` ${ Project_errors && Project_errors.Max_Price ? "input_eror" : "input_succes"}`} type="text" name="price1" placeholder="Price" ref={Min_price}/>
										{Project_errors && 
										<div className='error-message'>
											{Project_errors.Min_Price}
										</div>
							             }
										<i class="la la-dollar"></i>
									</div>
									<span>To</span>
									<div class="price-br">
										<input className={` ${ Project_errors && Project_errors.Max_Price ? "input_eror" : "input_succes"}`} type="text" name="price1" placeholder="Price" ref={Max_price}/>
										{Project_errors && 
										<div className='error-message'>
											{Project_errors.Max_Price}
										</div>
							             }
										<i class="la la-dollar"></i>
									</div>
								</div>
							</div>
							<div class="col-lg-12">
								<textarea className={` ${ Project_errors && Project_errors.project_Description ? "input_eror" : "input_succes"}`} name="description" placeholder="Description" ref={Project_description}></textarea>
								{Project_errors && 
										<div className='error-message'>
											{Project_errors.project_Description}
										</div>
							    }
								{showProject==true && 
									     
										 <Alert className='alert-succes' variant="success" onClose={() => setShowProject(false)} dismissible>
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
								<input ref={job_title} className={`${errors && errors.job_title ? "input_eror" : ""}`}   type="text" name="title" placeholder="Title"/>
							</div>
							{errors && 
									<div className='error-message'>
										{errors.job_title}
									</div>
							}
							<div class="col-lg-12">
							{/* <div class="sn-field">
								
								<input   placeholder="Profil Picture" type='file' onChange={handleFileChange}/>

								<i class="fa fa-image"></i>											
								</div>							 */}
							</div>	


							{/* <ul>
							{ errors && Object.keys(errors).map(key => (
								<li key={key}>{key}: {errors[key]}</li>
							))}
	
							</ul> */}
							<div class="col-lg-12">
								<div class="inp-field">
									<select className={` ${ errors && errors.job_category ? "input_eror" : "input_succes"}`}  ref={job_category} placeholder='job category'>
									   <option value=""  disabled selected> Select a categorie </option>
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
										{errors.job_category}
									</div>
									}
									
								</div>
							</div>
							<div class="col-lg-12">
							<div className="tags-input-container">
							<input onKeyDown={handleKeyDown} type="text" className="tags-input" placeholder="To assign a tag, please press the 'Enter' key"   />
							   

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
									<select className={` ${errors && errors.job_contract ? "input_eror" : ""}`} ref={job_contract}>
										<option value=""  disabled selected> Employement Contract </option>
										<option key="1">Full Time </option>
										<option key="2">Half time</option>
									</select>
									{errors && 
									<div className='error-message'>
										{errors.job_contract}
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
										   <Alert.Heading>Congratulations! Your project has been successfully registered</Alert.Heading>
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
							<img  alt=""/>
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
							<img  alt=""/>
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