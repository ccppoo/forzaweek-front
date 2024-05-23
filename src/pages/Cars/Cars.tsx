import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import CarSearch from './CarsSreach';

export const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

export default function Cars() {
  const navigate = useNavigate();

  return (
    <Container sx={{ height: '120vh' }}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingTop: 1 }}>
        {/* <NewCars /> */}
        <CarSearch />
      </FlexBox>
    </Container>
  );
}
