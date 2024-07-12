import { SyntheticEvent, useState } from 'react';

import { Box, Divider } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import type { FH5_META_BASE, FH5_Performance_BASE } from '@/db/schema/fh5';

// FUTURE: Forza Horizon 4
export default function CarInGameDetail_FH4({
  meta,
  performance,
}: {
  meta: FH5_META_BASE;
  performance: FH5_Performance_BASE;
}) {
  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        border: '1px black solid',
      }}
    >
      {/* 메타 정보 */}
      <Box
        sx={{
          columnGap: 1,
          display: 'grid',
          width: '50%',
          height: '100%',
          gridTemplateRows: '1fr',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        <FlexBox>디비전</FlexBox>
        <FlexBox>희귀도 + 부스트</FlexBox>
        <FlexBox>상점 가격</FlexBox>
      </Box>
      {/* 메타 정보 */}
      <Box
        sx={{
          columnGap: 1,
          display: 'grid',
          width: '50%',
          height: '100%',
          gridTemplateRows: '1fr',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}
      >
        PI 값 능력치 6각형 옆에 3x2로 능력치 숫자 (0~10)
      </Box>
    </FlexBox>
  );
}
