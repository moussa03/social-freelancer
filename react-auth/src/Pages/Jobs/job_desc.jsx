const job_descp =()=>{
    return (
    <>
    	<div class="job_descp">
																<h3>
																	{item.job_title}
																	{item.project_title}
																</h3>
																<ul class="job-dt">
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
    </>
    )
}

export default job_descp