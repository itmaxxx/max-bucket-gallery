import React, { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  FormControl,
  IconButton,
  IconButtonProps,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Image } from '@max-bucket-gallery/api-interfaces';
import { Types } from 'mongoose';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export interface ImageCardProps {
  image: Image;
}

const ImageCard: React.FunctionComponent<ImageCardProps> = ({ image }) => {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [resize, setResize] = useState('cover');
  const [extension, setExtension] = useState('jpg');
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [quality, setQuality] = useState(80);
  const [defaultUrl, setDefaultUrl] = useState('');
  const [outputUrl, setOutputUrl] = useState('');

  useEffect(() => {
    handleGenerateUrl();
    setDefaultUrl(generateUrl());
  }, []);

  const generateUrl = () => {
    return `${process.env.NX_MAX_BUCKET_API_URL}/uploads/r_${resize}${
      width > 0 ? ',w_' + width : ''
    }${height > 0 ? ',h_' + height : ''}${quality > 0 ? ',q_' + quality : ''}/${
      image.imageId
    }.${extension}`;
  };

  const handleGenerateUrl = () => {
    setOutputUrl(generateUrl());
  };

  const handleResize = (event: SelectChangeEvent) => {
    setResize(event.target.value);
  };

  const handleExtension = (event: SelectChangeEvent) => {
    setExtension(event.target.value);
  };

  const handleWidth = (event: ChangeEvent<HTMLInputElement>) => {
    setWidth(parseInt(event.target.value));
  };

  const handleHeight = (event: ChangeEvent<HTMLInputElement>) => {
    setHeight(parseInt(event.target.value));
  };

  const handleQuality = (event: Event, number: number | number[]) => {
    setQuality(number as number);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded((prev) => {
      if (prev) {
        setOutputUrl(defaultUrl);
      }
      return !prev;
    });
  };

  return (
    <Card>
      <Menu
        id={`image-menu-${image._id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
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
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
        title={!(image.user instanceof Types.ObjectId) && image.user?.fullName}
        subheader={new Date(image?.createdAt || '').toLocaleString('en-US')}
      />
      <CardMedia
        component="img"
        image={outputUrl}
        alt={`Photo uploaded by ${
          !(image.user instanceof Types.ObjectId) && image.user?.fullName
        }`}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider sx={{ mt: '-16px' }} />
          <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>
            Image url generator
          </Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="resize-select-label">Resize</InputLabel>
            <Select
              labelId="resize-select-label"
              id="resize-select"
              label="Resize"
              value={resize}
              onChange={handleResize}
              size="small"
            >
              <MenuItem value="cover">Cover</MenuItem>
              <MenuItem value="contain">Contain</MenuItem>
              <MenuItem value="fill">Fill</MenuItem>
              <MenuItem value="inside">Inside</MenuItem>
              <MenuItem value="outside">Outside</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="extension-select-label">Extension</InputLabel>
            <Select
              labelId="extension-select-label"
              id="extension-select"
              label="Extension"
              value={extension}
              onChange={handleExtension}
              size="small"
            >
              <MenuItem value="jpg">JPG</MenuItem>
              <MenuItem value="jpef">JPEF</MenuItem>
              <MenuItem value="png">PNG</MenuItem>
              <MenuItem value="webp">WEBp</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ mb: 2 }}
            label="Width (px)"
            type="number"
            variant="outlined"
            size="small"
            value={width}
            onChange={handleWidth}
            fullWidth
          />
          <TextField
            sx={{ mb: 2 }}
            label="Height (px)"
            type="number"
            variant="outlined"
            size="small"
            value={height}
            onChange={handleHeight}
            fullWidth
          />
          <Typography gutterBottom>Image quality</Typography>
          <Slider
            value={quality}
            onChange={handleQuality}
            aria-label="Image quality"
            valueLabelDisplay="auto"
            min={1}
            max={100}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Image url"
            variant="outlined"
            size="small"
            value={outputUrl}
            fullWidth
          />
          <Button
            fullWidth
            disableElevation
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => handleGenerateUrl()}
          >
            Apply
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ImageCard;
