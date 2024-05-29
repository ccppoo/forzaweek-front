import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import * as image from '@/image';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

export default function BriefData() {
  const WIDTH = '100%';
  const HEIGHT = '100%';
  const name = 'Arch of Mulegé Circuit';
  const road_type = 'road';
  const track_type = 'circuit';
  const laps = 3;
  const description = 'design of Hyundai elantra, its my style';

  return (
    <FlexBox sx={{ width: '100%', height: '100%' }}>
      <Grid container sx={{ paddingTop: 1 }}>
        {/* 차 사진 */}
        <Grid xs={4} sx={{}}>
          <Image src={image.car.hyundaiElantra} sx={{ objectFit: 'contain' }} />
        </Grid>
        {/* 차 특징 설명 */}
        <Grid
          xs={8}
          sx={{
            height: '100%',
            flexDirection: 'column',
            paddingLeft: 2,
          }}
        >
          <FlexBox sx={{ flexDirection: 'column' }}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body1">{description}</Typography>
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column' }}>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">Road Type : </Typography>
              <Typography variant="h6">{road_type}</Typography>
            </FlexBox>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">Track Type : </Typography>
              <Typography variant="h6">{track_type}</Typography>
              <Typography>laps: {laps}</Typography>
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', columnGap: 1 }}>
              <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
                <Typography variant="h6">Tags : </Typography>
                <Typography variant="h6">{track_type}</Typography>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Grid>
      </Grid>
    </FlexBox>
  );
}
