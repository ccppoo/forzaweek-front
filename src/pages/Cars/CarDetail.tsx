import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
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
import { ImageShowHorizontal } from '@/components/ImageList';
import { PI_Card } from '@/components/PI';
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

function RelatedTuning({ tuning }: { tuning: Tuning }) {
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

  const share_code3 = [
    tuning.share_code.substring(0, 3),
    tuning.share_code.substring(3, 6),
    tuning.share_code.substring(6, 9),
  ];
  const data = {
    labels: ['Acceleration', 'Speed', 'braking', 'offroad', 'launch', 'handling'],
    datasets: [
      {
        data: [
          tuning.performance.acceleration,
          tuning.performance.speed,
          tuning.performance.braking,
          tuning.performance.offroad,
          tuning.performance.launch,
          tuning.performance.handling,
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const series = [
    {
      name: 'performance',
      data: [
        tuning.performance.acceleration,
        tuning.performance.speed,
        tuning.performance.braking,
        tuning.performance.offroad,
        tuning.performance.launch,
        tuning.performance.handling,
      ],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false,
      },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
      redrawOnParentResize: true,
    },
    tooltip: {
      enabled: false,
    },
    plotOptions: {
      radar: {
        size: 80,
      },
    },
    yaxis: {
      min: 0,
      max: 10,
      stepSize: 2,
      tooltip: {
        enabled: false,
      },
      labels: {
        show: false,
        formatter: (value) => {
          return '';
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ['acceleration', 'speed', 'braking', 'offroad', 'launch', 'handling'],
      labels: {
        style: {
          colors: '#050505',
          fontWeight: 600,
          fontSize: '10px',
        },
        offsetY: -1,
      },
    },

    fill: {
      opacity: 0.5,
    },
  };

  const tuningTitle = 'good tuning';
  const creator = tuning.creater.club
    ? `[${tuning.creater.club}] ${tuning.creater.id}`
    : tuning.creater.id;
  return (
    <Grid xs={6} sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
      <Paper sx={{ display: 'flex', width: '100%', height: '100%' }} elevation={4}>
        <FlexBox sx={{ width: 0, position: 'static', paddingTop: 1, paddingLeft: 1 }}>
          <PI_Card pi_number={tuning.PI} height={30} />
        </FlexBox>
        <Grid container sx={{ width: '100%' }}>
          {/* 성능 그래프 */}

          <Grid xs={6} sx={{ aspectRatio: '1/1' }}>
            <ReactApexChart
              series={series}
              options={options}
              width={'100%'}
              height={'100%'}
              type="radar"
              id={`radar-chart-${tuning.share_code}`}
            />
          </Grid>
          {/* 튜닝 이름 */}
          <Grid xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBox sx={{ width: '100%' }}>
              <Typography>{tuningTitle}</Typography>
            </FlexBox>

            <FlexBox>
              <Typography>creator : {creator}</Typography>
            </FlexBox>

            <FlexBox>
              <Typography>tags : grip</Typography>
            </FlexBox>

            <FlexBox>
              <Typography>suspension : {tuning.suspension}</Typography>
            </FlexBox>
            <FlexBox>
              <Typography>tier : {tuning.tier}</Typography>
            </FlexBox>
            <FlexBox>
              <Typography>driving system : {tuning.driving_system}</Typography>
            </FlexBox>
            <FlexBox>
              <FlexBox
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 1,
                  borderRadius: 4,
                  backgroundColor: '#d1d1d1',
                }}
              >
                {share_code3.map((code_peice) => {
                  return (
                    <Typography variant="h6" key={`share-code-piece-${code_peice}`}>
                      {code_peice}
                    </Typography>
                  );
                })}
              </FlexBox>
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

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <FlexBox>
        <Typography variant="h3">Tunings</Typography>
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
            return <PI_Card pi_number={val} height={40} key={`pi-card-val-${val}`} />;
          })}
        </FlexBox>

        {/* 선택된 클래스에 있는 튜닝들 */}
        <Grid container>
          {tunings
            .filter((tuning) => tuning.PI > 900 && tuning.PI <= 998)
            .map((tuning) => {
              return (
                <RelatedTuning tuning={tuning} key={`tuning-${tuning.PI}-${tuning.share_code}`} />
              );
            })}
        </Grid>
      </FlexBox>
      {/* Pagination */}
      <Pagination />
    </FlexBox>
  );
}

function RelatedDecal({ decalData }: { decalData: DecalData }) {
  const creator = decalData.club ? `[${decalData.club}] ${decalData.creater}` : decalData.creater;
  const share_code = decalData.share_code;

  // TODO: decalData.fav.count -> 1000 넘어가면 줄이기
  const share_code3 = [
    share_code.substring(0, 3),
    share_code.substring(3, 6),
    share_code.substring(6, 9),
  ];
  // 16 9 -> 8 9
  return (
    <Grid
      xs={6}
      sx={{ display: 'flex', flexDirection: 'column', aspectRatio: '32/9', padding: 0.5 }}
    >
      <Paper sx={{ display: 'flex', width: '100%', height: '100%' }} elevation={4}>
        <Grid container sx={{ width: '100%' }} columnSpacing={1}>
          {/* 데칼 대표 사진 */}
          <Grid xs={6} sx={{ height: '100%' }}>
            <Image
              src={decalData.frontImage}
              sx={{
                objectFit: 'contain',
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            />
          </Grid>
          {/* 차 이름/튜닝 태그, 공유 코드 */}
          <Grid
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              paddingBottom: 1,
            }}
          >
            <FlexBox sx={{ width: '100%' }}>
              <Typography variant="h6">{creator}</Typography>
            </FlexBox>
            <FlexBox sx={{ flexWrap: 'wrap', width: '100%', columnGap: 0.5, rowGap: 0.5 }}>
              {decalData.tags.map((tag) => (
                <Chip key={`decal-tag-${tag}`} size="small" label={tag} />
              ))}
            </FlexBox>
            <FlexBox
              sx={{
                width: '100%',
                columnGap: 2,
              }}
            >
              {/* 공유코드 */}
              <FlexBox
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 1,
                  borderRadius: 4,
                  backgroundColor: '#d1d1d1',
                }}
              >
                {share_code3.map((code_peice) => {
                  return (
                    <Typography key={`decal-share-code-piece-${code_peice}`} variant="h6">
                      {code_peice}
                    </Typography>
                  );
                })}
              </FlexBox>
              {/* 하트 */}
              <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <IconButton sx={{ borderRadius: 4 }}>
                  {decalData.fav.checked ? (
                    <FavoriteOutlinedIcon fontSize="small" />
                  ) : (
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                  )}
                  <FlexBox
                    sx={{
                      width: 30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingLeft: 0.5,
                    }}
                  >
                    <Typography>{decalData.fav.count}</Typography>
                  </FlexBox>
                </IconButton>
              </FlexBox>
            </FlexBox>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

function RelatedDecals() {
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
        <Typography variant="h3">Decals</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
        {/* 선택된 클래스에 있는 튜닝들 */}
        <Grid container>
          {decalsWithImage.map((decal) => (
            <RelatedDecal decalData={decal} key={`decal-cell-${decal.share_code}`} />
          ))}
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
        <Typography variant="h3">Videos</Typography>
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
