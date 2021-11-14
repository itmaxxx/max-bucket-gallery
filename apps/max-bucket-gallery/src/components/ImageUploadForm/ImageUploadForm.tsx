import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUploadForm = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setOpen(true);

    const data = new FormData(event.currentTarget);
    const response = await fetch(process.env.NX_BACKEND_URL + '/api/images', {
      method: 'POST',
      body: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const result = await response.json();

    setOpen(false);

    console.log(result);
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Button variant="text" component="label" fullWidth disableElevation>
        <CloudUploadIcon color="inherit" sx={{ fontSize: 100 }} />
        <span style={{ marginLeft: '8px' }}>Select image</span>
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
