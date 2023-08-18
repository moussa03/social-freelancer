import {createBrowserRouter, Navigate} from "react-router-dom";
import News_feed from '../Pages/News_feed'
import Home from '../Pages/Home'
import Login from "../Components/Login"
import Update_user from '../Pages/Update_user'
import GuestLayout from '../Components/GuestLayout'
import DefaulLayout from '../Components/DefaulLayout'
import Tags from "../Pages/Tags"
import Update_job from "../Pages/Jobs/Update_job";
import Delete_job from "../Pages/Jobs/Delete_job";
import Update_project from "../Pages/Projects/Update_project"
import Projects  from "../Pages/Projects/Projects";
import Jobs from "../Pages/Jobs/Jobs";
import SendMail from "../Pages/Inbox/SendMail";
import Inbox from "../Pages/Inbox/Inbox";
import Singlemail from "../Pages/Inbox/singlemail";
// import Singlemail from "../Pages/Inbox/Singlemail";
import Profiles from "../Pages/Profiles/Profiles";

const router = createBrowserRouter([
    {
      path: '/',
      element: <DefaulLayout/>,
      children: [
        // {
        //   path: '/',
        //   element: <Navigate to="/users"/>
        // },
        
        {
          path: '/news_feed',
          element: <News_feed/>
        },
        {
          path: '/profile_setting/:user_id',
          element: <Update_user/>
        },

        {
          path:'/single_job/:job_id',
          element:<Update_job/>

        },
        {
          path:'/single_project/:Project_id',
          element:<Update_project/>

        },
        
        {
          path:'/delete_job/:job_id',
          element:<Delete_job/>

        },
        {
          path:'/projects',
          element:<Projects/>

        },
        {
          path:'/jobs',
          element:<Jobs/>

        },
        {
          path:'/inbox',
          element:<Inbox/>

        },
       
        {
          path:'/single_job_mail/:job_id/:user_id',
          element:<SendMail/>

        },
        {
          path:'/single_project_mail/:project_id',
          element:<SendMail/>

        },
        {
          path:'/singlemail/:mail',
          element:<Singlemail/>

        },
        {
          path:'/profiles',
          element:<Profiles/>

        }

        
      ]
    },
    {
      path: '/',
      element: <GuestLayout/>,
      children: [
        {
          path: '/login',
          element: <Login/>
        },
        {
          path: '/tags',
          element: <Tags/>
        },
      
        {
          path: '/home',
          element: <Home/>
        },
        // {
        //   path: '/signup',
        //   element: <Signup/>
        // }
      ]
    },
    // {
    //   path: "*",
    //   element: <NotFound/>
    // }
  ])
  

export default router;