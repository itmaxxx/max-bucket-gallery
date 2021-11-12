import { Box, Button } from '@mui/material';
import React from 'react';

const ImageUploadForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const response = await fetch(process.env.NX_BACKEND_URL + '/api/images', { method: 'POST', body: data, headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }, });
    const result = await response.json();

    console.log(result);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Button variant="outlined" component="label" fullWidth disableElevation>
        Select image
        <input type="file" name="image" hidden required />
      </Button>
      <Button
        type="submit"
        fullWidth
        disableElevation
        variant="contained"
        sx={{ mt: 1 }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default ImageUploadForm;
