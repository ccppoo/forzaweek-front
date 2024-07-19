import { Box, Paper, Typography } from '@mui/material';

import PerformanceRadarChart from '@/components/FormInputs/PerformanceRadarChart';
import { FlexBox } from '@/components/styled';
import type { PerformanceTrait } from '@/types/car';
import { getFormPath } from '@/utils/FormInput';

import SliderValueInput from './SliderValueInput';

export default function TuningPerformance() {
  const performanceTraits: PerformanceTrait[] = [
    'acceleration',
    'speed',
    'braking',
    'offroad',
    'launch',
    'handling',
  ];

  const formPathBase = ['performance'];

  const PERFORMANCE_MAX = 10;
  const PERFORMANCE_MIN = 0;
  const PERFORMANCE_STEP = 0.1;

  return (
    <FlexBox
      sx={{ width: '100%', height: '100%', minHeight: 400, flexDirection: 'column', rowGap: 2 }}
    >
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingBottom: 2, height: '100%' }}>
        <FlexBox>
          <Typography variant="h5">Performance</Typography>
        </FlexBox>
        <FlexBox sx={{ width: '100%', minWidth: 500, height: '100%' }} component={Paper}>
          <FlexBox sx={{ width: '100%' }}>
            <PerformanceRadarChart />
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
                  <SliderValueInput
                    min={PERFORMANCE_MIN}
                    max={PERFORMANCE_MAX}
                    step={PERFORMANCE_STEP}
                    name={trait}
                    formPath={getFormPath(formPathBase, [trait])}
                    key={`tuning-performance-input-slide-${trait}-${idx}`}
                  />
                );
              })}
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
