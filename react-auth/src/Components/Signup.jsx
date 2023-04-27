import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
const Signup=({name,email,password,password_confirmation,ville_id,signup,profil,picture})=>{
	const [data, setData] = useState([] );
	const [checked,setchked]=useState(false);
	const [image, setImage] = useState(null);
	function handleFileChange(event) {
		setImage(event.target.files[0]);
	}
	const formData = new FormData();
    formData.append('profile_image', image);
	
	//  checkedValue==checked;
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
	return (
	
	<div className="sign_in_sec" id="tab-2">
									
									<div class="dff-tab current" id="tab-3">
										<form enctype="multipart/form-data"
>
											<div class="row">
												<div class="col-lg-12 no-pdd">
													<div class="sn-field">
														<input ref={name} type="text" name="name" placeholder="Nom complét"/>
														<i class="fa fa-user"></i>
													</div>
												</div>
												<div class="col-lg-12 no-pdd">
													<div class="sn-field">
														<input ref={email} type="text" name="email" placeholder="Email"/>
														<i class="fa fa-envelope"></i>
													</div>
												</div>

												<div class="col-lg-12 no-pdd">
													<div class="sn-field">
													<select id="cars" ref={ville_id}>
													{data.map(item => (
														<option value={item.id}  >
															<li key={item.id}>
															<a >{item.City_Name}</a>
														     </li>
														</option>
														
														))}
														
													</select>
														<i class="fa fa-flag"></i>
													</div>
												</div>
												<div class="col-lg-12 no-pdd">
													<div class="sn-field">
													<select id="cars" ref={profil}>
													<option value="" selected disabled hidden>Select a profil</option>
													 <option value="Freelancer">Freelancer</option>
													<option value="Client">Client</option>
													 
								
													</select>
													<i class="fa fa-address-card"></i>													</div>
												</div>
												<div class="col-lg-12 no-pdd">
													<div class="sn-field">
													<input   name="profile_image" placeholder="Profil Picture" type='file' onChange={handleFileChange}/>

													<i class="fa fa-image"></i>													</div>
												</div>
												<div class="col-lg-12 no-pdd">
													<div class="sn-field">
														<input ref={password} type="password" name="password" placeholder="Mot de passe"/>
														<i class="fa fa-lock"></i>
													</div>
												</div>
												<div class="col-lg-12 no-pdd">
													<div class="sn-field">
														<input ref={password_confirmation} type="password" name="repeat-password" placeholder="Confirmation de mot de passe"/>
														<i class="fa fa-lock"></i>
													</div>
												</div>
												<div class="col-lg-12 no-pdd">
													<div class="checky-sec st2">
														<div class="fgt-sec">
															<input value={checked} type="checkbox" name="accept" id="c2" onChange={() => setchked(!checked)}/>
															<label htmlFor="c2">
																<span></span>
															</label>
															<small>Yes, I understand and agree to the workwise Terms & Conditions.</small>
														</div>
													</div>
												</div>
												<div class="col-lg-12 no-pdd">
												<div>
														{
														checked==true &&
														<button type="submit" value="submit"  onClick={signup} id="disable" >Get Started</button>
														}
														</div>
													
												</div>
											</div>
										</form>
									</div>
									
	</div>	
	     )
}
export default Signup