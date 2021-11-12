import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoginForm from '../../components/LoginForm/LoginForm';
import Copyright from '../../components/Copyright/Copyright';
import Google from '../../assets/images/icons/social-google.svg';

const LoginPage = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginForm />
          <Grid container>
            <Grid item xs={12} md={12}>
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
          </Grid>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
