import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthSuccess } from './components/Auth/AuthSuccess';
import LoginPage from './pages/LoginPage/LoginPage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/types';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import { userLoginWithJwt } from './store/actions/user';
import { CssBaseline, Typography } from '@mui/material';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import customTheme from './theme';
import NavBar from './components/NavBar/NavBar';

export const App = () => {
  const dispatch = useDispatch();
  const loggedIn: boolean = useSelector((state: RootState) => {
    return state.user.loggedIn || false;
  });
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const theme = React.useMemo(
    () =>
      createTheme({
        ...customTheme,
        palette: {
          ...customTheme.palette,
          mode,
        },
      }),
    [mode]
  );

  useEffect(() => {
    const jwt = localStorage.getItem('token');

    if (jwt && jwt.length) {
      dispatch(userLoginWithJwt(jwt));
    }
  }, []);

  if (!loggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route
            path="/auth/fail"
            element={<Typography>Failed to login</Typography>}
          />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/sign-up" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/auth/login" />} />
        </Routes>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
