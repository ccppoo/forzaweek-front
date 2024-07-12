import { Box, Paper, Typography } from '@mui/material';

import { FlexBox } from '@/components/styled';

import TestReadingMaxSpeed from './MaxSpeed';
import TestReadingOutput from './Output';
import TestReadingSkidPad from './SkidPad';
import TestReadingTork from './Tork';
import TestReadingWeight from './Weight';
import TestReadingZero100 from './Zero100';

export default function TestReadingInput() {
  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 2, width: '100%' }}>
      <FlexBox>
        <Typography variant="h5">Test Readings</Typography>
      </FlexBox>
      <Box
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: 'repeat(3, 80px)',
          rowGap: 1,
          columnGap: 10,
          paddingX: 1,
        }}
        component={Paper}
      >
        <TestReadingMaxSpeed />
        <TestReadingZero100 />
        <TestReadingOutput />
        <TestReadingTork />
        <TestReadingWeight />
        <TestReadingSkidPad />
      </Box>
    </FlexBox>
  );
}
