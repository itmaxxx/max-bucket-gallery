import { Box, Button, Link } from '@mui/material';
import Google from '../../assets/images/icons/social-google.svg';
import React from 'react';

const SignInWithGoogle = () => {
  return (
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
  )
}

export default SignInWithGoogle;
