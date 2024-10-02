import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

import { mainSocketConfig } from '@/api/globalSocket';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

import { HotWheelsEvent } from './HotWheelsEvent';
import { RallyAdventureEvent } from './RallyAdventureEvent';
import { SeasonChallenge } from './SeasonChallenge';
import { SeasonEvent } from './SeasonEvent';

function ForzathonWeeklyChallenge() {
  return <FlexBox></FlexBox>;
}

export default function SeasonDetail() {
  const navigate = useNavigate();

  return (
    <Container sx={{ height: '100%' }} maxWidth={'xl'}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
        <SeasonEvent />
        <SeasonChallenge />
        <RallyAdventureEvent />
        <HotWheelsEvent />
      </FlexBox>
    </Container>
  );
}
