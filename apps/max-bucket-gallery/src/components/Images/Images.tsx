import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import React, { useEffect } from 'react';
import { getUserImages } from '../../store/actions/images';
import {
  Card,
  CardActions,
  CardHeader,
  Grid,
  ImageList,
  ImageListItem,
  Skeleton,
} from '@mui/material';
import ImageCard from '../ImageCard/ImageCard';

const Images = () => {
  const dispatch = useDispatch();
  const { user, images } = useSelector((root: RootState) => root);

  useEffect(() => {
    if (user?.user?._id) {
      dispatch(getUserImages(user.user._id));
    }
  }, [user]);

  if (images?.loading) {
    return (
      <ImageList variant="masonry" cols={3} gap={16}>
        {[0, 0, 0, 0, 0, 0].map((item, index) => (
          <ImageListItem key={index}>
            <Card>
              <CardHeader
                avatar={<Skeleton variant="circular" width={40} height={40} />}
                title={<Skeleton variant="text" />}
                subheader={<Skeleton variant="text" />}
              />
              <Skeleton variant="rectangular" width={370} height={400} />
              <CardActions disableSpacing>
                <Skeleton variant="rectangular" width="40%" height={26} />
              </CardActions>
            </Card>
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  if (images?.images.length === 0) {
    return (
      <Grid
        component="div"
        sx={{ textAlign: 'center', color: 'gray', fontSize: 18 }}
      >
        No images to display...
      </Grid>
    );
  }

  return (
    <ImageList cols={3} gap={16}>
      {images?.images &&
        images.images.map((image) => (
          <ImageListItem key={image?._id?.toString()}>
            <ImageCard image={image} />
          </ImageListItem>
        ))}
    </ImageList>
  );
};

export default Images;
