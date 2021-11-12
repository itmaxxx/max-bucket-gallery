import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';

const DashboardPage = () => {
  const user = useSelector((state: RootState) => {
    return state.user.user;
  });

  return (
    <Grid container component="main">
      <Typography variant="h1">Dashboard</Typography>
      {user?.fullName}
    </Grid>
  )
}

export default DashboardPage;
