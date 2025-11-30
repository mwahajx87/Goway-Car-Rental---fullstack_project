import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
// Pages import
import Home from './pages/Home';
import Car from './pages/Cars';
import MyBooking from './pages/MyBookings';
import Footer from './components/Footer';
import CarDetails from './pages/CarDetail';
import Dashboard from './pages/Owner/Dashboard';
import AddCar from './pages/Owner/AddCar';
import ManageCars from './pages/Owner/ManageCars';
import ManageBookings from './pages/Owner/ManageBookings';
import Layout from './pages/Owner/Layout';
import Login from './components/Login'
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import About_us from './pages/About_us';

const App = () => {
  const { showLogin } = useAppContext();
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  return (
    <>
      <Toaster />
      {showLogin && <Login  />}
      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Car />} />
        <Route path='/about-us' element={<About_us />} />
        <Route path='/my-bookings' element={<MyBooking />} />
        <Route path='owner' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-cars' element={<ManageCars />} />
          <Route path='manage-bookings' element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
