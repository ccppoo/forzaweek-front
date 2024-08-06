import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { useQuery } from '@tanstack/react-query';

import * as image from '@/image';
import { GetTuning, SearchTunings } from '@/api/data/tuning';
import { BriefCarInfo } from '@/components/Car';
import Comments from '@/components/Comment';
import SharingCreationCreator from '@/components/Post/Creator';
import ShareCode from '@/components/Post/ShareCode';
import Tags from '@/components/Post/Tags';
import { RelatedTunings } from '@/components/Tunings';
import { RadarChartAndPerformance, TuningInfo } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

export default function TuningDetail() {
  // const navigate = useNavigate();
  const { carID, tuningID } = useParams();

  const WIDTH = '100%';
  // const decalData = decalsWithImage[3];

  const { data } = useQuery({
    queryKey: ['tuning-detail', carID!, tuningID!],
    queryFn: GetTuning,
  });
  if (data) {
    console.log(`data : ${JSON.stringify(data)}`);
    return (
      <Container sx={{ paddingTop: 2 }}>
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
            <SharingCreationCreator creator={data.creator} share_code={data.share_code} />
            <ShareCode creator={data.creator} share_code={data.share_code} />
            <Tags tags={data.tags} />
            {/* 튜닝에 사용된 차 간단 정보 */}
            <BriefCarInfo />
            {/* 튜닝 레이더 차트랑 성능 표 */}
            <RadarChartAndPerformance tuning={data} />
            <Divider flexItem variant="fullWidth" />
            {/* 댓글 */}
            <Comments.VotableComments subject_to={tuningID!} />
            {/* 관련 영상 */}
            <RelatedVideos />
            {/* 관련 다른 튜닝들 */}
            <RelatedTunings carID={carID} />
          </FlexBox>
        </FullSizeCenteredFlexBox>
      </Container>
    );
  }
}
