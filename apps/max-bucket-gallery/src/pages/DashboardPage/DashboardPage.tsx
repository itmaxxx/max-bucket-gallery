import { Container, Grid, Typography } from '@mui/material';
import ImageUploadForm from '../../components/ImageUploadForm/ImageUploadForm';
import Images from '../../components/Images/Images';
import Copyright from '../../components/Copyright/Copyright';

const DashboardPage = () => {
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 4 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
      <Grid
        container
        alignItems="center"
        direction="column"
        sx={{ mt: 3, border: '5px dashed #cabdff', padding: '60px 0' }}
      >
        <ImageUploadForm />
      </Grid>
      <Grid item sx={{mt: 4}} xs={12}>
        <Images />
      </Grid>
      <Copyright sx={{mt: 5, mb: 5}}/>
    </Container>
  );
};

export default DashboardPage;
