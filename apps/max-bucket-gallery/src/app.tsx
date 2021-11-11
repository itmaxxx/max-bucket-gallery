import React from 'react';
import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { AuthSuccess } from './components/Auth/AuthSuccess';

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Container>
            <a href={`${process.env.NX_BACKEND_URL}/api/auth/google`}>
              Sign in with google
            </a>
          </Container>
        }
      />
      <Route path="/auth/success" element={<AuthSuccess />} />
    </Routes>
  );
};

export default App;
