import React from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import LoginForm from './LoginForm';
import SignInWithGoogle from '../Buttons/SignInWithGoogle';

const LoginFormContainer = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <LoginForm />
      <Grid item xs={12}>
        <Button fullWidth disableElevation variant="text">
          Don't have an account? Sign Up
        </Button>
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
