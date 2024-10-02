import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { mainSocketConfig } from '@/api/globalSocket';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function MonthlyRivals() {
  // https://fzwcdn.forzaweek.com/static/FH5/icon/season/monthly_rival.png

  const name = '플라자 서킷';
  const reward = 'Forza Link - wha tntkdgksepdy';

  const seasonPoint = 4;
  return (
    <FlexBox>
      {/* sub title */}
      <Typography>월간 라이벌</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* Photo Challenge 아이콘 */}
      {/* 시즌 점수 */}
      <Typography>{seasonPoint} 점</Typography>

      {/* 보상 */}
    </FlexBox>
  );
}

export function SeasonChallenge() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <Typography variant="h4">Monthly Event</Typography>
      <MonthlyRivals />
    </FlexBox>
  );
}
