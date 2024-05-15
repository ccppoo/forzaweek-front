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
import MainFullBanner from '@/components/MainFullBanner';
import PostCard from '@/components/PostCard';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import { Image } from './styled';

const new_cars = [
  {
    name: 'BMW #1 BMW M Motorsport M8 GTE',
    year: 2018,
    image: image.car.bmwm8,
  },
  {
    name: 'Cadillac #3 Cadillac Racing ATS-V.R',
    year: 2015,
    image: image.car.cadillac3ats,
  },
  {
    name: 'Chevrolet #3 Corvette Racing C8.R',
    year: 2020,
    image: image.car.chevroletC8R,
  },
  {
    name: 'Lexus #14 VASSER SULLIVAN RC F GT3',
    year: 2020,
    image: image.car.lexus14RC,
  },
];

function NewCarPreview() {
  const TITLE = 'GT Racers Rush Through Mexico’s Roads in Apex AllStars';
  const BODY = 'GT Racers Rush Through Mexico’s Roads in Apex AllStars';

  const W = 360;
  const H = 270;

  return (
    <FlexBox
      sx={{
        minWidth: W,
        width: W,
        minHeight: H,
        height: H,
        border: '1px black solid',
        borderRadius: 1,
      }}
    >
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ padding: 1 }}>
          <Image
            src={image.series_33}
            sx={{
              // width: '100%',
              objectFit: 'contain',
            }}
          />
        </FlexBox>

        <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingX: 1 }}>
          <Typography>{TITLE}</Typography>
          {/* <Typography>{BODY}</Typography> */}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function NewCarPreviewCard() {
  const TITLE = 'GT Racers Rush Through Mexico’s Roads in Apex AllStars';
  const BODY = 'GT Racers Rush Through Mexico’s Roads in Apex AllStars';

  const NAME = 'BMW #1 BMW M Motorsport M8 GTE';
  const YEAR = 2018;
  const IMAGE = image.car.bmwm8;

  const H = 200;

  return (
    <Grid
      sx={
        {
          // height: H,
        }
      }
      xs={12}
      md={3}
    >
      <FlexBox
        sx={{
          flexDirection: 'column',
          padding: 0.5,
          border: '1px black solid',
          borderRadius: 1,
          height: 200,
        }}
      >
        <FlexBox
          sx={{
            height: '70%',
          }}
        >
          <Image
            src={IMAGE}
            sx={{
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </FlexBox>
        <FlexBox
          sx={{
            flexDirection: 'column',
            justifyContent: 'end',
            height: '30%',
            paddingX: 0.5,
          }}
        >
          <Typography>{NAME}</Typography>
        </FlexBox>
      </FlexBox>
    </Grid>
  );
}

function AddedNewCarsDLC() {
  // new_cars

  const DLC_NAME = 'Forza Horizon 5 Apex Allstars Car Pack';
  return (
    <FlexBox sx={{ flexDirection: 'column', rowGap: 1, paddingBottom: 2 }}>
      <FlexBox sx={{ paddingLeft: 1, columnGap: 2 }}>
        <Typography variant="h5">DLC</Typography>
        <Typography variant="h5">{DLC_NAME}</Typography>
      </FlexBox>
      <Grid
        container
        sx={{
          width: '100%',
        }}
        columnSpacing={{ xs: 1, md: 1 }}
        rowSpacing={{ xs: 1, md: 1 }}
      >
        <NewCarPreviewCard />
        <NewCarPreviewCard />
      </Grid>
    </FlexBox>
  );
}

export default function NewCars() {
  const Title = 'Recently Added';
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      {/* Title */}
      <FlexBox sx={{ paddingBottom: 2 }}>
        <Typography variant="h4">{Title}</Typography>
      </FlexBox>
      {/* DLC 추가된 차 */}
      <AddedNewCarsDLC />
      {/* 주간 이벤트 보상으로 추가된 차 */}
      <AddedNewCarsDLC />
    </FlexBox>
  );
}
