import { Box, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import Meta from '@/components/Meta';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { useSubscriber } from '@/socket/subscriber';

import { Image } from './styled';

function Dev() {
  return (
    <>
      <Meta title="Test" />
      <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4 }}>
          <FlexBox sx={{ width: '100%', height: 800, pt: 5 }}></FlexBox>
        </FullSizeCenteredFlexBox>
      </Container>
    </>
  );
}

export default Dev;
