import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import * as image from '@/image';
import { BriefCarInfo } from '@/components/Car';
import Comments from '@/components/Comment';
import { RelatedTunings } from '@/components/Tunings';
import { RadarChartAndPerformance, TuningInfo } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { decalsWithImage } from '@/data/decals';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';

export default function TuningDetail() {
  const navigate = useNavigate();

  const WIDTH = '100%';
  const decalData = decalsWithImage[3];
  return (
    <Container sx={{ paddingTop: 5 }}>
      <FullSizeCenteredFlexBox>
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
            flexDirection: 'column',
            paddingY: 2,
            paddingX: 2,
            rowGap: 2,
          }}
          component={Paper}
        >
          {/* 튜닝 태그, 게시자, 공유 코드 */}
          <TuningInfo tuning={tunings[0]} />
          {/* 튜닝 레이더 차트랑 성능 표 */}
          <RadarChartAndPerformance tuning={tunings[0]} />
          {/* 튜닝에 사용된 차 간단 정보 */}
          <BriefCarInfo />
          <Divider flexItem variant="fullWidth" />
          {/* 댓글 */}
          <Comments />
          {/* 관련 영상 */}
          <RelatedVideos />
          {/* 관련 다른 튜닝들 */}
          <RelatedTunings />
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
