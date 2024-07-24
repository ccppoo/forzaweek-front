import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';

import type { TrackSchemaType } from '@/FormData/tracks/fh5';
import { GetTrack } from '@/api/data/track';
import Comments from '@/components/Comment';
import { ImageShowHorizontal } from '@/components/ImageList/Horizontal2';
import { BriefData } from '@/components/Track';
import TrackIconImage from '@/components/Track/TrackIcon';
import { RelatedTunings } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function TitlePart({ track }: { track: TrackSchemaType }) {
  return (
    <FlexBox sx={{ width: '100%', height: 50 }}>
      {/* 트랙 아이콘 */}
      <FlexBox
        sx={{
          aspectRatio: '1/1',
          height: '100%',
        }}
      >
        <TrackIconImage category={track.category} format={track.format} />
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
        <Typography variant="h4">{track.name.en}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

export default function Tracks() {
  const navigate = useNavigate();
  const { trackID } = useParams();

  const WIDTH = '100%';
  const HEIGHT = '100%';

  const game = 'FH5';
  const { data } = useQuery({
    queryKey: ['track detail', game, trackID!],
    queryFn: GetTrack,
  });

  console.log(`data : ${JSON.stringify(data)}`);
  if (data) {
    const imgs = data.imageURLs || [];
    const TRACK_IMAGES = [data.fullPathImage.zoom_out, data.fullPathImage.zoom_in, ...imgs].filter(
      (x) => typeof x == 'string',
    );
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
            <TitlePart track={data} />
            {/* 제목 밑에 사진이랑 특징 */}
            <BriefData track={data} />
            {/* 트랙 사진들 */}
            <ImageShowHorizontal images={TRACK_IMAGES} />
            {/* 댓글 */}
            <Comments />
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
}
