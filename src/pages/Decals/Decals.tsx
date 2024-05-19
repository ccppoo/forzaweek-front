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

  const WIDTH = '100%';
  const HEIGHT = 500;
  const name = carinfo.name;
  const manufacturer = carinfo.manufacture;
  const year = carinfo.year;
  const description = 'design of Hyundai elantra, its my style';
  const maker = 'DecalMaster';
  const share_code = '123 123 123';

  return (
    <Container sx={{ height: '100vh' }}>
      <FullSizeCenteredFlexBox sx={{}}>
        <FlexBox
          sx={{ width: WIDTH, maxWidth: 1200, height: HEIGHT, flexDirection: 'column' }}
          component={Paper}
        >
          <FlexBox sx={{ width: '100%', height: '40px' }}>s</FlexBox>
          {/* 자동차 사진/이름 */}
          <FlexBox sx={{ width: '100%', height: 'calc( 100% - 40px )' }}>
            <FlexBox sx={{ width: '30%', height: '100%', padding: 1 }}>
              <Paper sx={{ display: 'flex' }} elevation={3}>
                <FlexBox sx={{ flexDirection: 'column', paddingX: 1 }}>
                  {/* 자동차 사진 */}
                  <FlexBox>
                    <Image src={image.car.hyundaiElantra} sx={{ objectFit: 'contain' }} />
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
                        {manufacturer} {year}
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

            {/* 데칼 상하좌우 사진 갤러리 */}
            <FlexBox
              sx={{
                width: '70%',
                height: '100%',
                flexDirection: 'column',
                paddingY: 1,
              }}
            >
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
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
