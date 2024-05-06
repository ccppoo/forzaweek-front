import Chart from 'react-apexcharts';

import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { useSubscriber } from '@/socket/subscriber';

import series from './series.json';
import { Image } from './styled';
import xx from './xaxis.json';

const OPTIONS = {
  chart: {
    type: 'area',
  },
  xaxis: {
    type: 'datetime',
  },
};

const SERIES = [
  {
    name: '샤인머스켓',
    data: series.샤인마스캇.temp,
  },
  {
    name: '포도',
    data: series.포도.temp,
  },
  {
    name: '청포도',
    data: series.청포도.temp,
  },
];

function Dev() {
  return (
    <>
      <Meta title="Test" />
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4 }}>
          <FlexBox sx={{ width: '100%', height: 800, pt: 5 }}>
            <Chart options={OPTIONS} series={SERIES} type="line" width="1200px" height="800px" />
          </FlexBox>
        </FullSizeCenteredFlexBox>
      </Container>
    </>
  );
}

export default Dev;
