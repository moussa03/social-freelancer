import React from "react";
import ReactDOM from 'react-dom/client'
import ContextProvider from './Context/Context.jsx'
import {RouterProvider} from "react-router-dom";
import router from "./Utils/router.jsx";
import Navbar from "./Components/Navbar.jsx";
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   <ContextProvider>
   <RouterProvider router={router} />
  </ContextProvider>

  </React.StrictMode>
);
