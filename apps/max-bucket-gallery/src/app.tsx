import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthSuccess } from './components/Auth/AuthSuccess';
import LoginPage from './pages/LoginPage/LoginPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/auth/success" element={<AuthSuccess />} />
    </Routes>
  );
};

export default App;
