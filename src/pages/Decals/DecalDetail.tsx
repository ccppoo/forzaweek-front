import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ForwardIcon from '@mui/icons-material/Forward';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
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
import { PI_Card } from '@/components/PI';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import { decals as decalImages } from '@/image/decal';

import { Image } from './styled';

const DECAL_IMAGES = decalImages.d140535376;

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
    children: `${name[0].toUpperCase()}`,
  };
}

function TitlePart() {
  const carName = '#98 Bryan Herta Autosport Elantra N';
  return (
    <FlexBox sx={{ width: '100%', height: 50, columnGap: 1 }}>
      {/* 트랙 아이콘 */}
      <FlexBox
        sx={{
          aspectRatio: '1/1',
          height: '100%',
        }}
      >
        <Image
          src={image.manufacturer.hyundai}
          sx={{
            objectFit: 'contain',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
        <Typography variant="h4">{carName}</Typography>
      </FlexBox>
    </FlexBox>
  );
}

function Pagination() {
  return (
    <FlexBox sx={{ width: '100%', height: 50 }}>
      <FlexBox
        sx={{
          width: '20%',
          height: '100%',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        <ArrowBackIosIcon />
      </FlexBox>
      <FlexBox sx={{ width: '60%', justifyContent: 'space-around', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5, 6].map((page) => {
          return (
            <FlexBox
              sx={{
                width: 40,
                height: 25,
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px black solid',
              }}
            >
              <Typography>{page}</Typography>
            </FlexBox>
          );
        })}
      </FlexBox>
      <FlexBox
        sx={{
          width: '20%',
          height: '100%',
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <ArrowForwardIosIcon />
      </FlexBox>
    </FlexBox>
  );
}

function BaseCarInfo() {
  const carInfo = {
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

  return (
    <FlexBox sx={{ width: '100%', height: '100%', border: '1px black solid' }}>
      <FlexBox sx={{}}>
        {/* 근본이 되는 차 */}
        <FlexBox sx={{ aspectRatio: '16/9', height: 140 }}>
          <Image src={image.car.hyundaiElantra} sx={{ objectFit: 'contain' }} />
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column', paddingLeft: 2 }}>
          {/* 차 이름 */}
          <FlexBox
            sx={{
              height: 40,
              alignItems: 'center',
            }}
          >
            <FlexBox
              sx={{
                aspectRatio: '1/1',
                height: '100%',
              }}
            >
              <Image
                src={image.manufacturer.hyundai}
                sx={{
                  objectFit: 'contain',
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                }}
              />
            </FlexBox>
            <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
              <Typography variant="h5">{carInfo.name}</Typography>
            </FlexBox>
          </FlexBox>
          {/* 국적, 생산 연도, 차 체형 */}
          <FlexBox sx={{ columnGap: 1 }}>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">Country : </Typography>
              <Typography variant="h6">{carInfo.country}</Typography>
            </FlexBox>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">Year : </Typography>
              <Typography variant="h6">{carInfo.year}</Typography>
            </FlexBox>
          </FlexBox>
          <FlexBox sx={{ flexDirection: 'column' }}>
            <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
              <Typography variant="h6">body style : </Typography>
              <Typography variant="h6">{carInfo.body_style}</Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function DecalInfo({ decalData }: { decalData: DecalData }) {
  const creator = decalData.creater
    ? `[${decalData.club}] ${decalData.creater}`
    : decalData.creater;

  const share_code3 = [
    decalData.share_code.substring(0, 3),
    decalData.share_code.substring(3, 6),
    decalData.share_code.substring(6, 9),
  ];

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
      {/* 제작자 */}
      <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
        <Avatar {...stringAvatar(decalData.creater)} sx={{ width: 35, height: 35 }} />
        <Typography variant="h5">{creator}</Typography>
      </FlexBox>
      {/* 태그 */}
      <FlexBox sx={{ columnGap: 0.5 }}>
        {decalData.tags.map((tag) => {
          return <Chip label={tag} />;
        })}
      </FlexBox>
      {/* 공유 코드 */}
      <FlexBox
        sx={{
          justifyContent: 'start',
          alignItems: 'center',
        }}
      >
        <Typography>Share code : </Typography>
        <FlexBox
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 1,
            paddingX: 1,
            borderRadius: 1,
            marginLeft: 1,
            backgroundColor: '#d1d1d1',
          }}
        >
          {share_code3.map((code_peice) => {
            return (
              <Typography variant="h6" key={`decal-row-share-code-piece-${code_peice}`}>
                {code_peice}
              </Typography>
            );
          })}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function DecalImages({ decalData }: { decalData: DecalData }) {
  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',

        flexDirection: 'column',
        backgroundColor: '#cccccc',
      }}
    >
      {/* 선택된 큰 이미지 */}
      <FlexBox sx={{ width: '100%', flexDirection: 'column' }}>
        <FlexBox
          sx={{
            width: '100%',
            height: '100%',
            maxHeight: 500,
          }}
        >
          <FlexBox
            sx={{
              width: '100%',
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
              <Image src={decalData.frontImage} sx={{ objectFit: 'contain' }} />
            </FlexBox>
          </FlexBox>
        </FlexBox>
        {/* 작은 사진 목록 */}
        <FlexBox
          sx={{
            height: '100%',
            paddingX: 1,
            paddingTop: 1,
            backgroundColor: '#8c8c8c',
            flexDirection: 'row',
            // justifyContent: 'stretch',
          }}
        >
          <FlexBox
            sx={{
              width: '100%',
              height: 135,
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 1,
            }}
          >
            <FlexBox
              sx={{
                width: '5%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ArrowBackIosIcon />
            </FlexBox>
            <FlexBox
              sx={{
                width: '90%',
                height: '100%',
                flexWrap: 'nowrap',
                overflow: 'scroll',
                paddingBottom: 1,
                columnGap: 0.5,
              }}
            >
              {decalData.images.map((image) => {
                return (
                  <FlexBox
                    sx={{
                      width: '100%',
                      aspectRatio: '16/9',
                      height: 126,
                    }}
                    key={`track-preview-${image}`}
                  >
                    <Image src={image} sx={{ objectFit: 'contain' }} />
                  </FlexBox>
                );
              })}
            </FlexBox>

            <FlexBox
              sx={{
                width: '5%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ArrowForwardIosIcon />
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function RelatedTuning() {
  const carInfo = {
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

  const share_code = '123 123 123';
  return (
    <Grid xs={6} sx={{ display: 'flex', flexDirection: 'column', height: 120, padding: 1 }}>
      <Paper sx={{ display: 'flex', width: '100%', height: '100%' }} elevation={4}>
        <Grid container sx={{ width: '100%' }}>
          {/* 차 사진 */}
          <Grid xs={5} sx={{ height: '100%' }}>
            <Image
              src={image.car.hyundaiElantra}
              sx={{
                objectFit: 'contain',
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            />
          </Grid>
          {/* 차 이름/튜닝 태그, 공유 코드 */}
          <Grid xs={7} sx={{ display: 'flex', flexDirection: 'column' }}>
            <FlexBox sx={{ width: '100%' }}>
              <Typography>{carInfo.name}</Typography>
            </FlexBox>
            <FlexBox>
              <Typography>{carInfo.drive_train}</Typography>
            </FlexBox>
            <FlexBox>
              <Typography>tags : grip</Typography>
            </FlexBox>
            <FlexBox>
              <Typography>Share code : {share_code}</Typography>
            </FlexBox>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

function RelatedTunings() {
  const TUNING_CLASSES = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];
  const TUNING_NUM = {
    D: 500,
    C: 600,
    B: 700,
    A: 800,
    S1: 900,
    S2: 998,
    X: 999,
  };

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <FlexBox>
        <Typography variant="h5">Tunings</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
        {/* Tuning class */}
        <FlexBox
          sx={{
            height: 60,
            backgroundColor: '#cfcccc',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 5,
          }}
        >
          {Object.values(TUNING_NUM).map((val) => {
            return <PI_Card pi_number={val} height={40} />;
          })}
        </FlexBox>
        {/* 선택된 클래스에 있는 튜닝들 */}
        <Grid container>
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
          <RelatedTuning />
        </Grid>
      </FlexBox>
      {/* Pagination */}
      <Pagination />
    </FlexBox>
  );
}
function RelatedVideo() {
  return (
    <Grid
      xs={4}
      sx={{ padding: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <FlexBox
        sx={{ width: '100%', maxWidth: 320, aspectRatio: '16/9', border: '1px black solid' }}
      ></FlexBox>
    </Grid>
  );
}

function RelatedVideos() {
  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <FlexBox>
        <Typography variant="h5">Videos</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
        {/* Tuning class */}

        {/* 선택된 클래스에 있는 튜닝들 */}
        <Grid container>
          <RelatedVideo />
          <RelatedVideo />
          <RelatedVideo />
          <RelatedVideo />
          <RelatedVideo />
          <RelatedVideo />
        </Grid>
      </FlexBox>
      {/* Pagination */}
      <Pagination />
    </FlexBox>
  );
}

export default function DecalDetail() {
  const navigate = useNavigate();

  const WIDTH = '100%';
  const HEIGHT = '100%';
  const name = 'Arch of Mulegé Circuit';
  const road_type = 'road';
  const track_type = 'circuit';
  const decalData = decalsWithImage[3];
  // DecalData;
  return (
    <Container sx={{ height: '110vh' }}>
      <FullSizeCenteredFlexBox
        sx={{
          height: '100%',
        }}
      >
        <FlexBox
          sx={{
            width: WIDTH,
            maxWidth: 1200,
            flexDirection: 'column',
            paddingY: 2,
            marginTop: 20,
            paddingX: 2,
            rowGap: 2,
          }}
          component={Paper}
        >
          {/* 제목 */}
          {/* <TitlePart /> */}
          {/* 데칼 태그, 게시자, 공유 코드 */}
          <DecalInfo decalData={decalData} />
          {/* 트랙 사진들 */}
          <DecalImages decalData={decalData} />
          {/* 데칼에 사용된 차 간단 정보 */}
          <BaseCarInfo />
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
