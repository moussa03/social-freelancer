import { createRef, useEffect, useState } from "react";
import AxiosClients from "../Utils/AxiosClients";
import Swal from 'sweetalert2'
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


const  Home=()=> {
  const [currentForm, setCurrentForm] = useState(true);
  // const [toggle, setToggle] = React.useState(true)
  const [loginpage,setlogin]=useState(true);
  const [signuppage,setsignup]=useState(false)
	const [loading, setLoading] = useState(false);
  const [signUploading,setLoadingsignUp]=useState(false);

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
    const profil_picture=createRef();
    const {token,Settoken,_SetToken,currentUser,setcurrentUser}=usestateContext();
    const [Erors, Seterrors]=useState(null);
 

    const [message, setMessage] = useState(null)
  
    const [image, setImage] = useState(null);
    function handleFileChange(event) {
      setImage(event.target.files[0]);
    }
      const formdata=new FormData();
      const signup = async (ev) => {
        setLoadingsignUp(true)
      ev.preventDefault()
      formdata.append('Name',nameRef.current.value);
      formdata.append('Email',emailRef.current.value);
      formdata.append('password',passwordRef.current.value);
      formdata.append('password_confirmation',password_confirmation.current.value);
      formdata.append('profil',profil.current.value);
      formdata.append('ville_id',ville_ref.current.value); 
      formdata.append("profil_picture", image);
      try {
        if(image===null ||image===undefined || image==="" ){
          Swal.fire({
            title: 'must upload image!',
            // text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Ok'
            })
       }
        // We will send formData object as a data to the API URL here.
        const response = await AxiosClients.post("signup",formdata,
        {
            headers: {"Content-Type": "multipart/form-data"},
            
        }).then((res) => {
          setLoadingsignUp(false)

            // alert("File Uploaded Successfully");
            setcurrentUser(res.data.user);
            Settoken(res.data.token); 
            }).catch((error) => {
             const res=error.response.data;
             Seterrors(res.errors);
             setLoadingsignUp(false)

             
             
        });
    } catch (error) {
        console.log(error)
    }

      
     
    
    }
   
    
  const login=(e)=>{
     e.preventDefault();
     const payload={
        email:Emailref.current.value,
        password:PassRef.current.value
     }
     setLoading(true)
     AxiosClients.post('/login', payload)
     .then(({data}) => {
      setLoading(false)
         setcurrentUser(data.user);
          Settoken(data.token);        
     })
     
     .catch((err) => {
        const response = err.response;
       if (response && response.status === 422) {
        setLoading(false)
        Seterrors(response.data.errors);
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
									<li id="tab-1" className={`banner ${loginpage ==true? "current" : ""}`} ><a href="#" title="" onClick={() => changelogin()}>Sign in </a></li>				
									<li id="tab-2" className={`banner ${signuppage===true ? "current" : ""}`} ><a href="#" title="" onClick={() => changesignup()}>Sign up</a></li>				
								</ul>			
                
                {loginpage === true ? <Login  email={Emailref} pass={PassRef} login={login} loading={loading} Erors={Erors} Seterrors={Seterrors} message={message}/> : <Signup  name={nameRef} email={emailRef} password={passwordRef} password_confirmation={password_confirmation} ville_id={ville_ref} profil={profil} handleFileChange={handleFileChange} signup={signup} Erors={Erors} Seterrors={Seterrors} signUploading={signUploading} />}
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