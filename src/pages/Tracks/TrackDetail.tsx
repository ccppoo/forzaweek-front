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
import { ImageShowHorizontal } from '@/components/ImageList';
import { PI_Card } from '@/components/PI';
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

function ImageWithMap() {
  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',

        flexDirection: 'column',
      }}
    >
      <FlexBox>
        <Typography variant="h5">Track picture</Typography>
      </FlexBox>

      {/* 트랙 스샷 */}
      <FlexBox sx={{ width: '100%', flexDirection: 'column' }}>
        <FlexBox
          sx={{
            width: '100%',
            height: '100%',
            maxHeight: 400,
            paddingY: 1,
          }}
        >
          {/* TODO: 트랙 경로 사진 */}
          {/* <FlexBox
            sx={{
              minWidth: 400,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FlexBox
              sx={{
                maxWidth: '100%',
                height: '100%',
                aspectRatio: '4/3',
                flexShrink: 1,
              }}
            >
              <Image src={image.track.molehach} sx={{ objectFit: 'contain' }} />
            </FlexBox>
          </FlexBox> */}
          {/* 큰 사진(1개) */}
          <FlexBox
            sx={{
              width: '100%',
              // height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FlexBox
              sx={{
                maxWidth: '100%',
                height: '100%',
              }}
            >
              <Image src={image.track.mulege.mulege1} sx={{ objectFit: 'contain' }} />
            </FlexBox>
          </FlexBox>
        </FlexBox>
        {/* 작은 사진 목록 */}
        <FlexBox
          sx={{
            height: '100%',
            paddingX: 1,
            paddingTop: 1,
            backgroundColor: '#cfcccc',
            flexDirection: 'row',
            // justifyContent: 'stretch',
          }}
        >
          <FlexBox
            sx={{
              width: '100%',
              height: 135,
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 1,
            }}
          >
            <FlexBox
              sx={{
                width: '5%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ArrowBackIosIcon />
            </FlexBox>
            <FlexBox
              sx={{
                width: '90%',
                height: '100%',
                flexWrap: 'nowrap',
                overflow: 'scroll',
                paddingBottom: 1,
                columnGap: 0.5,
              }}
            >
              {TRACK_IMAGES.map((image) => {
                return (
                  <FlexBox
                    sx={{
                      width: '100%',
                      aspectRatio: '16/9',
                      height: 126,
                    }}
                    key={`track-preview-${image}`}
                  >
                    <Image src={image} sx={{ objectFit: 'contain' }} />
                  </FlexBox>
                );
              })}
            </FlexBox>

            <FlexBox
              sx={{
                width: '5%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ArrowForwardIosIcon />
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function RelatedTuning() {
  const carInfo = {
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

  const share_code = '123 123 123';
  return (
    <Grid xs={6} sx={{ display: 'flex', flexDirection: 'column', height: 120, padding: 1 }}>
      <Paper sx={{ display: 'flex', width: '100%', height: '100%' }} elevation={4}>
        <Grid container sx={{ width: '100%' }}>
          {/* 차 사진 */}
          <Grid xs={5} sx={{ height: '100%' }}>
            <Image
              src={image.car.hyundaiElantra}
              sx={{
                objectFit: 'contain',
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            />
          </Grid>
          {/* 차 이름/튜닝 태그, 공유 코드 */}
          <Grid xs={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBox sx={{ width: '100%' }}>
              <Typography>{carInfo.name}</Typography>
            </FlexBox>
            <FlexBox>
              <Typography>{carInfo.drive_train}</Typography>
            </FlexBox>
            <FlexBox>
              <Typography>tags : grip</Typography>
            </FlexBox>
            <FlexBox>
              <Typography>Share code : {share_code}</Typography>
            </FlexBox>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

function RelatedTunings() {
  const TUNING_CLASSES = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];
  const TUNING_NUM = {
    D: 500,
    C: 600,
    B: 700,
    A: 800,
    S1: 900,
    S2: 998,
    X: 999,
  };
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
        <Typography variant="h5">Tunings</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
        {/* Tuning class */}
        <FlexBox
          sx={{
            height: 60,
            backgroundColor: '#cfcccc',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 5,
          }}
        >
          {Object.values(TUNING_NUM).map((val) => {
            return <PI_Card pi_number={val} height={40} />;
          })}
        </FlexBox>
        {/* 선택된 클래스에 있는 튜닝들 */}
        <Grid container>
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
        </Grid>
      </FlexBox>
      {/* Pagination */}
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
        <Pagination count={10} page={page} onChange={handleChange} size="large" />
      </FlexBox>
    </FlexBox>
  );
}
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

function RelatedVideos() {
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
      {/* Pagination */}
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
        <Pagination count={10} page={page} onChange={handleChange} size="large" />
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
    <Container sx={{ height: '130vh' }}>
      <FullSizeCenteredFlexBox
        sx={{
          height: '100%',
          marginTop: 50,
        }}
      >
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
            // height: '100%',
            flexDirection: 'column',
            paddingY: 2,
            marginTop: 20,

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
