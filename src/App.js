
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HouseValuePredictor from './HouseValuePredictor';
import Login from './user/login';
import UserRegister from './user/userRegister';
import MyPredictions from './user/myPredictions';
import AllPredictions from './admin/allPredictions';
import AllUsers from './admin/allUsers';
import AdminDashboard from './admin/adminDashboard';
import Home from './user/home';



function App() {
    return (
        
        <Router>
         <Routes>
           <Route path="/predict" element={<HouseValuePredictor />} />
           <Route path="/register" element={<UserRegister />} />
           <Route path="/" element={<Login />} />
           <Route path="/mypredictions" element={<MyPredictions />} />
           <Route path="/allpredictions" element={<AllPredictions />} />
           <Route path="/allusers" element={<AllUsers />} />
           <Route path="/admindashboard" element={<AdminDashboard />} />
           <Route path="/home" element={<Home />} />
         </Routes>
       </Router>
    );
}

export default App;
