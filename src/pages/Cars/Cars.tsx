import { useNavigate } from 'react-router-dom';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ForwardIcon from '@mui/icons-material/Forward';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import ButtonGroup from '@mui/material/ButtonGroup';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { height } from '@mui/system';

import * as image from '@/image';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import CarSearch from './CarsSreach';
import NewCars from './NewCars';
import { Image } from './styled';

export const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Title = styled(Typography)({
  fontSize: 25,
});

function get_pi_class(pi_number: number): string {
  if (pi_number <= 500) return 'D';
  if (pi_number <= 600) return 'C';
  if (pi_number <= 700) return 'B';
  if (pi_number <= 800) return 'A';
  if (pi_number <= 900) return 'S1';
  if (pi_number <= 998) return 'S2';
  return 'X';
}

function get_pi_color(pi_number: number): string {
  if (pi_number <= 500) return '#03e8fc';
  if (pi_number <= 600) return '#ebe30e';
  if (pi_number <= 700) return '#f2881d';
  if (pi_number <= 800) return '#f03518';
  if (pi_number <= 900) return '#b94fe3';
  if (pi_number <= 998) return '#164ff7';
  return '#32e60e';
}

function PI_Card({ pi_number, height }: { pi_number: number; height: number }) {
  const PI_CLASS = get_pi_class(pi_number);
  const PI_COLOR = get_pi_color(pi_number);

  return (
    <FlexBox
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: height,
        width: height * 2.5,
      }}
    >
      <FlexBox
        sx={{
          aspectRatio: '1/1',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 25,
          height: height,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          backgroundColor: PI_COLOR,
        }}
      >
        <Typography fontWeight="fontWeightMedium" color="white" sx={{}}>
          {PI_CLASS}
        </Typography>
      </FlexBox>
      <FlexBox
        sx={{
          backgroundColor: 'white',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          minWidth: 50,
          width: height * 1.5,
          height: height,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography fontWeight="fontWeightMedium">{pi_number}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

function get_year_color(year: number): string {
  if (year < 1930) return '#AB933C';
  if (year < 1940) return '#345D98';
  if (year < 1950) return '#B38069';
  if (year < 1960) return '#68BBB8';
  if (year < 1970) return '#758C33';
  if (year < 1980) return '#CA7CD8';
  if (year < 1990) return '#287E9E';
  if (year < 2000) return '#E33056';
  if (year < 2010) return '#2BD566';
  if (year < 2020) return '#85e309';
  if (year < 2030) return '#093ce3';
  return '#1ed6d9';
}

function YearCard({ year }: { year: number }) {
  const YEAR_COLOR = get_year_color(year);
  return (
    <FlexBox
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 50,
        minHeight: 25,
        backgroundColor: YEAR_COLOR,
        borderRadius: 1,
      }}
    >
      <Typography fontSize={15} fontWeight="fontWeightMedium" color="white">
        {year}
      </Typography>
    </FlexBox>
  );
}
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

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
