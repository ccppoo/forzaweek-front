import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useLiveQuery } from 'dexie-react-hooks';

import { CarDetailInfo } from '@/components/Car';
import CarInGameDetailInfo from '@/components/Car/CarInGameDetailInfo';
import Comments from '@/components/Comment';
import { TempComments } from '@/components/Comment/Comments';
import { RelatedDecals } from '@/components/Decals';
import { ImageShowHorizontal } from '@/components/ImageList/Horizontal2';
import { Tags } from '@/components/Tag';
import { RelatedTunings } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { getCarFH5FullType } from '@/db/query/fh5/car';
import { getCarFH5 } from '@/db/query/fh5/car';
import ScrollToTop from '@/hooks/useResetScroll';

function TitlePart({ carFH5ID }: { carFH5ID: string }) {
  const carinfo = useLiveQuery(async () => getCarFH5FullType(carFH5ID!), [carFH5ID]);

  // TODO: if Special Verison (Forizon Edition, etc) add suffix
  const carName = carinfo?.baseCar.name.en[0];
  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column' }}>
      <FlexBox sx={{ alignItems: 'center', paddingX: 0 }}>
        <Typography variant="h4">{carinfo?.baseCar.name.en[0]}</Typography>
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

  const carinfo = useLiveQuery(async () => await getCarFH5FullType(carID!), [carID]);

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
            <TitlePart carFH5ID={carID!!} />
            <FlexBox sx={{ paddingY: 1.5, rowGap: 2, flexDirection: 'column', width: '100%' }}>
              <CarDetailInfo carFH5ID={carID!!} />
              <CarInGameDetailInfo carFH5ID={carID!!} />
            </FlexBox>
            <ImageShowHorizontal images={carinfo?.imageURLs} />
            <Tags topic="car" subjectID={carID!} />
            {/* 댓글 */}
            <FlexBox sx={{ paddingY: 3 }}>
              <Comments.temp.TempVotableComments />

              {/* <TempComments /> */}
            </FlexBox>

            {/* 데칼 사진들 */}
            <RelatedDecals carFH5ID={carinfo.id!} />
            {/* TODO: 관련 튜닝 */}
            <RelatedTunings carFH5ID={carinfo.id} />
            {/* TODO: 관련 영상 */}
            {/* <RelatedVideos /> */}
            {/* TODO: 관련 사진/움짤 */}
          </FlexBox>
        </FullSizeCenteredFlexBox>
        <ScrollToTop />
      </Container>
    );
}
