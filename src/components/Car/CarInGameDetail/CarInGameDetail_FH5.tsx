import { SyntheticEvent, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

import { Box, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { PI_Card } from '@/components/PI';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { CarFH5Input, CarFH5Type } from '@/schema/fh5/types';

import { chartOptions } from './chartOption';

type Series = {
  name: string;
  data: number[];
};

function PerformanceRadarChart({ series }: { series: Series[] }) {
  const RADAR_CHART_WIDTH = 100;
  const RADAR_CHART_HEIGHT = 100;

  // console.log(`series : ${series}`);

  return (
    <ReactApexChart
      series={series}
      options={chartOptions}
      width={RADAR_CHART_WIDTH}
      height={RADAR_CHART_HEIGHT}
      type="radar"
      id={`car-info-radar-chart-${1}`}
    />
  );
}

function setFontSize(target: string): number {
  if (target.length < 12) return 21;
  if (target.length < 18) return 16;
  if (target.length < 21) return 15;
  return 15;
}

export default function CarInGameDetail_FH5({ carFH5 }: { carFH5: CarFH5Type }) {
  // const series = [
  //   {
  //     name: 'performance',
  //     data: [
  //       performance.acceleration,
  //       performance.speed,
  //       performance.braking,
  //       performance.offroad,
  //       performance.launch,
  //       performance.handling,
  //     ],
  //   },
  // ];

  const DIVISION = carFH5.meta.division;
  const DIVISION_FONT_SIZE = setFontSize(carFH5.meta.division);
  return (
    <Box
      sx={{
        display: 'grid',
        width: '100%',
        height: '100%',
        border: '1px black solid',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      {/* 메타 정보 */}
      <Box
        sx={{
          columnGap: 1,
          display: 'grid',
          width: '100%',
          height: '100%',
          gridTemplateRows: '1fr',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        <FlexBox
          sx={{
            height: '100%',
            flexDirection: 'column',
            rowGap: 1,
            justifyContent: 'center',
          }}
        >
          <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 200 }}>Divison</Typography>
          </FlexBox>
          <FlexBox sx={{ width: '100%', justifyContent: 'center', alignItems: 'start' }}>
            <Divider variant="middle" sx={{ margin: 0 }} />
          </FlexBox>
          <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: DIVISION_FONT_SIZE, fontWeight: 400, textAlign: 'center' }}>
              {DIVISION}
            </Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox
          sx={{
            height: '100%',
            flexDirection: 'column',
            rowGap: 1,
            justifyContent: 'center',
          }}
        >
          <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 200 }}>Rarity</Typography>
          </FlexBox>
          <FlexBox sx={{ width: '100%', justifyContent: 'center', alignItems: 'start' }}>
            <Divider variant="middle" sx={{ margin: 0 }} />
          </FlexBox>
          <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 400 }}>{carFH5.meta.rarity}</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox
          sx={{
            height: '100%',
            flexDirection: 'column',
            rowGap: 1,
            justifyContent: 'center',
          }}
        >
          <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: 16, fontWeight: 200 }}>Value</Typography>
          </FlexBox>
          <FlexBox sx={{ width: '100%', justifyContent: 'center', alignItems: 'start' }}>
            <Divider variant="middle" sx={{ margin: 0 }} />
          </FlexBox>
          <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Typography sx={{ fontSize: 18, fontWeight: 400 }}>
              {carFH5.meta.value.toLocaleString()} CR
            </Typography>
          </FlexBox>
        </FlexBox>
      </Box>
      {/* performance 정보 */}
      <Box
        sx={{
          columnGap: 1,
          display: 'grid',
          width: '100%',
          height: '100%',
          minHeight: 96,
          gridTemplateRows: '1fr',
          gridTemplateColumns: '2fr 5fr',
        }}
      >
        <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <PI_Card height={40} pi_number={carFH5.PI} />
        </FlexBox>
        <FlexBox
          sx={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            columnGap: 2,
          }}
        >
          {/* <PerformanceRadarChart series={series} /> */}
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr 1fr',
              columnGap: 3,
            }}
          >
            <FlexBox sx={{ width: '100%', justifyContent: 'space-between', paddingX: 1 }}>
              <Typography>Acceleration</Typography>
              <Typography>{carFH5.performance.acceleration}</Typography>
            </FlexBox>
            <FlexBox sx={{ width: '100%', justifyContent: 'space-between', paddingX: 1 }}>
              <Typography>Speed</Typography>
              <Typography>{carFH5.performance.speed}</Typography>
            </FlexBox>
            <FlexBox sx={{ width: '100%', justifyContent: 'space-between', paddingX: 1 }}>
              <Typography>Braking</Typography>

              <Typography>{carFH5.performance.braking}</Typography>
            </FlexBox>
            <FlexBox sx={{ width: '100%', justifyContent: 'space-between', paddingX: 1 }}>
              <Typography>Offroad</Typography>
              <Typography>{carFH5.performance.offroad}</Typography>
            </FlexBox>
            <FlexBox sx={{ width: '100%', justifyContent: 'space-between', paddingX: 1 }}>
              <Typography>Launch</Typography>
              <Typography>{carFH5.performance.launch}</Typography>
            </FlexBox>
            <FlexBox sx={{ width: '100%', justifyContent: 'space-between', paddingX: 1 }}>
              <Typography>Handling</Typography>
              <Typography>{carFH5.performance.handling}</Typography>
            </FlexBox>
          </Box>
        </FlexBox>
      </Box>
    </Box>
  );
}
