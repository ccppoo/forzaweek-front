import { useState } from 'react';

import Container from '@mui/material/Container';

import { DecalCellListing } from '@/components/Decals';
import PostListMenu from '@/components/Post/PostListMenu';
import { CarAndTagSearch } from '@/components/Search';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import ScrollToTop from '@/hooks/useResetScroll';

import ItemListing from './ItemListing';

export default function Decals() {
  const searchScope = 'decal';

  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column', rowGap: 2 }}>
        {/* 차, 태그 검색 */}
        <CarAndTagSearch searchScope={searchScope} doFinalSelect />
        {/* 글쓰기, 등  */}
        <PostListMenu scope={searchScope} write />

        {/* TODO: 검색 조건 선택 안되었을 경우 추천 차 보여주기 */}
        <ItemListing scope={searchScope} />
        <DecalCellListing />
        <DecalCellListing />
        <DecalCellListing />
      </FullSizeCenteredFlexBox>
      <ScrollToTop />
    </Container>
  );
}
