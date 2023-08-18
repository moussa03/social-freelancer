import 'font-awesome/css/font-awesome.min.css';
// import {faCirclesOverlap} from "@fortawesome/free-solid-svg-icons";
import {faLifeRing} from "@fortawesome/free-solid-svg-icons";
// import { faDiagramVenn } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Login=({email,pass,login,loading,Erors,message})=>{
   
    return (<>
    <div class="sign_in_sec current" id="tab-1">
									{message && console.log(message)}
									<h3>Sign in</h3>
									
									<form>
										<div class="row">
											<div class="col-lg-12 no-pdd">
												<div class="sn-field">
												{/*  */}
													<input className={` ${ Erors && Erors.email ? "input_eror" : "input_succes"}`} ref={email} type="text" name="username" placeholder="Email"/>
													
													<i class="fa fa-envelope"></i>
													
												</div>
												{Erors && Erors.email  ? (
													message=""
													) : (
														<p></p>
												)}
												<div className='error-message'>
														{Erors && Erors.email}
												</div>
											</div>
											<div class="col-lg-12 no-pdd">
												<div class="sn-field">
													<input className={` ${ Erors && Erors.password ? "input_eror" : "input_succes"}`} ref={pass} type="password" name="password" placeholder="Password"/>
													<i class="fa fa-unlock-alt"></i>
													

												</div>
												<div className='error-message'>
														{Erors && Erors.password}
												</div>

												<div className='error-message'>
													   
												{Erors && Erors.password  ? (
													message=""
													) : (
														<p></p>
												)}
												</div>
												<div className='error-message'>
												{message && message}
												</div>
											</div>
											<div class="col-lg-12 no-pdd">
												<div class="checky-sec">
													<div class="fgt-sec">
														<input type="checkbox" name="cc" id="c1"/>
														<label htmlFor="c1">
															<span></span>
														</label>
														<small>Remember me</small>
														{ loading==true && (
																<p> 
														{/* <FontAwesomeIcon icon={faEllipsis} beatFade size='2xl' style={{ color:"#e44d3a" }}/> */}
														<FontAwesomeIcon icon={faLifeRing} spin size='2xl' style={{color:"#e44d3a"}}/>																														</p>
															)}
													</div>
													<a href="#" title="">Forgot Password?</a>
												</div>
											</div>
											<div class="col-lg-12 no-pdd">
												<button type="submit" value="submit" onClick={login}>Sign in </button>
											</div>
										</div>
									</form>
									<div class="login-resources">
										<h4>Login Via Social Account</h4>
										<ul>
											<li><a href="#" title="" class="fb"><i class="fa fa-facebook"></i>Login Via Facebook</a></li>
											<li><a href="#" title="" class="tw"><i class="fa fa-twitter"></i>Login Via Twitter</a></li>
										</ul>
									</div>
</div>
          </>)
}

export default Login