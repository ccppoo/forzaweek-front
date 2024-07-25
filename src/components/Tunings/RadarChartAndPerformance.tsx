import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { PI_Card } from '@/components/PI';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import type { Tuning } from '@/data/tunings';

import TestReadingAndSystem from './TestReadingAndSystem';
import { chartOptions } from './chartOption';

export default function RadarChartAndPerformance({ tuning }: { tuning: TuningSchemaType }) {
  const series = [
    {
      name: 'performance',
      data: [
        tuning.performance.acceleration!,
        tuning.performance.speed!,
        tuning.performance.braking!,
        tuning.performance.offroad!,
        tuning.performance.launch!,
        tuning.performance.handling!,
      ],
    },
  ];

  console.log(`tuning pi : ${tuning.pi}`);

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: 400,
        justifyContent: 'center',
      }}
    >
      <FlexBox sx={{ height: 400, aspectRatio: '1/1', border: '1px black solid' }}>
        {/* 성능 육각형 레이더 그래프 */}
        <FlexBox sx={{ width: 0, position: 'static', paddingTop: 1, paddingLeft: 1 }}>
          <PI_Card height={30} pi_number={tuning.pi} />
        </FlexBox>
        <ReactApexChart
          series={series}
          options={chartOptions}
          width={500}
          height={'100%'}
          type="radar"
          id={`tuning-detail-radar-chart-${tuning.share_code}`}
        />
      </FlexBox>
      <TestReadingAndSystem tuning={tuning} />
    </FlexBox>
  );
}
