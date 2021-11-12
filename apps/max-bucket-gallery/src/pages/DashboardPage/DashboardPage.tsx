import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import ImageUploadForm from '../../components/ImageUploadForm/ImageUploadForm';

const DashboardPage = () => {
  const user = useSelector((state: RootState) => {
    return state.user.user;
  });

  return (
    <Grid container component="main">
      <Typography variant="h1">Dashboard</Typography>
      {user?.fullName}
      <ImageUploadForm />
    </Grid>
  );
};

export default DashboardPage;
