import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import * as image from '@/image';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import { Image } from './styled';

function ImageListTemp() {
  return (
    <>
      <FlexBox
        sx={{
          width: '100%',
          height: '80%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FlexBox
          sx={{
            maxWidth: '100%',
            height: '100%',
          }}
        >
          <Image src={image.decal.elantra_front2} sx={{ objectFit: 'contain' }} />
        </FlexBox>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          height: '20%',
          paddingTop: 0.2,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <FlexBox
          sx={{
            width: '8%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowBackIosIcon />
        </FlexBox>
        <FlexBox
          sx={{
            width: '84%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 1,
          }}
        >
          <FlexBox
            sx={{
              maxWidth: '100%',
              height: '100%',
            }}
          >
            <Image src={image.decal.elantra_front2} sx={{ objectFit: 'contain' }} />
          </FlexBox>
          <FlexBox
            sx={{
              maxWidth: '100%',
              height: '100%',
            }}
          >
            <Image src={image.decal.elantra_back3} sx={{ objectFit: 'contain' }} />
          </FlexBox>
          <FlexBox
            sx={{
              maxWidth: '100%',
              height: '100%',
            }}
          >
            <Image src={image.decal.elantra_front1} sx={{ objectFit: 'contain' }} />
          </FlexBox>
        </FlexBox>

        <FlexBox
          sx={{
            width: '8%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowForwardIosIcon />
        </FlexBox>
      </FlexBox>
    </>
  );
}

function TrackInfo() {}

function TrackInfoSummary() {
  const name = 'Arch of Mulegé Circuit';
  const road_type = 'road';
  const track_type = 'circuit';
  const description = 'design of Hyundai elantra, its my style';
  const maker = 'DecalMaster';
  const share_code = '123 123 123';

  const Tags = [];

  return (
    <FlexBox sx={{ width: '30%', height: '100%', padding: 1 }}>
      <Paper sx={{ display: 'flex' }} elevation={3}>
        <FlexBox sx={{ flexDirection: 'column', paddingX: 1, paddingTop: 1 }}>
          {/* 자동차 사진 */}
          <FlexBox>
            <Image src={image.track.molehach} sx={{ objectFit: 'contain' }} />
          </FlexBox>
          {/* 자동차 이름, 간단 설명 + 제작자 / 공유 코드 */}
          <FlexBox
            sx={{
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <FlexBox sx={{ flexDirection: 'column' }}>
              <Typography variant="h6">{name}</Typography>
              <Typography>
                {road_type} {track_type}
              </Typography>
            </FlexBox>
            <FlexBox>
              <Typography>{description}</Typography>
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column' }}>
              <Typography variant="h6">{maker}</Typography>
              <Typography variant="h6">{share_code}</Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Paper>
    </FlexBox>
  );
}

function TrackTitle() {
  const name = 'Arch of Mulegé Circuit';
  const road_type = 'road';
  const track_type = 'circuit';
  const laps = 3;
  const description = 'design of Hyundai elantra, its my style';
  const maker = 'DecalMaster';
  const share_code = '123 123 123';
  const height = 75;
  return (
    <FlexBox sx={{ width: '100%', columnGap: 1, height: height, paddingLeft: 1, paddingTop: 1 }}>
      <FlexBox sx={{ aspectRatio: '1/1' }}>
        <Image src={image.track_icon.road_track} sx={{ objectFit: 'contain' }} />
      </FlexBox>
      <FlexBox sx={{ flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h5">{name}</Typography>
        <FlexBox sx={{ columnGap: 2 }}>
          <Typography variant="h6">{road_type}</Typography>
          <Typography variant="h6">{track_type}</Typography>
          <Typography variant="h6">{laps} laps</Typography>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TrackPreview() {
  return (
    <FlexBox
      sx={{
        maxWidth: '100%',
        height: '100%',
        justifyContent: 'start',
      }}
    >
      <Image src={image.track.molehach} sx={{ objectFit: 'contain' }} />
    </FlexBox>
  );
}

function TrackStory() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <Typography variant="h6">story</Typography>
      <Typography variant="body2">run track !!</Typography>
    </FlexBox>
  );
}

function TrackTags() {
  return;
}

export default function Tracks() {
  const navigate = useNavigate();

  const WIDTH = '80%';
  const HEIGHT = 100;
  const name = 'Arch of Mulegé Circuit';
  const road_type = 'road';
  const track_type = 'circuit';
  const description = 'design of Hyundai elantra, its my style';
  const maker = 'DecalMaster';
  const share_code = '123 123 123';
  const laps = 3;

  return (
    <Container sx={{ height: '100vh' }}>
      <FullSizeCenteredFlexBox sx={{}}>
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
            height: HEIGHT,
            justifyContent: 'space-between',
          }}
          component={Paper}
        >
          <FlexBox sx={{ columnGap: 1 }}>
            <FlexBox
              sx={{
                aspectRatio: '1/1',
                height: '100%',
              }}
            >
              <Image
                src={image.track_icon.road_track}
                sx={{
                  objectFit: 'contain',
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                }}
              />
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column' }}>
              <Typography variant="h5">{name}</Typography>
              <FlexBox sx={{ columnGap: 1 }}>
                <Typography variant="h6">{road_type}</Typography>
                <Typography variant="h6">{track_type}</Typography>
                <Typography variant="h6">{laps} laps</Typography>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <TrackPreview />
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
