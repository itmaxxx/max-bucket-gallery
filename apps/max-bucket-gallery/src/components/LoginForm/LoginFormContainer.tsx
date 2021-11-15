import React from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignInWithGoogle from '../Buttons/SignInWithGoogle';
import { userLogin } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';

const LoginFormContainer = () => {
  const dispatch = useDispatch();
  const loggedIn: boolean = useSelector((state: RootState) => {
    return state.user.loggedIn || false;
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      email: form.get('email')?.toString() || '',
      password: form.get('password')?.toString() || '',
    };

    dispatch(userLogin(data.email, data.password));
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {loggedIn && <Navigate to="/dashboard" />}
      <Grid
        item
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <LoginForm />
      </Grid>
      <Grid item xs={12}>
        <Link to={'/auth/sign-up'} style={{ textDecoration: 'none' }}>
          <Button fullWidth disableElevation variant="text">
            Don't have an account? Register
          </Button>
        </Link>
        <Divider
          orientation="horizontal"
          sx={{
            margin: '20px 0',
            color: 'grey !important',
            fontWeight: '700',
            fontSize: '14px',
          }}
        >
          Or
        </Divider>
        <SignInWithGoogle />
      </Grid>
    </Box>
  );
};

export default LoginFormContainer;
