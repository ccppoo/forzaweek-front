import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import * as image from '@/image';
import { DecalCellListing } from '@/components/Decals';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import { decals as decalImages } from '@/image/decal';

import DecalCarSelection from './DecalCarSearchFilter';
import { Image } from './styled';

const carinfo = {
  manufacture: 'Hyundai',
  year: 2021,
  country: 'Korea',
  name: '#98 Bryan Herta Autosport Elantra N',
  drive_train: 'FWD',
  body_style: 'sedan',
  door: 4,
  engine: 'ICE',
  FH5: {
    PI: 800,
    division: 'track toys',
  },
};

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
        {/* Pagination */}
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
          <Pagination count={10} page={page} onChange={handleChange} size="large" />
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
