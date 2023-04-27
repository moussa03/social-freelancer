import {createBrowserRouter, Navigate} from "react-router-dom";
import { Children } from 'react';
import News_feed from '../Pages/News_feed'
import Users from '../Pages/Users'
import Home from '../Pages/Home'
import Login from "../Components/Login"
import Signup from "../Components/Signup"
import Update_user from '../Pages/Update_user'
// import Signup from '../Pages/Signup'
import GuestLayout from '../Components/GuestLayout'
import DefaulLayout from '../Components/DefaulLayout'
import { useParams } from "react-router-dom";
import Account_Setting from "../Components/Account_Settings";
import Tags from "../Pages/Tags"
import Update_job from "../Pages/Jobs/Update_job";
//  import SingleInventoryChanger from "../Pages/SingleInventoryChanger"

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

        }
        
        // {
        //   path: '/users',
        //   element: <Users/>
        // },
        // {
        //   path: '/users/new',
        //   element: <UserForm key="userCreate" />
        // },
        // {
        //   path: '/users/:id',
        //   element: <UserForm key="userUpdate" />
        // }
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
        // {
        //   path: '/items',
        //   element: <SingleInventoryChanger/>
        // },
        // {
        //   path: '/signup',
        //   element: <Signup/>
        // },
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