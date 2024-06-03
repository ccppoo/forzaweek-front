import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import * as image from '@/image';
import { CarDetailInfo } from '@/components/Car';
import Comments from '@/components/Comment';
import { RelatedDecals } from '@/components/Decals';
import { ImageShowHorizontal } from '@/components/ImageList';
import { RelatedTunings } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

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
  const manufacture = 'Hyundai';

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column' }}>
      <FlexBox sx={{ alignItems: 'center', paddingX: 0 }}>
        <Typography variant="h4">{name}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

function CarTags() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <FlexBox>
        <Typography>Tags</Typography>
      </FlexBox>
      <FlexBox></FlexBox>
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
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox>
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
            // height: '100%',
            flexDirection: 'column',
            paddingY: 2,
            paddingX: 2,
            rowGap: 1,
          }}
          component={Paper}
        >
          {/* 제목 */}
          <TitlePart />
          {/* 제목 밑에 사진이랑 특징 */}
          <FlexBox sx={{ paddingY: 3 }}>
            <CarDetailInfo />
          </FlexBox>

          {/* 태그 */}
          {/* <CarTags /> */}
          {/* 차 사진들 */}
          <ImageShowHorizontal images={CAR_IMAGES} />
          {/* 댓글 */}
          <FlexBox sx={{ paddingY: 3 }}>
            <Comments />
          </FlexBox>

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
