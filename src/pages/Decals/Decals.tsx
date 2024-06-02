import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { DecalCellListing } from '@/components/Decals';
import { CarAndTagSearch } from '@/components/Search';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

export default function Decals() {
  const searchScope = 'decals';
  const navigate = useNavigate();

  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
        {/* 차, 태그 검색 */}
        <CarAndTagSearch searchScope={searchScope} doFinalSelect />
        {/* 데칼 목록 */}
        {/* 검색 조건 선택 안되었을 경우 */}
        <DecalCellListing />
        <DecalCellListing />
        <DecalCellListing />
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
