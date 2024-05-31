import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

function RelatedVideo() {
  return (
    <Grid
      xs={4}
      sx={{ padding: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <FlexBox
        sx={{ width: '100%', maxWidth: 320, aspectRatio: '16/9', border: '1px black solid' }}
      ></FlexBox>
    </Grid>
  );
}

export default function RelatedVideos() {
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <FlexBox>
        <Typography variant="h3">Videos</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
        {/* Tuning class */}

        {/* 선택된 클래스에 있는 튜닝들 */}
        <Grid container>
          <RelatedVideo />
          <RelatedVideo />
          <RelatedVideo />
          <RelatedVideo />
          <RelatedVideo />
          <RelatedVideo />
        </Grid>
      </FlexBox>
      {/* Pagination */}
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
        <Pagination count={10} page={page} onChange={handleChange} size="large" />
      </FlexBox>
    </FlexBox>
  );
}
