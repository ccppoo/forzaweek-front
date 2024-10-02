import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { mainSocketConfig } from '@/api/globalSocket';
import MainFullBanner from '@/components/MainFullBanner';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

interface FestivalTitleIntf {
  festivalNumber: number;
  main?: boolean;
}

function FestivalTitle(props: FestivalTitleIntf) {
  const { festivalNumber, main } = props;
  const festivalName = '숨겨진 호라이즌';

  return (
    <FlexBox
      sx={{ justifyContent: 'center', flexDirection: 'column', width: main ? '60%' : '20%' }}
    >
      <FlexBox sx={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography>{festivalNumber}번 째 페스티벌</Typography>
        <Typography variant={main ? 'h4' : 'h6'}>{festivalName}</Typography>
      </FlexBox>
    </FlexBox>
  );
}
function Festival({}) {
  const [festivalNumber, setFestivalNumber] = useState<number>(38);

  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <FlexBox sx={{ paddingY: 2 }}>
        <FestivalTitle festivalNumber={festivalNumber - 1} />
        <FestivalTitle festivalNumber={festivalNumber} main />
        <FestivalTitle festivalNumber={festivalNumber + 1} />
      </FlexBox>
    </FlexBox>
  );
}
export default function Seasons() {
  const navigate = useNavigate();

  return (
    <Container sx={{ height: '100%' }} maxWidth={'xl'}>
      <FlexBox sx={{ flexDirection: 'column' }}>
        <Festival />
      </FlexBox>
    </Container>
  );
}
