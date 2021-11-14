import { Container, Grid, Typography } from '@mui/material';
import ImageUploadForm from '../../components/ImageUploadForm/ImageUploadForm';

const DashboardPage = () => {
  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Dashboard</Typography>
      </Grid>
      <Grid
        container
        alignItems="center"
        direction="column"
        sx={{ mt: 3, border: '5px dashed #abb6e7', padding: '60px 0' }}
      >
        <ImageUploadForm />
      </Grid>
    </Container>
  );
};

export default DashboardPage;
