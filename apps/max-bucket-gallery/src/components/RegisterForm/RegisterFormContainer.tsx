import React from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import RegisterForm from './RegisterForm';
import SignInWithGoogle from '../Buttons/SignInWithGoogle';
import { Link, Navigate } from 'react-router-dom';
import { userRegister } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';

const RegisterFormContainer = () => {
  const dispatch = useDispatch();
  const loggedIn: boolean = useSelector((state: RootState) => {
    return state.user.loggedIn || false;
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = {
      fullName: form.get('fullName')?.toString() || '',
      email: form.get('email')?.toString() || '',
      password: form.get('password')?.toString() || '',
    };

    dispatch(userRegister(data.fullName, data.email, data.password));
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {loggedIn && <Navigate to="/dashboard" />}
      <Grid
        item
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <RegisterForm />
      </Grid>
      <Grid item xs={12}>
        <Link to={'/auth/login'} style={{ textDecoration: 'none' }}>
          <Button fullWidth disableElevation variant="text">
            Already have an account? Login
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

export default RegisterFormContainer;
