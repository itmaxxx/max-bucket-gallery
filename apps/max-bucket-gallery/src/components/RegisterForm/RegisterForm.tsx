import React, { FC } from 'react';
import { Button, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { RegisterFormValues } from './RegisterFormContainer';

interface RegisterFormProps {
  register: UseFormRegister<RegisterFormValues>;
}

const RegisterForm: FC<RegisterFormProps> = ({ register }) => {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full name"
        autoComplete="name"
        autoFocus
        {...register('fullName')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        autoComplete="email"
        {...register('email')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        {...register('password')}
      />
      <Button
        type="submit"
        fullWidth
        disableElevation
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </Button>
    </>
  );
};

export default RegisterForm;
