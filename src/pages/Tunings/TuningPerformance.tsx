import { SyntheticEvent, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { SubmitErrorHandler } from 'react-hook-form';

import {
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  List,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import Container from '@mui/material/Container';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

import { FlexBox } from '@/components/styled';

import { chartOptions } from './charOption';

type TestReading = {
  name: string;
  value: number | null;
  unit?: string;
};

const testReadings: TestReading[] = [
  {
    name: '최고속도',
    value: 298.5,
    unit: 'km/h',
  },
  {
    name: '0-100km/h',
    value: 5.671,
    unit: '초',
  },
  {
    name: '출력',
    value: 665,
    unit: 'ps',
  },
  {
    name: '토크',
    value: 70,
    unit: 'kg·m',
  },
  {
    name: '중량',
    value: 1450,
    unit: 'kg',
  },
  {
    name: '횡Gs',
    value: 1.56,
  },
];
const performaceDefault = [4.5, 6.1, 9.1, 7.6, 5.7, 7.7];

function PerformaceChartInput() {
  const [performance, setPerformance] = useState<number[]>(performaceDefault);

  const series = [
    {
      name: 'performance',
      data: performance,
    },
  ];

  const MAX = 10;
  const MIN = 0;
  const performanceTraits = ['가속', '속도', '제동력', '오프로드', '출발 속력', '핸들링'];

  return (
    <FlexBox sx={{ width: '100%' }}>
      <ReactApexChart
        series={series}
        options={chartOptions}
        width={500}
        height={'100%'}
        type="radar"
        id={`tuning-detail-radar-chart-${1}`}
      />
      <FlexBox
        sx={{
          flexDirection: 'column',
          width: '100%',
          rowGap: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {performanceTraits.map((trait, idx) => {
          return (
            <>
              <FlexBox
                sx={{ width: '100%', columnGap: 2, justifyContent: 'center' }}
                key={`performance-trait-input-${trait}`}
              >
                <FlexBox sx={{ alignItems: 'center', width: 100 }}>
                  <Typography>{trait}</Typography>
                </FlexBox>
                <FlexBox>
                  <TextField
                    id="outlined-controlled"
                    size="small"
                    autoComplete="off"
                    value={performance[idx]}
                    sx={{ width: 80 }}
                    inputProps={{
                      sx: {
                        textAlign: 'right',
                        '&::placeholder': {
                          textAlign: 'right',
                        },
                      },
                    }}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const newVal = event.target.value;
                      var num = Number.parseFloat(newVal);
                      if (Number.isNaN(num)) {
                        setPerformance((perf) => {
                          const newPerf = [...perf];
                          newPerf[idx] = 0;
                          return newPerf;
                        });
                        return;
                      }
                      if (Number.isFinite(num)) {
                        if (num >= MAX) {
                          num = MAX;
                        } else if (num <= MIN) {
                          num = MIN;
                        }
                        setPerformance((perf) => {
                          const newPerf = [...perf];
                          newPerf[idx] = num;
                          return newPerf;
                        });
                      }
                    }}
                  />
                </FlexBox>
              </FlexBox>
              {performanceTraits.length - 1 != idx && <Divider flexItem />}
            </>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
}

function TestReadingInput() {
  return (
    <Box
      sx={{
        display: 'grid',
        width: '100%',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: 'repeat(2, 50px)',
      }}
    >
      {testReadings.map((reading) => {
        return (
          <FlexBox key={`test-reading-input-${reading.name}`} sx={{ columnGap: 2 }}>
            <FlexBox sx={{ alignItems: 'center', height: '100%', width: 100 }}>
              <Typography>{reading.name}</Typography>
            </FlexBox>
            <FlexBox sx={{ alignItems: 'center', height: '100%', columnGap: 1 }}>
              <TextField
                id="outlined-controlled"
                size="small"
                autoComplete="off"
                sx={{ width: 80 }}
                inputProps={{
                  sx: {
                    textAlign: 'right',
                    '&::placeholder': {
                      textAlign: 'right',
                    },
                  },
                }}
              />
              <Typography>{reading.unit}</Typography>
            </FlexBox>
          </FlexBox>
        );
      })}
    </Box>
  );
}
export default function TuningPerformance() {
  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 400, typography: 'body1' }}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingBottom: 2 }}>
        <FlexBox>
          <Typography variant="h5">Performance</Typography>
        </FlexBox>
        <FlexBox sx={{ width: '100%', minWidth: 500, height: 400 }}>
          <PerformaceChartInput />
        </FlexBox>
      </FlexBox>
      <Divider flexItem />
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
        <FlexBox>
          <Typography variant="h5">Test Readings</Typography>
        </FlexBox>
        <TestReadingInput />
      </FlexBox>
    </Box>
  );
}
