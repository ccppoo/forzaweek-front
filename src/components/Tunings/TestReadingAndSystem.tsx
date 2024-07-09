import { useState } from 'react';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import type { Performance, TestReadings, Tuning } from '@/data/tunings';

type TestReading = {
  name: string;
  value: number | null;
  unit?: string;
};

type CarSystem = {
  name: string;
  value: string | null;
};

function TestReadingRow({ testReading }: { testReading: TestReading }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '120px 120px', gridTemplateRows: '40px' }}>
      <FlexBox sx={{ alignItems: 'center' }}>
        <Typography sx={{ color: 'white', fontWeight: 'normal' }}>{testReading.name}</Typography>
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center' }}>
        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
          {testReading.value} {testReading.unit && testReading.unit}
        </Typography>
      </FlexBox>
    </Box>
  );
}

function SystemRow({ system }: { system: CarSystem }) {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: '120px 120px', gridTemplateRows: '42px' }}>
      <FlexBox sx={{ alignItems: 'center' }}>
        <Typography sx={{ color: 'white' }}>{system.name}</Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: 100,
          alignItems: 'center',
          border: '2px white solid',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ color: 'white', fontWeight: 'bold' }}>
          {system.value?.toUpperCase()}
        </Typography>
      </FlexBox>
    </Box>
  );
}

export default function TestReadingAndSystem({ tuning }: { tuning: Tuning }) {
  const { test_reading, suspension, tier, driving_system } = tuning;

  const testReadings: TestReading[] = [
    {
      name: '최고속도',
      value: test_reading.maxspeed,
      unit: 'km/h',
    },
    {
      name: '0-100km/h',
      value: test_reading.zero100,
      unit: '초',
    },
    {
      name: '출력',
      value: test_reading.output,
      unit: 'ps',
    },
    {
      name: '토크',
      value: test_reading.tork,
      unit: 'kg·m',
    },
    {
      name: '중량',
      value: test_reading.weight,
      unit: 'kg',
    },
    {
      name: '횡Gs',
      value: test_reading.skid_pad,
    },
  ];

  const systems: CarSystem[] = [
    {
      name: '서스펜션',
      value: suspension,
    },
    {
      name: '타이어',
      value: tier,
    },
    {
      name: '구동방식',
      value: driving_system,
    },
  ];
  return (
    <FlexBox
      sx={{
        width: 300,
        flexDirection: 'column',
        rowGap: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#898a7b',
      }}
    >
      {testReadings.map((testReading) => {
        return (
          <TestReadingRow
            testReading={testReading}
            key={`test-reading-value-${testReading.name}`}
          />
        );
      })}
      {systems.map((carSystem) => {
        return <SystemRow system={carSystem} key={`car-system-${carSystem.value}`} />;
      })}
    </FlexBox>
  );
}
