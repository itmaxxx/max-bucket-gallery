import React from 'react';
import { Button, TextField } from '@mui/material';

const RegisterForm = () => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full name"
        name="fullName"
        autoComplete="name"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
      />
      <Button
        type="submit"
        fullWidth
        disableElevation
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign up
      </Button>
    </>
  );
};

export default RegisterForm;
