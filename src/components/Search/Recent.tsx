import { useState } from 'react';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import * as image from '@/image';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

const carinfo = {
  manufacture: 'Hyundai',
  year: 2021,
  country: 'Korea',
  name: '#98 Bryan Herta Autosport Elantra N',
  drive_train: 'FWD',
  body_style: 'sedan',
  door: 4,
  engine: 'ICE',
  FH5: {
    PI: 800,
    division: 'track toys',
  },
};

function CarSearched() {
  return (
    <Paper
      sx={{ display: 'flex', flexDirection: 'column', width: 160, height: '100%', paddingX: 0.5 }}
    >
      <FlexBox sx={{ width: '100%' }}>
        <Image
          src={image.car.hyundaiElantra}
          sx={{
            width: '100%',
            objectFit: 'contain',
          }}
        />
      </FlexBox>
      <FlexBox>
        <Typography variant="body1">{carinfo.name}</Typography>
      </FlexBox>
    </Paper>
  );
}

export default function CarSearchRecent() {
  return (
    <FlexBox sx={{ flexDirection: 'column', paddingY: 1 }}>
      <FlexBox>
        <Typography variant="h5">Recent</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%', columnGap: 0.5 }}>
        <CarSearched />
        <CarSearched />
        <CarSearched />
        <CarSearched />
      </FlexBox>
    </FlexBox>
  );
}
