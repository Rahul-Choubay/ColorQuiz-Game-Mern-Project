import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ClickCounter from './ClickCounter';
import CustomerServicePage from './CustomerServicePage';
import MyAccount from './MyAccount';
import ProfileUpdate from './ProfileUpdate';

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gamepage" element={<ClickCounter />} />
      <Route path="/profile" element={<MyAccount />} />
      <Route path="/customer" element={<CustomerServicePage />} />
      <Route path="/edit-profile" element={<ProfileUpdate />} />
      
    </Routes>
  );
};

export default MyRoute;
