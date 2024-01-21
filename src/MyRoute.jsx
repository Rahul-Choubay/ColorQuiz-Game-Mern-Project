import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import ClickCounter from './ClickCounter';

const MyRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gamepage" element={<ClickCounter />} />
    </Routes>
  );
};

export default MyRoute;
