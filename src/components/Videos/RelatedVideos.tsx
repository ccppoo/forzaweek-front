import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
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

function VideosShowMore() {
  // TODO:  처음부터 Car DB의 ID로 받아서 DB 쿼리 안하고 바로 세팅할 수 있도록

  // const {
  //   actions: {
  //     car: { setCar },
  //   },
  // } = useCarAndTagFilter(searchScope);

  // more -> search filter 보여주고 있는 차로 세팅 -> 재검색

  const onClick = async () => {
    console.log(`show more - tuning`);
    // const carInfo = await getCarInfo(carName);
    // console.log(`carInfo : ${JSON.stringify(carInfo)}`);
    // setCar(carInfo);
  };

  return (
    <FlexBox sx={{ justifyContent: 'end', paddingX: 1, paddingTop: 1 }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', marginX: 1 }}>
        <Button onClick={onClick}>show more</Button>
      </FlexBox>
    </FlexBox>
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
        <Typography variant="h5">Videos</Typography>
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
      <VideosShowMore />
      {/* Pagination */}
      {/* <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
        <Pagination count={10} page={page} onChange={handleChange} size="large" />
      </FlexBox> */}
    </FlexBox>
  );
}
