// import { useState } from 'react';
import 'rsuite/dist/rsuite.min.css';

// import { Container, Content, Divider, Header, Panel } from 'rsuite';

// import CustomNavbar from "./component/navbar";
// import CustomSelectPicker from "./component/selectPicker";
// import UserTable from "./component/userTable";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import User from './pages/User.js';
import Membership from './pages/Membership.js';
import Gym from './pages/Gym.js';
import Subscription from './pages/Subscription.js';
import Class from './pages/Class.js';
import ClassEnroll from './pages/ClassEnroll.js';
import Login from './pages/Login.js';
import AdminLogin from './pages/AdminLogin.js';
import CheckIn from './pages/Checkin.js';
import Checkout from './pages/Checkout.js';
import ActivityPage from './pages/ActivityPage.js';
import AdminDashBoard from './pages/AdminDashBoard.js';
import UserDashBoard from './pages/UserDashBoard.js';

const App = () => {
  // const [activeKey, setActiveKey] = useState(null);

  return (
    <>
     <BrowserRouter>
      <Routes>
        {/* Employee Routes */}
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/checkout" element={<Checkout />} />
        


        {/* Admin Routes */}
        <Route path="/user" element={<User />} />
        <Route path="/gym" element={<Gym />} />
        <Route path="/class" element={<Class />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Memerb routes */}
        <Route path="/class-enroll" element={<ClassEnroll />} />
        <Route path="/log-activity" element={<ActivityPage />} />
        {/* <Route path="/user-dashboard" element={<UserDashBoard />} /> */}
        

        <Route path="/Login" element={<Login />} />
        

        <Route path="/admin-dashboard" element={<AdminDashBoard />} />
        <Route path="/" element={<Home />} />


      </Routes>
    </BrowserRouter>
    </>
  );
};




export default App;
