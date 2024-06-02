import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import * as image from '@/image';
import Comments from '@/components/Comment';
import { ImageShowHorizontal } from '@/components/ImageList';
import { BriefData } from '@/components/Track';
import { RelatedTunings } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

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
          paddingTop: 2,
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
          <BriefData />
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
