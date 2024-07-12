import { FlexBox } from '@/components/styled';

import PerformaceChartInput from './Inputs';

export default function TuningPerformance() {
  return (
    <FlexBox
      sx={{ width: '100%', height: '100%', minHeight: 400, flexDirection: 'column', rowGap: 2 }}
    >
      <PerformaceChartInput />
    </FlexBox>
  );
}
