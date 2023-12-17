import {
        BrowserRouter as Routers,
        Route,
        Routes,
        Navigate

} from `react-router-dom`

import React, { useState } from 'react';


import loginPage from `../pages/Login`
import HomePage from `page`
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import {AuthProvider} from "../components/contexts/auth"


const AppRoutes = () =>{



    return(
        <Router>
            <AuthProvider>
            <Routes>
                <Route exact path = "/login" elemnt ={<loginPage/>}/>
                <Route exact path = "/login" elemnt ={<HomePage/>}/>
                <ToastContainer />
            </Routes>
            </AuthProvider>
        </Router>
    )
}


export default AppRoutes