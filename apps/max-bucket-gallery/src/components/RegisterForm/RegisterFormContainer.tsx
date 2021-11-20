import React from 'react';
import { Box, Button, Divider, Grid } from '@mui/material';
import RegisterForm from './RegisterForm';
import SignInWithGoogle from '../Buttons/SignInWithGoogle';
import { Link, Navigate } from 'react-router-dom';
import { userRegister } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { useForm } from 'react-hook-form';

export interface RegisterFormValues {
  fullName: string;
  email: string;
  password: string;
}

const RegisterFormContainer = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const loggedIn: boolean = useSelector((state: RootState) => {
    return state.user.loggedIn || false;
  });

  const onSubmit = (data: RegisterFormValues) => {
    dispatch(userRegister(data.fullName, data.email, data.password));
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      {loggedIn && <Navigate to="/dashboard" />}
      <Grid
        item
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <RegisterForm register={register} />
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
