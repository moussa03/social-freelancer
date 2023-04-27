
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'font-awesome/css/font-awesome.min.css';
  const login=(e)=>{
     e.preventDefault();
     const payload={
        email:Emailref.current.value,
        password:PassRef.current.value
     }

     AxiosClients.post('/login', payload)
     .then(({data}) => {
    //    setcurrentUser(data.user);
        //   console.log(data.token);
          Settoken(data.token);        
     })
     
     .catch((err) => {
        const response = err.response;
       if (response && response.status === 422) {
        console.log(response);
        setMessage(response.data.message);
       }
       // console.log(Erors.Name);
      
     })
	

  }

const Login=({email,pass,login})=>{
    return (<>
    <div class="sign_in_sec current" id="tab-1">
									
									<h3>Sign in</h3>
									<form>
										<div class="row">
											<div class="col-lg-12 no-pdd">
												<div class="sn-field">
													<input ref={email} type="text" name="username" placeholder="Email"/>
													<i class="fa fa-envelope"></i>
												</div>
											</div>
											<div class="col-lg-12 no-pdd">
												<div class="sn-field">
													<input ref={pass} type="password" name="password" placeholder="Password"/>
													<i class="fa fa-unlock-alt"></i>
													

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
													</div>
													<a href="#" title="">Forgot Password?</a>
												</div>
											</div>
											<div class="col-lg-12 no-pdd">
												<button type="submit" value="submit" onClick={login}>Sign in</button>
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