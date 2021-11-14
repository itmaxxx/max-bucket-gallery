import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { useEffect } from 'react';
import { getUserImages } from '../../store/actions/images';
import { ImageList, ImageListItem } from '@mui/material';
import ImageCard from '../ImageCard/ImageCard';

const Images = () => {
  const dispatch = useDispatch();
  const { user, images } = useSelector((root: RootState) => root);

  useEffect(() => {
    if (user?.user?._id) {
      dispatch(getUserImages(user.user._id));
    }
  }, [user]);

  return (
    <ImageList variant="masonry" cols={3} gap={8}>
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
