import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

import { DecalCellListing } from '@/components/Decals';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import DecalCarSelection from './DecalCarSearchFilter';

export default function Decals() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <Container sx={{ paddingTop: 5 }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column' }}>
        <DecalCarSelection />
        <DecalCellListing />
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
