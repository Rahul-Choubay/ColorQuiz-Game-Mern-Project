import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ClickCounter from './ClickCounter';
import CustomerServicePage from './CustomerServicePage';
import MyAccount from './MyAccount';

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gamepage" element={<ClickCounter />} />
      <Route path="/profile" element={<MyAccount />} />
      <Route path="/coustomer" element={<CustomerServicePage />} />
    </Routes>
  );
};

export default MyRoute;
