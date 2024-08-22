import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import { CarDetailInfo } from '@/components/Car';
import CarInGameDetailInfo from '@/components/Car/CarInGameDetailInfo';
import Comments from '@/components/Comment';
import { TempComments } from '@/components/Comment/Comments';
import { RelatedDecals } from '@/components/Decals';
import { ImageShowHorizontal } from '@/components/ImageList/Horizontal2';
import { RelatedTunings } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { getCarInfo2 } from '@/db/index';
import ScrollToTop from '@/hooks/useResetScroll';
import type { CarInfo2 } from '@/types/car';

function TitlePart({ carInfo }: { carInfo: CarInfo2 }) {
  const name = carInfo.name_en;

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

  const { carID } = useParams();
  // FUTURE: prepare for FH4
  const game_context = 'FH5';

  const carinfo = useLiveQuery(async () => getCarInfo2(carID!, game_context), [carID]);

  if (carinfo)
    return (
      <Container sx={{ paddingTop: 2 }}>
        <FullSizeCenteredFlexBox>
          <FlexBox
            sx={{
              width: '100%',
              maxWidth: 1200,
              flexDirection: 'column',
              paddingY: 2,
              paddingX: 2,
              rowGap: 1,
            }}
            component={Paper}
          >
            <TitlePart carInfo={carinfo} />
            <FlexBox sx={{ paddingY: 1.5, rowGap: 2, flexDirection: 'column', width: '100%' }}>
              <CarDetailInfo carInfo={carinfo} />
              <CarInGameDetailInfo carInfo={carinfo} />
            </FlexBox>
            {/* <CarTags /> */}
            <ImageShowHorizontal images={carinfo?.image.images!} />
            {/* 댓글 */}
            <FlexBox sx={{ paddingY: 3 }}>
              <Comments.temp.TempVotableComments />

              {/* <TempComments /> */}
            </FlexBox>

            {/* 데칼 사진들 */}
            <RelatedDecals carID={carinfo.id} />
            {/* TODO: 관련 튜닝 */}
            <RelatedTunings carID={carinfo.id} />
            {/* TODO: 관련 영상 */}
            <RelatedVideos />
            {/* TODO: 관련 사진/움짤 */}
          </FlexBox>
        </FullSizeCenteredFlexBox>
        <ScrollToTop />
      </Container>
    );
}
