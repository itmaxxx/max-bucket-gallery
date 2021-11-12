import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthSuccess } from './components/Auth/AuthSuccess';
import LoginPage from './pages/LoginPage/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/types';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import { userLoginWithJwt } from './store/actions/user';

export const App = () => {
  const dispatch = useDispatch();
  const isLogined: boolean = useSelector((state: RootState) => {
    return state.user.isLogined || false;
  });

  useEffect(() => {
    const jwt = localStorage.getItem('token');

    if (jwt && jwt.length) {
      dispatch(userLoginWithJwt(jwt));
    }
  }, []);

  return (
    <Routes>
      <Route path="/auth/success" element={<AuthSuccess />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route
        path="*"
        element={
          isLogined ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/auth/login" />
          )
        }
      />
    </Routes>
  );
};

export default App;
