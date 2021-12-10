import { Backdrop, Box, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getUserImages } from '../../store/actions/images';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';

const ImageUploadForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((root: RootState) => root.user.user);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

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

    if (!result || result?.message === 'Failed to upload image') {
      return alert('Failed to upload image, try again later');
    }

    setSelectedImage('');

    if (user?._id) {
      dispatch(getUserImages(user._id));
    }
  };

  // Not working (image not selected)
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {selectedImage ? (
        <img
          style={{
            width: '400px',
            maxWidth: '400px',
            maxHeight: '400px',
            cursor: 'not-allowed',
          }}
          src={selectedImage}
          onClick={() => setSelectedImage('')}
        />
      ) : (
        <Button variant="text" component="label" sx={{padding: '0 16px'}} fullWidth disableElevation>
          <CloudUploadIcon color="inherit" sx={{ fontSize: 100 }} />
          <span style={{ marginLeft: '16px' }}>Select image</span>
          <input
            type="file"
            name="image"
            // onChange={handleImageSelect}
            // value={selectedImage}
            hidden
            required
          />
        </Button>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 1 }}
      >
        Upload
      </Button>
    </Box>
  );
};

export default ImageUploadForm;
