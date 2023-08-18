
import { createRef, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import AxiosClients from "../../Utils/AxiosClients";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


import { useRef } from "react";
const Update_job=()=>{
	const {Project_id}=useParams();
	const [job,setjob]=useState();
    const project_title=createRef();
	const project_type=createRef();
	const category=createRef();
	const min_price=createRef();
    const max_price=createRef();
	const project_description=createRef();
	const [Project_errors,SetProjectErors]=useState();

	const navigate = useNavigate();
	const goBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }
	useEffect(() => {
	AxiosClients.get(`projects/${Project_id}`)
	.then(response => {
		const job = response.data
		console.log(job);
		setjob(job);
	})
	.catch(error => {
		console.log(error);
	});
  }, []); 
	
  const cancel=(e)=>{
	e.preventDefault();
	navigate("/news_feed");

 }
	const update=(e)=>{
		e.preventDefault();
		const payload={
			Project_Title:project_title.current.value,
			project_category:category.current.value,
			Min_Price:min_price.current.value,
            Max_Price:max_price.current.value,
			project_Description:project_description.current.value,
			project_type:project_type.current.value
		}
		
		AxiosClients.put(`/projects/${Project_id}`,payload).then(({data})=>{
			Swal.fire({
				title: 'Job updated Successfully',
				// text: 'Do you want to continue',
				icon: 'success',
				confirmButtonText: 'Ok'
			  })   
			  SetProjectErors('');
			  navigate("/news_feed");

		})
		
		.catch((err) => {

			const response = err.response;
		    if (response && response.status === 422) {
				SetProjectErors(response.data.errors);
				console.log()
		   }
		 });
		  

	}
	
return (
<>
    
<div class="wrapper">
		<section class="forum-sec">
			<div class="container">
				{/* <div class="forum-links">
					<ul>
						<li class="active"><a href="#" title="">Latest</a></li>
						<li><a href="#" title="">Unanswered</a></li>
						<li><a href="#" title="">Treading</a></li>
						<li><a href="#" title="">Popular This Week</a></li>
						<li><a href="#" title="">Popular of Month</a></li>
					</ul>
				</div> */}
				{/*<!--forum-links end--/>*/}
				<div class="forum-links-btn">
					<a href="#" title=""><i class="fa fa-bars"></i></a>
				</div>
			</div>
		</section>

		<section class="forum-page">
			<div class="container">
				<div class="forum-questions-sec">
					<div class="row">
						<div class="col-lg-8">
							<div class="forum-post-view">
								<div class="usr-question">
									<div class="usr_img">
										<img src="http://via.placeholder.com/60x60" alt=""/> 
									</div>
									<div class="usr_quest">
										<h3>{job && job[0].post_title}</h3>
                                          
										<span><i class="fa fa-clock-o"></i>3 min ago</span>
										<ul class="react-links">
											<li><a href="#" title=""><i class="fa fa-heart"></i> Vote 150</a></li>
											<li><a href="#" title=""><i class="fa fa-share-alt"></i> Share</a></li>
										</ul>
										{/* <ul class="quest-tags">
										
										{job &&  Object.keys(job[1]).map(key => (
										<li key={key}> <a href="#">{job[1][key].tag_name}</a> </li> 
										))}
										</ul> */}
										<p> {job && job[0].project_description} </p>
										<div class="post_comment_sec">
					<form onSubmit={update}>
						<div class="row">
							<div class="col-lg-12">
								<input ref={project_title} className={`${Project_errors && Project_errors.Project_Title ? "input_eror" : ""}`} type="text" name="title" placeholder="Title" defaultValue={job && job[0].project_title}/>
							</div>
							<div className='error-message'>
										{ Project_errors &&
										Project_errors.Project_Title
										}
							</div>
							<div class="col-lg-12">
								<div class="inp-field">
									<select ref={category} className={`${Project_errors && Project_errors.project_category ? "input_eror" : ""}`}>
									<option value=""  disabled selected >Select a categorie</option>
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
										{ Project_errors && 
										Project_errors.project_category
										}
									</div>
								}
							</div>

							
							<div class="col-lg-12">
								<div class="price-sec">
									<div class="price-br p-update" >
										<input ref={min_price} type="text" className={`${Project_errors && Project_errors.Min_Price ? "input_eror" : ""}`} name="price1" placeholder="Price" defaultValue={job && job[0].min_price}/>
										<i class="la la-dollar"></i>
									</div>
									
									<div className='error-message'>
									{Project_errors && 
									Project_errors.Min_Price}
									</div>
								
                                    <div class="price-br">
										<input ref={max_price} className={`${Project_errors && Project_errors.Max_Price ? "input_eror" : ""}`} type="text" name="price1" placeholder="Price" defaultValue={job && job[0].max_price}/>
										<i class="la la-dollar"></i>
									</div>
									<div className='error-message'>
										{Project_errors &&  Project_errors.Max_Price}
									</div>

									
								</div>
							</div>
							<div class="col-lg-12">
								<div class="inp-field">
									<select ref={project_type} className={`${Project_errors && Project_errors.project_type ? "input_eror" : ""}`}>
									<option value=""  disabled  selected>Employment Contract</option>
									   <option key="1">Full time</option>
									   <option key="2">Half time</option>
										
									</select>
								</div>
								<div className='error-message'>
										{Project_errors &&  Project_errors.project_type}
								</div>
							</div>
							<div class="col-lg-12">
								<textarea ref={project_description} className={`${Project_errors && Project_errors.project_Description ? "input_eror" : ""}`} name="description" placeholder="Description" defaultValue={job && job[0].project_description}></textarea>
							</div>
							<div className='error-message'>
										{Project_errors &&  Project_errors.project_Description}
							</div>
							
							<div class="col-lg-12">
								<ul className="update">
									<li><button class="active" type="submit" value="post" onClick={update}>Save and Exit</button></li>
									<li><button class="back" type="submit" value="post" onClick={cancel}> Cancel  </button></li>
									
								</ul>
							</div>
																	
						</div>
					</form>
					</div>
									</div>{/*<!--usr_quest end--/>*/}
								</div>{/*<!--usr-question end--/>*/}
							</div>{/*<!--forum-post-view end--/>*/}
							<div class="post-comment-box">
								<h3>03 Comments</h3>
								<div class="user-poster">
									<div class="usr-post-img">
										<img src="http://via.placeholder.com/40x40" alt=""/> 
									</div>
									<div class="post_comment_sec">
										<form>
											<textarea placeholder="Your Answer"></textarea>
											<button type="submit">Post Answer</button>
										</form>
									</div>{/*<!--post_comment_sec end--/>*/}
								</div>{/*<!--user-poster end--/>*/}
							</div>{/*<!--post-comment-box end--/>*/}
							<div class="next-prev">
								<a href="#" title="" class="fl-left">Preview</a>
								<a href="#" title="" class="fl-right">Next</a>
							</div>{/*<!--next-prev end--/>*/}
						</div>
						<div class="col-lg-4">
							<div class="widget widget-feat">
								<ul>
									<li>
										<i class="fa fa-heart"></i>
										<span>1185</span>
									</li>
									<li>
										<i class="fa fa-comment"></i>
										<span>1165</span>
									</li>
									<li>
										<i class="fa fa-share-alt"></i>
										<span>1120</span>
									</li>
									<li>
										<i class="fa fa-eye"></i>
										<span>1009</span>
									</li>
								</ul>
							</div>{/*<!--widget-feat end--/>*/}
							<div class="widget widget-user">
								<h3 class="title-wd">Top User of the Week</h3>
								<ul>
									<li>
										<div class="usr-msg-details">
											<div class="usr-ms-img">
												<img src="http://via.placeholder.com/50x50" alt=""/> 
											</div>
											<div class="usr-mg-info">
												<h3>Jessica William</h3>
												<p>Graphic Designer </p>
											</div>{/*<!--usr-mg-info end--/>*/}
										</div>
										<span><img src="images/price1.png" alt=""/> 1185</span>
									</li>
									<li>
										<div class="usr-msg-details">
											<div class="usr-ms-img">
												<img src="http://via.placeholder.com/50x50" alt=""/> 
											</div>
											<div class="usr-mg-info">
												<h3>John Doe</h3>
												<p>PHP Developer</p>
											</div>{/*<!--usr-mg-info end--/>*/}
										</div>
										<span><img src="images/price2.png" alt=""/> 1165</span>
									</li>
									<li>
										<div class="usr-msg-details">
											<div class="usr-ms-img">
												<img src="http://via.placeholder.com/50x50" alt=""/> 
											</div>
											<div class="usr-mg-info">
												<h3>Poonam</h3>
												<p>Wordpress Developer </p>
											</div>{/*<!--usr-mg-info end--/>*/}
										</div>
										<span><img src="images/price3.png" alt=""/> 1120</span>
									</li>
									<li>
										<div class="usr-msg-details">
											<div class="usr-ms-img">
												<img src="http://via.placeholder.com/50x50" alt=""/> 
											</div>
											<div class="usr-mg-info">
												<h3>Bill Gates</h3>
												<p>C & C++ Developer </p>
											</div>{/*<!--usr-mg-info end--/>*/}
										</div>
										<span><img src="images/price4.png" alt=""/> 1009</span>
									</li>
								</ul>
							</div>{/*<!--widget-user end--/>*/}
							<div class="widget widget-adver">
								<img src="http://via.placeholder.com/370x270" alt=""/> 
							</div>{/*<!--widget-adver end--/>*/}
						</div>
					</div>
				</div>{/*<!--forum-questions-sec end--/>*/}
			</div>
		</section>{/*<!--forum-page end--/>*/}

		<footer>
			<div class="footy-sec mn no-margin">
				<div class="container">
					<ul>
						<li><a href="#" title="">Help Center</a></li>
						<li><a href="#" title="">Privacy Policy</a></li>
						<li><a href="#" title="">Community Guidelines</a></li>
						<li><a href="#" title="">Cookies Policy</a></li>
						<li><a href="#" title="">Career</a></li>
						<li><a href="#" title="">Forum</a></li>
						<li><a href="#" title="">Language</a></li>
						<li><a href="#" title="">Copyright Policy</a></li>
					</ul>
					<p><img src="images/copy-icon2.png" alt=""/> Copyright 2018</p>
					<img class="fl-rgt" src="images/logo2.png" alt=""/> 
				</div>
			</div>
		</footer>


		<div class="overview-box" id="question-box">
			<div class="overview-edit">
				<h3>Ask a Question</h3>
				<form>
					<input type="text" name="question" placeholder="Type Question Here"/>
					<input type="text" name="tags" placeholder="Tags"/>
					<textarea placeholder="Description"></textarea>
					<button type="submit" class="save">Submit</button>
					<button type="submit" class="cancel">Cancel</button>
				</form>
				<a href="#" title="" class="close-box"><i class="la la-close"></i></a>
			</div>{/*<!--overview-edit end--/>*/}
		</div>{/*<!--overview-box end--/>*/}

	</div>{/*<!--theme-layout end--/>*/}

    
       </>
	   )

}

export default Update_job