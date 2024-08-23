import { useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

export default function TagList() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 4, paddingTop: 20 }}>
        tag list
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
