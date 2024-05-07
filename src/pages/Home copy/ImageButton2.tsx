import * as React from 'react';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
  },
}));

export const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  // backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center 40%',
});

export const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  height: 80,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

export const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  height: 80,
  width: '100%',
  backgroundColor: theme.palette.common.black,
  opacity: 0.75,
  transition: theme.transitions.create('opacity'),
}));

export const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 30,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 15px)',
  transition: theme.transitions.create('opacity'),
}));

export function ButtonBaseDemo2(image: {
  url: string;
  title: string;
  width: number;
  height: number;
}) {
  return (
    <ImageButton
      focusRipple
      key={image.title}
      style={{
        width: image.width,
        height: image.height,
      }}
    >
      <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
      <ImageBackdrop className="MuiImageBackdrop-root" />
      <Image>
        <Typography
          component="span"
          variant="h6"
          color="inherit"
          sx={{
            position: 'relative',
            p: 1,
            pt: 2,
            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
          }}
        >
          {image.title}
          {/* <ImageMarked className="MuiImageMarked-root" /> */}
        </Typography>
      </Image>
    </ImageButton>
  );
}
