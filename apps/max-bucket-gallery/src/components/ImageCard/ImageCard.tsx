import React from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Image } from '@max-bucket-gallery/api-interfaces';
import { Types } from 'mongoose';

export interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FunctionComponent<ImageCardProps> = ({ image }) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={
              !(image.user instanceof Types.ObjectId)
                ? image.user?.profilePicture
                : ''
            }
          >
            {!(image.user instanceof Types.ObjectId) && image.user?.fullName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={!(image.user instanceof Types.ObjectId) && image.user?.fullName}
        subheader={new Date(image?.createdAt || '').toLocaleString('en-US')}
      />
      <CardMedia
        component="img"
        image={`${process.env.NX_MAX_BUCKET_API_URL}/uploads/r_cover,w_400,h_400/${image.imageId}.jpg`}
        alt={`Photo uploaded by ${
          !(image.user instanceof Types.ObjectId) && image.user?.fullName
        }`}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ImageCard;
