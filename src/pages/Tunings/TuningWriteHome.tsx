import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { Box, Button, Container, Typography } from '@mui/material';

import { FlexBox, FullSizeCenteredFlexBox, Image } from '@/components/styled';
import { StyledLink } from '@/components/styled';

export default function TuningWrite() {
  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox sx={{ width: '100%', paddingBottom: 10, paddingTop: 4 }}>
        <FlexBox>
          <StyledLink to={'/FH5/tuning/write/detail'}>tuning write detail</StyledLink>
        </FlexBox>
        <FlexBox>
          <StyledLink to={'/FH5/tuning/write/detail'}>tuning write bulk</StyledLink>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
