import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import * as image from '@/image';
import Comments from '@/components/Comment';
import { ImageShowHorizontal } from '@/components/ImageList';
import { PI_Card } from '@/components/PI';
import { RelatedTunings } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import { Image } from './styled';

const TRACK_IMAGES = [
  image.track.mulege.mulege1,
  image.track.mulege.mulege2,
  image.track.mulege.mulege3,
  image.track.mulege.mulege4,
  image.track.mulege.mulege5,
  image.track.mulege.mulege6,
  image.track.mulege.mulege7,
  image.track.mulege.mulege8,
  image.track.mulege.mulege9,
  image.track.mulege.mulege10,
];

function TitlePart() {
  const name = 'Arch of Mulegé Circuit';

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
          src={image.track_icon.road_track}
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
      <FlexBox sx={{ paddingTop: 1 }}>
        {/* 트랙 사진 */}
        <FlexBox sx={{ aspectRatio: '4/3' }}>
          <Image src={image.track.molehach} sx={{ objectFit: 'contain' }} />
        </FlexBox>
        {/* 트랙 특징 설명 */}
        <FlexBox
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
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

export default function Tracks() {
  const navigate = useNavigate();

  const WIDTH = '100%';
  const HEIGHT = '100%';
  const name = 'Arch of Mulegé Circuit';
  const road_type = 'road';
  const track_type = 'circuit';

  return (
    <Container sx={{}}>
      <FullSizeCenteredFlexBox
        sx={{
          height: '100%',
          paddingTop: 5,
        }}
      >
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
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
          {/* 트랙 사진들 */}
          <ImageShowHorizontal images={TRACK_IMAGES} />
          {/* 댓글 */}
          <Comments />
          {/* <ImageWithMap /> */}
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
