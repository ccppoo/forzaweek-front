import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { ApexOptions } from 'apexcharts';

import * as image from '@/image';
import Comments from '@/components/Comment';
import { RelatedDecals } from '@/components/Decals';
import { ImageShowHorizontal } from '@/components/ImageList';
import { PI_Card } from '@/components/PI';
import { RelatedTunings } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';

import { Image } from './styled';

const CAR_IMAGES = [
  image.decal.elantra_front2,
  image.decal.elantra_front3,
  image.decal.elantra_front1,
  image.decal.elantra_back1,
  image.decal.elantra_back2,
  image.decal.elantra_left,
  image.decal.elantra_right,
];

const carDetail = {
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

function TitlePart() {
  const name = carDetail.name;

  return (
    <FlexBox sx={{ width: '100%', height: 50 }}>
      {/* 트랙 아이콘 */}
      <FlexBox
        sx={{
          aspectRatio: '1/1',
          height: '100%',
        }}
      >
        <Image
          src={image.manufacturer.hyundai}
          sx={{
            objectFit: 'contain',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
        <Typography variant="h4">{name}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

function BreifData() {
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

export default function CarDetail() {
  const navigate = useNavigate();

  const WIDTH = '100%';
  const HEIGHT = '100%';
  const name = 'Arch of Mulegé Circuit';
  const road_type = 'road';
  const track_type = 'circuit';

  return (
    <Container sx={{ paddingTop: 5 }}>
      <FullSizeCenteredFlexBox>
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
            // height: '100%',
            flexDirection: 'column',
            paddingY: 2,
            paddingX: 2,
            rowGap: 3,
          }}
          component={Paper}
        >
          {/* 제목 */}
          <TitlePart />
          {/* 제목 밑에 사진이랑 특징 */}
          <BreifData />
          {/* 차 사진들 */}
          <ImageShowHorizontal images={CAR_IMAGES} />
          {/* 댓글 */}
          <Comments />
          {/* 데칼 사진들 */}
          <RelatedDecals />
          {/* TODO: 관련 튜닝 */}
          <RelatedTunings />
          {/* TODO: 관련 영상 */}
          <RelatedVideos />
          {/* TODO: 관련 사진/움짤 */}
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
