import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { ApexOptions } from 'apexcharts';

import * as image from '@/image';
import { PI_Card } from '@/components/PI';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';
import { decals as decalImages } from '@/image/decal';

import { Image } from './styled';

const DECAL_IMAGES = decalImages.d140535376;

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0].toUpperCase()}`,
  };
}

function TitlePart() {
  const carName = '#98 Bryan Herta Autosport Elantra N';
  return (
    <FlexBox sx={{ width: '100%', height: 50, columnGap: 1 }}>
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
        <Typography variant="h4">{carName}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

function BaseCarInfo() {
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

  return (
    <FlexBox sx={{ width: '100%', height: '100%', border: '1px black solid' }}>
      <FlexBox sx={{}}>
        {/* 근본이 되는 차 */}
        <FlexBox sx={{ aspectRatio: '16/9', height: 140 }}>
          <Image src={image.car.hyundaiElantra} sx={{ objectFit: 'contain' }} />
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column', paddingLeft: 2 }}>
          {/* 차 이름 */}
          <FlexBox
            sx={{
              height: 40,
              alignItems: 'center',
            }}
          >
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
              <Typography variant="h5">{carInfo.name}</Typography>
            </FlexBox>
          </FlexBox>
          {/* 국적, 생산 연도, 차 체형 */}
          <FlexBox sx={{ columnGap: 1 }}>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">Country : </Typography>
              <Typography variant="h6">{carInfo.country}</Typography>
            </FlexBox>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">Year : </Typography>
              <Typography variant="h6">{carInfo.year}</Typography>
            </FlexBox>
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column' }}>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">body style : </Typography>
              <Typography variant="h6">{carInfo.body_style}</Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningInfo({ tuning }: { tuning: Tuning }) {
  const creator = tuning.creater.club
    ? `[${tuning.creater.club}] ${tuning.creater.id}`
    : tuning.creater.id;

  const share_code3 = [
    tuning.share_code.substring(0, 3),
    tuning.share_code.substring(3, 6),
    tuning.share_code.substring(6, 9),
  ];

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
      {/* 제작자 */}
      <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
        <Avatar {...stringAvatar(tuning.creater.id)} sx={{ width: 35, height: 35 }} />
        <Typography variant="h5">{creator}</Typography>
      </FlexBox>
      {/* 태그 */}
      <FlexBox sx={{ columnGap: 0.5 }}>
        {tuning.tags.map((tag) => {
          return <Chip label={tag} />;
        })}
      </FlexBox>
      {/* 공유 코드 */}
      <FlexBox
        sx={{
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <Typography>Share code : </Typography>
        <FlexBox
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 1,
            paddingX: 1,
            borderRadius: 1,
            marginLeft: 1,
            backgroundColor: '#d1d1d1',
          }}
        >
          {share_code3.map((code_peice) => {
            return (
              <Typography variant="h6" key={`decal-row-share-code-piece-${code_peice}`}>
                {code_peice}
              </Typography>
            );
          })}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningImages({ tuning }: { tuning: Tuning }) {
  const options: ApexOptions = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false,
      },
      events: {
        // mounted: (chart) => {
        //   chart.windowResizeHandler();
        // },
      },
      redrawOnParentResize: true,
    },
    plotOptions: {
      radar: {
        size: 160,
      },
    },
    tooltip: {
      enabled: false,
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
          fontWeight: 500,
          fontSize: '18px',
        },
        offsetY: -2,
      },
    },

    fill: {
      opacity: 0.5,
    },
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

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: 400,
        // backgroundColor: '#e6ebf2',
      }}
    >
      {/* 성능 육각형 레이더 그래프 */}
      <FlexBox sx={{ height: 400, aspectRatio: '1/1', border: '1px black solid' }}>
        <FlexBox sx={{ width: 0, position: 'static', paddingTop: 1, paddingLeft: 1 }}>
          <PI_Card height={30} pi_number={tuning.PI} />
        </FlexBox>
        <ReactApexChart
          series={series}
          options={options}
          width={500}
          height={'100%'}
          type="radar"
          id={`tuning-detail-radar-chart-${tuning.share_code}`}
        />
      </FlexBox>
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 0.5, paddingLeft: 1 }}>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlexBox sx={{ width: 100, height: 40, alignItems: 'center' }}>
            <Typography>최고속도</Typography>
          </FlexBox>
          <FlexBox sx={{ height: 40, alignItems: 'center' }}>
            <Typography>{tuning.test_reading.maxspeed}km/h</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlexBox sx={{ width: 100, height: 40, alignItems: 'center' }}>
            <Typography>0-100km/h</Typography>
          </FlexBox>
          <FlexBox sx={{ height: 40, alignItems: 'center' }}>
            <Typography>{tuning.test_reading.zero100}/초</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlexBox sx={{ width: 100, height: 40, alignItems: 'center' }}>
            <Typography>출력</Typography>
          </FlexBox>
          <FlexBox sx={{ height: 40, alignItems: 'center' }}>
            <Typography>{tuning.test_reading.output}ps</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlexBox sx={{ width: 100, height: 40, alignItems: 'center' }}>
            <Typography>토크</Typography>
          </FlexBox>
          <FlexBox sx={{ height: 40, alignItems: 'center' }}>
            <Typography>{tuning.test_reading.tork}kg.m</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlexBox sx={{ width: 100, height: 40, alignItems: 'center' }}>
            <Typography>중량</Typography>
          </FlexBox>
          <FlexBox sx={{ height: 40, alignItems: 'center' }}>
            <Typography>{tuning.test_reading.weight}kg</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlexBox sx={{ width: 100, height: 40, alignItems: 'center' }}>
            <Typography>횡Gs</Typography>
          </FlexBox>
          <FlexBox sx={{ height: 40, alignItems: 'center' }}>
            <Typography>{tuning.test_reading.skid_pad}</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlexBox sx={{ width: 100, height: 40, alignItems: 'center' }}>
            <Typography>서스펜션</Typography>
          </FlexBox>
          <FlexBox sx={{ height: 40, alignItems: 'center' }}>
            <Typography>{tuning.suspension}</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlexBox sx={{ width: 100, height: 40, alignItems: 'center' }}>
            <Typography>타이어 재질</Typography>
          </FlexBox>
          <FlexBox sx={{ height: 40, alignItems: 'center' }}>
            <Typography>{tuning.tier}</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1 }}>
          <FlexBox sx={{ width: 100, height: 40, alignItems: 'center' }}>
            <Typography>구동방식</Typography>
          </FlexBox>
          <FlexBox sx={{ height: 40, alignItems: 'center' }}>
            <Typography>{tuning.driving_system}</Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
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
          fontWeight: 500,
        },
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
        <Typography variant="h4">Other Tunings</Typography>
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

export default function TuningDetail() {
  const navigate = useNavigate();

  const WIDTH = '100%';
  const HEIGHT = '100%';
  const name = 'Arch of Mulegé Circuit';
  const road_type = 'road';
  const track_type = 'circuit';
  const decalData = decalsWithImage[3];
  // DecalData;
  return (
    <Container sx={{ height: '140vh', marginTop: 70 }}>
      <FullSizeCenteredFlexBox
        sx={{
          height: '100%',
        }}
      >
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
            flexDirection: 'column',
            paddingY: 2,
            marginTop: 20,
            paddingX: 2,
            rowGap: 2,
          }}
          component={Paper}
        >
          {/* 제목 */}
          {/* <TitlePart /> */}
          {/* 튜닝 태그, 게시자, 공유 코드 */}
          <TuningInfo tuning={tunings[0]} />
          {/* 트랙 사진들 */}
          <TuningImages tuning={tunings[0]} />
          {/* 데칼에 사용된 차 간단 정보 */}
          <BaseCarInfo />
          {/* 관련 영상 */}
          <RelatedVideos />
          {/* 관련 다른 튜닝들 */}
          <RelatedTunings />
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
