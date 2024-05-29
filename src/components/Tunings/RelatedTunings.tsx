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

export default function RelatedTunings() {
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
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
        <Pagination count={10} page={page} onChange={handleChange} size="large" />
      </FlexBox>
    </FlexBox>
  );
}
