import React from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import RegisterForm from './RegisterForm';
import SignInWithGoogle from '../Buttons/SignInWithGoogle';
import { Link } from 'react-router-dom';

const RegisterFormContainer = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      fullName: data.get('fullName'),
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <RegisterForm />
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
