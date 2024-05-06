import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { height } from '@mui/system';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

const Title = styled(Typography)({
  fontSize: 25,
});

function Home() {
  const navigate = useNavigate();

  return (
    <Container sx={{ height: '120vh' }}>
      <FullSizeCenteredFlexBox sx={{ flexWrap: 1 }}>
        <FlexBox>a</FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

export default Home;
