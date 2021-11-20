import React, { FC } from 'react';
import { Button, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { LoginFormValues } from './LoginFormContainer';

interface LoginFormProps {
  register: UseFormRegister<LoginFormValues>;
}

const LoginForm: FC<LoginFormProps> = ({ register }) => {
  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        autoFocus
        {...register('email')}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password')}
      />
      <Button
        type="submit"
        fullWidth
        disableElevation
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
    </>
  );
};

export default LoginForm;
