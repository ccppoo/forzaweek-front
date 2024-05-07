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

import { ButtonBaseDemo, ImageButton } from './ImageButton';
import { ButtonBaseDemo2 } from './ImageButton2';
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

export default function Home() {
  const navigate = useNavigate();
  const YEAR = 2020;
  const BRAND = 'Chevrolet';
  const MODEL_NAME = 'Corvette Stingray Coupe';
  const PI_NUMER = 999;

  const CREATED_AT = '2024-05-07';
  const TIME_PASSED_SINCE_UPLOAD = '3h';
  const CREATOR_NAME = 'Kent Dodds';
  const TITLE = 'Tunging for full grip and stable for street tracks';
  const UP_VOTE = 109;
  const DOWN_VOTE = 23;
  const COMMENT_COUNT = 5;

  return (
    <Container sx={{ height: '120vh' }}>
      <FullSizeCenteredFlexBox sx={{}}>
        <FlexBox
          sx={{
            flexDirection: 'column',
            minWidth: 320,
            maxWidth: 600,
            width: 400,
            backgroundColor: '#ECE3CE',
            paddingY: 1,
          }}
        >
          {/* body */}
          <FlexBox sx={{ flexDirection: 'row', columnGap: 2 }}>
            <FlexBox sx={{ flexDirection: 'column', width: '100%' }}>
              {/* creator */}
              <FlexBox
                sx={{
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  paddingX: 0.5,
                  paddingBottom: 0.5,
                  paddingTop: 0.5,
                  flexDirection: 'row',
                  columnGap: 1,
                }}
              >
                <Avatar
                  {...stringAvatar(CREATOR_NAME)}
                  sx={{ width: 27, height: 27, fontSize: 15 }}
                />
                <FlexBox>
                  <Typography>{CREATOR_NAME}</Typography>
                </FlexBox>
                <FlexBox>
                  <Typography
                    sx={{
                      opacity: 0.5,
                    }}
                  >
                    {TIME_PASSED_SINCE_UPLOAD}
                  </Typography>
                </FlexBox>
              </FlexBox>
              {/* Title */}
              <FlexBox sx={{ columnGap: 0.5, rowGap: 1, paddingX: 1 }}>
                <Typography variant="h6">{TITLE}</Typography>
              </FlexBox>
              {/* Image */}
              <FlexBox sx={{}}>
                <Image src={image.chevrolet_corvette_2020} />
              </FlexBox>
              <FlexBox
                sx={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ECE3CE',
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  flexDirection: 'column',
                  rowGap: 1,
                }}
              >
                {/* Car name, Class */}
                <FlexBox sx={{ flexDirection: 'column', paddingX: 0.5, paddingBottom: 1.2 }}>
                  <FlexBox sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <FlexBox sx={{ flexDirection: 'column' }}>
                      <Typography fontSize={21}>{MODEL_NAME}</Typography>
                      <FlexBox
                        sx={{ rowGap: 1, columnGap: 1, paddingLeft: 0.3, alignItems: 'center' }}
                      >
                        <Typography fontSize={15}>{BRAND}</Typography>
                        <YearCard year={YEAR} />
                      </FlexBox>
                    </FlexBox>
                    <PI_Card height={35} pi_number={PI_NUMER} />
                  </FlexBox>
                </FlexBox>

                {/* <Divider /> */}
                {/* Tags */}
                <FlexBox sx={{ columnGap: 0.5, rowGap: 1, paddingX: 0.5 }}>
                  <Chip label="Full grip" />
                  <Chip label="all around" />
                  <Chip label="street" />
                </FlexBox>
                {/* Score, comments */}
                <FlexBox
                  sx={{
                    justifyContent: 'start',
                    alignItems: 'center',
                    columnGap: 1,
                    paddingX: 0.5,
                    paddingTop: 1,
                  }}
                >
                  {/* if clicked, change to ForwardIcon */}
                  <FlexBox
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '.5px solid #131313',
                      borderRadius: 6,
                      height: 36,
                    }}
                  >
                    <IconButton sx={{ borderRadius: 6 }} size="small">
                      <ForwardOutlinedIcon sx={{ transform: 'rotate(270deg)' }} />
                    </IconButton>
                    <Typography>{UP_VOTE - DOWN_VOTE}</Typography>
                    <IconButton sx={{ borderRadius: 6 }} size="small">
                      <ForwardOutlinedIcon sx={{ transform: 'rotate(90deg)' }} />
                    </IconButton>
                  </FlexBox>

                  {/* comments count */}
                  <FlexBox
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '.5px solid #131313',
                      borderRadius: 6,
                      paddingLeft: 1,
                      paddingRight: 1,
                      height: 36,
                      '&:hover, &.Mui-focusVisible': {
                        backgroundColor: '#F0F0F0',
                      },
                    }}
                  >
                    <ChatBubbleOutlineOutlinedIcon sx={{ width: 24, height: 24, marginX: 0.5 }} />
                    <FlexBox sx={{ minWidth: 12, width: '100%', paddingX: 0.5 }}>
                      <Typography>{COMMENT_COUNT}</Typography>
                    </FlexBox>
                  </FlexBox>
                  {/* share button */}
                  <FlexBox
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '.5px solid #131313',
                      borderRadius: 6,
                      paddingLeft: 1,
                      paddingRight: 1,
                      height: 36,
                      '&:hover, &.Mui-focusVisible': {
                        backgroundColor: '#F0F0F0',
                      },
                    }}
                    component={ButtonBase}
                  >
                    <IosShareOutlinedIcon sx={{ width: 24, height: 24, marginX: 0.5 }} />
                    <FlexBox
                      sx={{ minWidth: 12, width: '100%', paddingLeft: 0.2, paddingRight: 0.5 }}
                    >
                      <Typography>Share</Typography>
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
                {/* <Divider /> */}
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
