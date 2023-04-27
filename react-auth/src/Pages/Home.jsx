import { createRef, useEffect, useState } from "react";
import axios from "axios";
import AxiosClients from "../Utils/AxiosClients";
import { Outlet } from "react-router-dom";
import style from '../assets/css/style.css'
import instance from "../Utils/AxiosClients";
import { useRef } from "react";
import Login from "../Components/Login"
import Signup from "../Components/Signup";
import  "../assets/css/animate.css";
import 'bootstrap/dist/css/bootstrap.css';
import "../assets/css/line-awesome.css";
import "../assets/css/line-awesome-font-awesome.css";
import "../assets/css/font-awesome.min.css";
import "../assets/css/lib/slick.css";
import "../assets/css/lib/slick-theme.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import { usestateContext } from "../Context/Context";




// 

const  Home=()=> {
  
  const [currentForm, setCurrentForm] = useState(true);
  // const [toggle, setToggle] = React.useState(true)
  const [loginpage,setlogin]=useState(true);
  const [signuppage,setsignup]=useState(false)
 
  const changelogin=()=>{
    if(loginpage===false){
      setlogin(true);
      setsignup(false)
    }
    // setCurrentForm(page); 
    
  }

const changesignup=()=>{
  if(signuppage===false){
    setlogin(false);
    setsignup(true)
  }
}

    const nameRef = createRef()
    const emailRef = createRef()
    const passwordRef = createRef()
    const password_confirmation=createRef();
    const Emailref=createRef();
    const PassRef=createRef();
    const ville_ref=createRef();
    const profil=createRef();
    const profil_image=createRef();
    const {token,Settoken,_SetToken,currentUser,setcurrentUser}=usestateContext();
    const [Erors, Seterrors]=useState(null);
    const [message, setMessage] = useState(null)

    //  const changefront=()=>{
    //     const container=document.getElementById('container');
    //     container.classList.toggle('right-panel-active');
    //  }
    
   
     
    const signup = ev => {
     
      ev.preventDefault()
      const payload = {
        Name: nameRef.current.value,
        Email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: password_confirmation.current.value,
        ville_id:ville_ref.current.value,
        profil:profil.current.value,
        // profil_image:profil_image.current.value
      }
      AxiosClients.post('/signup', [payload,picture])
      .then(({data}) => {
        
        setcurrentUser(data.user);
        Settoken(data.token);
      })
      
      .catch((err) => {
         const response = err.response;
        if (response && response.status === 422) {
            Seterrors(response.data.errors);
        }
        // console.log(Erors.Name);
       
      })
    
    }
   
    
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
  
  return( 
  <>
  <body class="sign-in">
	
	<div class="wrapper">
		<div class="sign-in-page">
			<div class="signin-popup">
				<div class="signin-pop">
					<div class="row">
						<div class="col-lg-6">
							<div class="cmp-info">
								<div class="cm-logo">
									<img src="images/cm-logo.png" alt=""/>
									<p>Workwise,  is a global freelancing platform and social networking where businesses and independent professionals connect and collaborate remotely</p>
								</div>
								<img src="images/cm-main-img.png" alt=""/>			
							</div>
						</div>
						<div class="col-lg-6">
							<div class="login-sec">
								<ul class="sign-control" id="sign-control">
									<li id="tab-1" className={`banner ${loginpage ==true? "current" : ""}`} ><a href="#" title="" onClick={() => changelogin()}>Sign in</a></li>				
									<li id="tab-2" className={`banner ${signuppage===true ? "current" : ""}`} ><a href="#" title="" onClick={() => changesignup()}>Sign up</a></li>				
								</ul>			
                
                {loginpage === true ? <Login  email={Emailref} pass={PassRef} login={login}/> : <Signup  name={nameRef} email={emailRef} password={passwordRef} password_confirmation={password_confirmation} ville_id={ville_ref} profil={profil} picture={picture} signup={signup}/>}
                {/* <Signup/> */}
								
							</div>
						</div>
					</div>		
				</div>
			</div>
			<div class="footy-sec">
				<div class="container">profil
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
					<p><img src="images/copy-icon.png" alt=""/>Copyright 2018</p>
				</div>
			</div>
      {/* <!--footy-sec end--> */}
		</div>
    {/* <!--sign-in-page end--> */}


	</div>
  {/* <!--theme-layout end--> */}


  
{/* <script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/popper.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>
<script type="text/javascript" src="lib/slick/slick.min.js"></script>
<script type="text/javascript" src="js/script.js"></script> */}
</body>
  </>
  )
 
  }
  


export default Home;