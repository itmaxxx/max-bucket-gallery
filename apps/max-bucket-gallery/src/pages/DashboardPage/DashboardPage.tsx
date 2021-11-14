import { Container, Grid, Typography } from '@mui/material';
import ImageUploadForm from '../../components/ImageUploadForm/ImageUploadForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { User } from '@max-bucket-gallery/api-interfaces';

const DashboardPage = () => {
  const user: User | null = useSelector((root: RootState) => root.user.user);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch(process.env.NX_BACKEND_URL + '/api/images/' + user?._id, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const result = await response.json();

      console.log(result);
    }

    if (user) {
      fetchImages();
    }
  }, [user]);

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 3 }}>
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
