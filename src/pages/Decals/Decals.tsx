import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

import { DecalCellListing } from '@/components/Decals';
import { CarSearchAndSelect } from '@/components/Search';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

export default function Decals() {
  const searchScope = 'decals';
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Container sx={{ paddingTop: 1 }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column' }}>
        <CarSearchAndSelect scope={searchScope} doFinalSelect />
        <DecalCellListing />
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
