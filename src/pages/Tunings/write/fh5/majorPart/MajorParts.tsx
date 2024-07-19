import { Box, Paper, Typography } from '@mui/material';

import { FlexBox } from '@/components/styled';

import TuningMajorPartsDrivingSystem from './DrivingSystem';
import TuningMajorPartsSuspension from './Suspension';
import TuningMajorPartsTire from './Tire';

export default function MajorParts() {
  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
      <FlexBox>
        <Typography variant="h5">Major Parts</Typography>
      </FlexBox>
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: '120px',
          columnGap: 5,
          paddingX: 1,
        }}
        component={Paper}
      >
        <TuningMajorPartsTire />
        <TuningMajorPartsSuspension />
        <TuningMajorPartsDrivingSystem />
      </Box>
    </FlexBox>
  );
}
