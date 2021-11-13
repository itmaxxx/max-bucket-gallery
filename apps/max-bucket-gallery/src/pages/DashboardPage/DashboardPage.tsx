import { Container, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import ImageUploadForm from '../../components/ImageUploadForm/ImageUploadForm';
import LogoutBtn from '../../components/LogoutBtn/LogoutBtn';

const DashboardPage = () => {
  const user = useSelector((state: RootState) => {
    return state.user.user;
  });

  return (
    <Container component="main" maxWidth="lg">
      <Grid item xs={12}>
        <Typography variant="h1">Dashboard</Typography>
      </Grid>
      <Grid item xs={12}>
        {user?.fullName}
        <LogoutBtn />
      </Grid>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <ImageUploadForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
