import { useRef, useState } from "react";
import { useEffect } from "react";
import AxiosClients from "../../Utils/AxiosClients";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsis} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { usestateContext } from "../../Context/Context";
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom'
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'
 import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
 import Swal from 'sweetalert2'

// import Position from "../"
 import epic from './img/icons/epic.png'
import position from './img/icons/position.png'
import { createRef } from "react";
import SendMail from "../Inbox/SendMail";
import Echo from 'laravel-echo'

// import "./css/mail.css"
const Jobs=()=>{
  const [loading, setLoading] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const searchjob=createRef();
  const [jobs,setjobs]=useState();
  const [isVisible, setIsVisible] = useState(false);
  const [inputValues, setInputValues] = useState([]);
  const [commentIndex,setIndex]=useState();
  const [job_id, setJobId] = useState(null); // Set the initial value here
  const [currentComm,setCurrentcomment]=useState();
  const [skill,setskill]=useState("");
  const [Tomail,Setmail]=useState(true);
//   const [hourly,sethourly]=useState();
//   const [parttime,setparttime]=useState();
const [jobtype,setvaluejobtype]=useState("all");
const [Jobs,setjobsbytype]=useState();
const [Jobtype,Setvaluejobtype]=useState("All");
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(100);
// const [currentJob,Setcurrentjob]=useState();



const clearall=()=>{
	setskill('')
	setvaluejobtype('all');
	Setvaluejobtype('all');
}
const handleMinPriceChange = (event) => {
	const newMinPrice = Number(event.target.value);
    if (newMinPrice <= maxPrice) {
      setMinPrice(newMinPrice);
    }
  };

  const handleMaxPriceChange = (event) => {
    const newMaxPrice = Number(event.target.value);
    if (newMaxPrice >= minPrice) {
      setMaxPrice(newMaxPrice);
    }
  };
 

  useEffect(()=>{
	const payload={
		Minprice:minPrice,
		Maxprice:maxPrice
	}
	SetLoading(true);

	AxiosClients.post('/pricerange',payload)
	.then(({ data }) => {
	
	SetLoading(false)
	setjobsbytype(data);
	})
	.catch(() => {
	SetLoading(false)
	})

	
},[minPrice,maxPrice])
const changeskill=(e)=>{

	setskill(e.target.value);
}





  
   const allchange=(event)=>{
	setvaluejobtype(event.target.value);
   }

   const hourlychange=(event)=>{
	  setvaluejobtype(event.target.value);
   }

   const parttimechange=(event)=>{
	setvaluejobtype(event.target.value);
 }

   
const fulltimechange=(event)=>{
	setvaluejobtype(event.target.value);
}

    const clearskills=(e)=>{
		setskill(' ');
		
	}
	const clearjobtype=()=>{
		//  console.log("v");
		 Setvaluejobtype('all');
	}
	
	const clearavailability=()=>{
	    setvaluejobtype('all');
	}

	const getjobtype=(event)=>{
		Setvaluejobtype(event.target.value);
	}

	useEffect(()=>{
		const payload={
			Jobtype:Jobtype
		}
		SetLoading(true);

		AxiosClients.post('/searchbytype',payload)
		.then(({ data }) => {
		
		SetLoading(false)
		setjobsbytype(data);
		})
		.catch(() => {
		SetLoading(false)
		})

		
	},[Jobtype])

const  searchbyjob=(e)=> {
	e.preventDefault();
	SetLoading(true)
	const payload={
		Searchjob:searchjob.current.value
	}
	AxiosClients.post('/searchjob',payload)
	.then(({ data }) => {
	console.log(data);
	SetLoading(false)
	setjobsbytype(data);
	})
 .catch(() => {
   SetLoading(false)
 })
}
// searchbyjob();
// useEffect(() => {

	
// }, []);

useEffect(() => {
	
	SetLoading(true)
	const payload={
		Skill:skill,
	}
 AxiosClients.post('/searchbytag',payload)
 .then(({ data }) => {
 console.log(data);
 SetLoading(false)
 setjobsbytype(data);
	
 })
 .catch(() => {
   SetLoading(false)
 })
 
 }, [skill]);


useEffect(() => {
	
     SetLoading(true)
    AxiosClients.get('/getjobs')
  .then(({ data }) => {
	
	SetLoading(false)
	const filteredJobs=data.filter(item => item.job_contract === jobtype)
	// setjobsbytype(data)
	 if(jobtype!=='all'){
		const filteredJobs=data.filter(item => item.job_contract === jobtype);
		setjobsbytype(filteredJobs)
		
	 }
	 else {
		setjobsbytype(data);
	 }

	 
	
  })
  .catch(() => {
    SetLoading(false)
  })
  
  }, [jobtype]);


  
  const {currentUser,token,setcurrentUser,asset,Settoken,notifications}=usestateContext();


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

         
         .catch((err) => {
           const response = err.response;
             if (response && response.status === 422) {
           // SetErors(response.data.errors);
            }
          });	
    }
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

	const show_comments=(item,index)=>{
		setCurrentcomment(item.id);
	   //  setCurrentIndex(index);
	     setIsVisible(!isVisible);
	   }
	
	   const handleDelete = (id) => {
		AxiosClients.delete(`/jobs/${id}`).then(({data})=>{
			Swal.fire({
				title: 'Job Deleted Successfully',
				// text: 'Do you want to continue',
				icon: 'info',
				confirmButtonText: 'OK'
			  })  
		
			setLoading(true)
			AxiosClients.get('/getjobs')
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

	function setCommentText(jobId){
		setJobId(jobId)
	}
	
	const handleInputChange = (index, value,item) => {
		setInputValues(prevState => {	
		  const updatedValues = [...prevState];
		  updatedValues[index] = value;
		  setIndex(item.id);
		  return updatedValues;
		});
	
	  };


  function time(item){
		const diff = moment(item).fromNow();
		return diff;
	}
	{setInterval(time, 60000)}
	
    return (
        <>
          
	<div className="wrapper">
		
		<div className="search-sec">
			<div className="container">
				<div className="search-box">
					<form onSubmit={searchbyjob}>
						<input ref={searchjob} type="text" name="search" placeholder="Search keywords"/>
						<button type="submit">Search</button>
					</form>
				</div>
        
			</div>
		</div>


		<main>
			<div className="main-section">
				<div className="container">
					<div className="main-section-data">
						<div className="row">
							<div className="col-lg-3">
								<div className="filter-secs">
									<div className="filter-heading">
										<h3>Filters</h3>
										<a onClick={clearall} title="">Clear all filters</a>
									</div>
									<div className="paddy">
										<div className="filter-dd">
											<div className="filter-ttl">
												<h3>Skills</h3>
												 {/* <button onClick={clearskills}>clear</button> */}
												 <a onClick={clearskills} >clear</a>
											</div>
										<form>
												<input onChange={changeskill} value={skill} type="text" name="search-skills" placeholder="Search skills"/>
										</form>
										</div>
										<div className="filter-dd">
											<div className="filter-ttl">
												<h3>Availabilty</h3>
												<a onClick={clearavailability}  title="">Clear</a>
											</div>
											

											<form >

											<ul className="avail-checks">
											  <li>
													<input  checked={jobtype === 'all'}  onChange={allchange} value="all" type="radio" name="cc" id="all"/>
													<label htmlFor="all">
														<span></span>
													</label>
													<small>All</small>
												</li>
												<li>
													<input checked={jobtype === 'Hourly'}  onChange={hourlychange} value="Hourly" type="radio" name="cc" id="c1"/>
													<label htmlFor="c1">
														<span></span>
													</label>
													<small>Hourly</small>
												</li>
												<li>
													<input checked={jobtype === 'Half time'} onChange={parttimechange} value="Half time"  type="radio" name="cc" id="c2"/>
													<label htmlFor="c2">
														<span></span>
													</label>
													<small>Part Time</small>
												</li>
												<li>
													<input checked={jobtype === 'Full Time'} onChange={fulltimechange} type="radio" value='Full Time' name="cc" id="c3"/>
													<label htmlFor="c3">
														<span></span>
													</label>
													<small>Full Time</small>
												</li>
											</ul>
											</form>

										</div>
										
										<div className="filter-dd">
											<div className="filter-ttl">
												<h3>Job Type</h3>
												<a onClick={clearjobtype}  title="">Clear</a>
											</div>
											<form className="job-tp">
												<select onChange={getjobtype}>
												<option value="" key="0" disabled > Select a job type </option>
												<option key="1" defaultValue={Jobtype === 'all'}>All</option>
												<option key="2" >Content Creation</option>
												<option key="3">Customer Service</option>
											<option key="4">Data Entry</option>
												<option key="5">Digital Marketing</option>
												<option key="6">Graphic Design</option>
												<option key="7">IT and Programming</option>
												<option key="8">Online Teaching and Tutoring</option>
												<option key="9">Translation and Localization</option>
												<option key="10">Web Development</option>
												<option key="11">Writing and Editing</option>
												</select>
												<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
											</form>
										</div>
										<div className="filter-dd">
											{/* <div className="filter-ttl">
												<h3>Pay Rate / Hr ($)</h3>
												<a href="#" title="">Clear</a>
											</div>
											<div className="rg-slider">
			                                    <input className="rn-slider slider-input" type="hidden" value="5,50"/>
			                                </div>
			                                <div className="rg-limit">
			                                	<h4>1</h4>
			                                	<h4>100+</h4>
			                                </div> */}
											<div>
      <label htmlFor="Minimum Price">Minimum Price:</label>
      <input
        type="number"
        id="minPrice"
        value={minPrice}
        onChange={handleMinPriceChange}
      />

      <label htmlFor="Maximum Price">Maximum Price:</label>
      <input
        type="number"
        id="maxPrice"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />

      <p>Selected Price Range: ${minPrice} - ${maxPrice}</p>
    </div>
										</div>
										{/* <div className="filter-dd">
											<div className="filter-ttl">
												<h3>Experience Level</h3>
												<a href="#" title="">Clear</a>
											</div>
											<form className="job-tp">
												<select>
													<option>Select a experience level</option>
													<option>3 years</option>
													<option>4 years</option>
													<option>5 years</option>
												</select>
												<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
											</form>
										</div> */}
										{/* <div className="filter-dd">
											<div className="filter-ttl">
												<h3>Countries</h3>
												<a href="#" title="">Clear</a>
											</div>
											<form className="job-tp">
												<select>
													<option>Select a country</option>
													<option>United Kingdom</option>
													<option>United States</option>
													<option>Russia</option>
												</select>
												<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
											</form>
										</div> */}
									</div>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="main-ws-sec">
									<div className="posts-section">
                  {Loading ? (
											<p> 
									<FontAwesomeIcon icon={faEllipsis} beatFade size='2xl' style={{ color:"#e44d3a" }}/>
											</p>
										) :(<>
										
										{Jobs && Jobs.map((item, index) => (
														<div className="posts-section" >
														<div className="post-bar"  id={index}>
															<div className="post_topbar">
																<div className="usy-dt">
																	<img src={asset("small",item.users.profil_picture)} alt=""/>
																	<div className="usy-name">
																		<h3 key={index}>{item.users.name}</h3>
																   		<span><img src="images/clock.png" alt=""/>
																     	{time(item.created_at)}
																		</span>
																	</div>
																</div>
																<div className="ed-opts">
																	{currentUser.id === item.user_id && 

																
																		<Dropdown>
																		  <Dropdown.Toggle variant="success" id="dropdown-basic">
																		  <FontAwesomeIcon icon={faEllipsis} size="lg" rotation={90} />
																		  </Dropdown.Toggle>
																	
																		  <Dropdown.Menu>
																		    {item.job_title &&
																			<Dropdown.Item ><Link to={`/single_job/${item.id}${item.user_id}`}> Edit  </Link></Dropdown.Item>
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
																	
																	<ul className="ed-options">
																		<li><a href="#" title="">Edit Post</a></li>
																		<li><a href="#" title="">Unsaved</a></li>
																		<li><a href="#" title="">Unbid</a></li>
																		<li><a href="#" title="">Close</a></li>
																		<li><a href="#" title="">Hide</a></li>
																	</ul>
																</div>
															</div>
															<div className="epi-sec">
																<ul className="descp">
																	<li>
																		
																	<img src={epic} alt=""/><span>{item.job_category ?  item.job_category : "" }</span></li>
																	<li><img src={position} alt=""/>
																	{item.users.cities.City_Name}
																	</li>
																</ul>
																<ul className="bk-links">
																	<li><a href="#" title="">
																	<FontAwesomeIcon icon={faBookmark} style={{color: "#ffffff",}} />
																		</a></li>
																	<li>
																		
																 <Link to={`/single_job_mail/${item.id}/${item.user_id}`}  title=""><FontAwesomeIcon icon={faEnvelope} style={{color: "#ffffff",}} /></Link> 
																	{/* <Link to={`/job/mail/${currentUser.id}`}><FontAwesomeIcon icon={faEnvelope} style={{color: "#ffffff",}} /></Link> */}
																	</li>
																</ul>
															</div> 
                                                           <div className="job_descp">
																<h3>
																	{item.job_title}
																	{item.project_title}
																</h3>
																<ul className="job-dt">
																	{item.post_type && 
																	<li>
																	<a href="#" title="">{item.post_type}</a>
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
															
														 
															<ul className="skill-tags">
																	<li>
																	
																	{item.tags.map((tag, index) => (
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
															
															
                                                           
															<div className="job-status-bar" >
																<ul className="like-com">
																	<li>
																		 {/* <a href="#" className={`${likejob==true  ? "isactive":""}`} onClick={() =>{getlike(item)}}><i className="la la-heart"></i> Like</a> */}
				
																		<a className={``} onClick={() => {likepost(item)}}><i className="la la-heart"></i> Like</a>
																		 {/* <a  className={checklike(item)}><i className="la la-heart"></i> Like</a>  */}
																		
																		<img src="images/liked-img.png" alt=""/>
																		<span>25</span>
																	</li> 
																	<li><a title=""  className="com" onClick={() => {show_comments(item,index)}}>
																	<img src="images/com.png" alt=""/> Comment {item.comments.length}  </a></li>
																</ul>
																
									 
	

	

{item.comments.map((comment,index) => (
<div  className={`comment-section ${isVisible==true && item.id==currentComm ? "isVisible" : "hide_comment"}`} id={item.comments[index].id} >
{/* {console.log(item.comments[1])} */}
<div className="comment-sec">
	<ul>
		<li>
			<div className="comment-list" id={item.comments[index].id}>
				{/* <div className="bg-img">
					<img src="http://via.placeholder.com/40x40" alt=""/>
				</div> */}
				<div className="comment">
					<h3>
						{item.comments && item.comments[index].User_Name}
					</h3>
					<span className="Image-Comment">
					{item.comments && 	<img src={asset("small",item.comments[index].profile_picture)}   className="image-comment" />
                     }

                        {time(item.comments[index].created_at)}
						</span>
					<p>
						{item.comments && item.comments[index].comment_content}
					.</p>
				</div>
				
				<div className="ed-opts">
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
																	
																	<ul className="ed-options">
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
																<a><i className="la la-eye"></i>Views 50</a>
													            <form >
                                                                 <div className="container comment-container">
																	{/* onChange={(e) => { setCommentText(item.id); handleTextareaChange(e,item);	  }}  */}
																<div className="comment-sect" >
																	
																	<input key={index} onChange={e => {handleInputChange(index,e.target.value,item);setCommentText(item.id)}} name="textareaValue" type="text" placeholder="Input field" value={inputValues[index] || ""}/>
																	<div   className="comment-send-button">
																	<button onClick={handleSubmit(item,index)} type="submit" className={`comment-send-container icon ${ ((inputValues[index]) && (inputValues[index].trim()))!=="" && item.id==commentIndex ? "active-icon" : "disable-icon"}`} ><FontAwesomeIcon icon={faPaperPlane}  className='comment-send-icon' />
																	</button>
																	</div>
																	{/* onChange={() => { setCommentText(item.id); handleSubmit() }} */}
																	{/* <i className="fas fa-search icon"></i> */}
																</div>
															

																</div>
																<div className="image-container">
																{/* <Image src="holder.js/171x180" roundedCircle className="image-comment" /> */}
																<img src={asset("small",currentUser.profil_picture)}   className="image-comment" />
																</div>
																</form>

															</div>
															
														</div>
													    
												     	</div>
										)) }
	  </>)
	  }
									</div>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="right-sidebar">
									<div className="widget widget-about">
										<img src="images/wd-logo.png" alt=""/>
										<h3>Track Time on Workwise</h3>
										<span>Pay only htmlFor the Hours worked</span>
										<div className="sign_link">
											<h3><a href="#" title="">Sign up</a></h3>
											<a href="#" title="">Learn More</a>
										</div>
									</div>{/*<!-- -->*/}
									<div className="widget widget-jobs">
										<div className="sd-title">
											<h3>Top Jobs</h3>
											<i className="la la-ellipsis-v"></i>
										</div>
										<div className="jobs-list">
											<div className="job-info">
												<div className="job-details">
													<h3>Senior Product Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div className="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>{/*<!-- -->*/}
											<div className="job-info">
												<div className="job-details">
													<h3>Senior UI / UX Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div className="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>{/*<!-- -->*/}
											<div className="job-info">
												<div className="job-details">
													<h3>Junior Seo Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div className="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>{/*<!-- -->*/}
											<div className="job-info">
												<div className="job-details">
													<h3>Senior PHP Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div className="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>{/*<!-- -->*/}
											<div className="job-info">
												<div className="job-details">
													<h3>Senior Developer Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div className="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>{/*<!-- -->*/}
										</div>{/*<!-- -->*/}
									</div>{/*<!-- -->*/}
									<div className="widget widget-jobs">
										<div className="sd-title">
											<h3>Most Viewed This Week</h3>
											<i className="la la-ellipsis-v"></i>
										</div>
										<div className="jobs-list">
											<div className="job-info">
												<div className="job-details">
													<h3>Senior Product Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div className="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>{/*<!-- -->*/}
											<div className="job-info">
												<div className="job-details">
													<h3>Senior UI / UX Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div className="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>{/*<!-- -->*/}
											<div className="job-info">
												<div className="job-details">
													<h3>Junior Seo Designer</h3>
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
												</div>
												<div className="hr-rate">
													<span>$25/hr</span>
												</div>
											</div>{/*<!-- -->*/}
										</div>{/*<!-- -->*/}
									</div>{/*<!-- -->*/}
								</div>{/*<!-- -->*/}
							</div>
						</div>
					</div>{/*<!-- -->*/}
				</div> 
			</div>
		</main>




		<div className="post-popup pst-pj">
			<div className="post-project">
				<h3>Post a project</h3>
				<div className="post-project-fields">
					<form>
						<div className="row">
							<div className="col-lg-12">
								<input type="text" name="title" placeholder="Title"/>
							</div>
							<div className="col-lg-12">
								<div className="inp-field">
									<select>
										<option key="0">Category</option>
										<option key="1">Category 1</option>
										<option key="2">Category 2</option>
										<option key="3">Category 3</option>
									</select>
								</div>
							</div>
							<div className="col-lg-12">
								<input type="text" name="skills" placeholder="Skills"/>
							</div>
							<div className="col-lg-12">
								<div className="price-sec">
									<div className="price-br">
										<input type="text" name="price1" placeholder="Price"/>
										<i className="la la-dollar"></i>
									</div>
									<span>To</span>
									<div className="price-br">
										<input type="text" name="price1" placeholder="Price"/>
										<i className="la la-dollar"></i>
									</div>
								</div>
							</div>
							<div className="col-lg-12">
								<textarea name="description" placeholder="Description"></textarea>
							</div>
							<div className="col-lg-12">
								<ul>
									<li><button className="active" type="submit" value="post">Post</button></li>
									<li><a href="#" title="">Cancel</a></li>
								</ul>
							</div>
						</div>
					</form>
				</div>{/*<!-- -->*/}
				<a href="#" title=""><i className="la la-times-circle-o"></i></a>
			</div>{/*<!-- -->*/}
		</div>{/*<!-- -->*/}

		<div className="post-popup job_post">
			<div className="post-project">
				<h3>Post a job</h3>
				<div className="post-project-fields">
					<form>
						<div className="row">
							<div className="col-lg-12">
								<input type="text" name="title" placeholder="Title"/>
							</div>
							<div className="col-lg-12">
								<div className="inp-field">
									<select>
										<option key="0">Category</option>
										<option key="1">Category 1</option>
										<option key="2">Category 2</option>
										<option key="3">Category 3</option>
									</select>
								</div>
							</div>
							<div className="col-lg-12">
								<input type="text" name="skills" placeholder="Skills"/>
							</div>
							<div className="col-lg-6">
								<div className="price-br">
									<input type="text" name="price1" placeholder="Price"/>
									<i className="la la-dollar"></i>
								</div>
							</div>
							<div className="col-lg-6">
								<div className="inp-field">
									<select>
										<option key="0">Full Time</option>
										<option key="1">Half time</option>
									</select>
								</div>
							</div>
							<div className="col-lg-12">
								<textarea name="description" placeholder="Description"></textarea>
							</div>
							<div className="col-lg-12">
								<ul>
									<li><button className="active" type="submit" value="post">Post</button></li>
									<li><a href="#" title="">Cancel</a></li>
								</ul>
							</div>
						</div>
					</form>
				</div>{/*<!-- -->*/}
				<a href="#" title=""><i className="la la-times-circle-o"></i></a>
			</div>{/*<!-- -->*/}
		</div>{/*<!-- -->*/}


	</div>{/*<!-- -->*/}

        </>
    )
}

export default Jobs;