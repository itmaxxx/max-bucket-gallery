import React from 'react';
import { Box, Button, Divider, Grid, Link, TextField } from '@mui/material';
import Google from '../../assets/images/icons/social-google.svg';
import LoginForm from './LoginForm';

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
        <Button type="submit" fullWidth disableElevation variant="text">
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
        <Link
          href={process.env.NX_BACKEND_URL + '/api/auth/google'}
          style={{ textDecoration: 'none' }}
        >
          <Button
            disableElevation
            fullWidth
            size="large"
            variant="outlined"
            sx={{
              color: 'grey.700',
              backgroundColor: (theme) => theme.palette.grey[50],
              borderColor: (theme) => theme.palette.grey[100],
              mb: '10px',
            }}
          >
            <Box
              sx={{
                mr: { xs: 1, sm: 2, width: 20 },
                display: 'flex',
              }}
            >
              <img src={Google} alt="Google" width={16} height={16} />
            </Box>
            Sign in with Google
          </Button>
        </Link>
      </Grid>
    </Box>
  );
};

export default LoginFormContainer;
