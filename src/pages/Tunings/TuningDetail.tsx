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
import { BaseCarInfo } from '@/components/Car';
import Comments from '@/components/Comment';
import { PI_Card } from '@/components/PI';
import { RelatedTunings } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
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
          {/* 제목 */}
          {/* <TitlePart /> */}
          {/* 튜닝 태그, 게시자, 공유 코드 */}
          <TuningInfo tuning={tunings[0]} />
          {/* 트랙 사진들 */}
          <TuningImages tuning={tunings[0]} />
          {/* 튜닝에 사용된 차 간단 정보 */}
          <BaseCarInfo />
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
