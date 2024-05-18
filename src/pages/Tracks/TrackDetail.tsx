import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ForwardIcon from '@mui/icons-material/Forward';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
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

import { Image } from './styled';

function ImageListTemp() {
  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        flexDirection: 'width',
        paddingY: 1,
      }}
    >
      {/* 큰 사진 */}
      <FlexBox
        sx={{
          width: '70%',
          height: '100%',
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
      {/* 작은 사진 목록 */}
      <FlexBox
        sx={{
          width: '30%',
          height: '100%',
          padding: 1,
          backgroundColor: '#cfcccc',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <FlexBox
          sx={{
            width: '100%',
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
      </FlexBox>
    </FlexBox>
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

export default function Tracks() {
  const navigate = useNavigate();

  const WIDTH = '100%';
  const HEIGHT = '100%';
  const name = 'Arch of Mulegé Circuit';
  const road_type = 'road';
  const track_type = 'circuit';
  const laps = 3;
  const description = 'design of Hyundai elantra, its my style';
  const maker = 'DecalMaster';
  const share_code = '123 123 123';

  return (
    <Container sx={{ height: '100vh', marginBottom: 20 }}>
      <FullSizeCenteredFlexBox
        sx={{
          height: '100%',
        }}
      >
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
            height: '100%',
            flexDirection: 'column',
            paddingTop: 2,
            marginTop: 2,
            paddingX: 2,
            rowGap: 3,
          }}
          component={Paper}
        >
          {/* 제목 */}
          <FlexBox sx={{ width: '100%', height: 50 }}>
            {/* 트랙 아이콘 */}
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
            <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
              <Typography variant="h4">{name}</Typography>
            </FlexBox>
          </FlexBox>
          {/* 제목 밑에 사진이랑 특징 */}
          <FlexBox sx={{ width: '100%', height: '100%' }}>
            <FlexBox sx={{ paddingTop: 1 }}>
              {/* 트랙 사진 */}
              <FlexBox>
                <Image src={image.track.molehach} sx={{ objectFit: 'contain' }} />
              </FlexBox>
              {/* 트랙 특징 설명 */}
              <FlexBox
                sx={{
                  height: '100%',
                  flexDirection: 'column',
                  paddingLeft: 2,
                }}
              >
                <FlexBox sx={{ flexDirection: 'column' }}>
                  <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
                    <Typography variant="h6">Road Type : </Typography>
                    <Typography variant="h6">{road_type}</Typography>
                  </FlexBox>
                  <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
                    <Typography variant="h6">Track Type : </Typography>
                    <Typography variant="h6">{track_type}</Typography>
                    <Typography>laps: {laps}</Typography>
                  </FlexBox>
                </FlexBox>
                <FlexBox>
                  <Typography>{description}</Typography>
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          {/* 트랙 사진들 */}
          <FlexBox sx={{ width: '100%', flexDirection: 'column' }}>
            <FlexBox>
              <Typography variant="h5">Track picture</Typography>
            </FlexBox>

            {/* 트랙 스샷 */}
            <FlexBox sx={{ width: '100%', height: '100%' }}>
              <ImageListTemp />
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}

{
  /* <FlexBox
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
            width: '8%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ArrowForwardIosIcon />
        </FlexBox> */
}
