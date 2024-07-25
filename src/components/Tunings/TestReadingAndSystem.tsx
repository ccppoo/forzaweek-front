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

import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

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

export default function TestReadingAndSystem({ tuning }: { tuning: TuningSchemaType }) {
  const { testReadings, tuningMajorParts } = tuning;

  const testReadings_: TestReading[] = [
    {
      name: '최고속도',
      value: testReadings.maxspeed.value!,
      unit: testReadings.maxspeed.unit!,
    },
    {
      name: '0-100km/h',
      value: testReadings.zero100.value!,
      unit: testReadings.zero100.unit,
    },
    {
      name: '출력',
      value: testReadings.output.value!,
      unit: testReadings.output.unit,
    },
    {
      name: '토크',
      value: testReadings.torque.value!,
      unit: testReadings.torque.unit,
    },
    {
      name: '중량',
      value: testReadings.weight.value!,
      unit: testReadings.weight.unit!,
    },
    {
      name: '횡Gs',
      value: testReadings.skid_pad.value!,
      unit: testReadings.skid_pad.unit,
    },
  ];

  const systems: CarSystem[] = [
    {
      name: '서스펜션',
      value: tuningMajorParts.suspension!,
    },
    {
      name: '타이어',
      value: tuningMajorParts.tire!,
    },
    {
      name: '구동방식',
      value: tuningMajorParts.drivingSystem,
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
      {testReadings_.map((testReading) => {
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
