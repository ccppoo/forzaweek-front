import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ForwardIcon from '@mui/icons-material/Forward';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import IosShareOutlinedIcon from '@mui/icons-material/IosShareOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
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
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import * as image from '@/image';
import { CarInfo } from '@/api/car/car';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

import carInfo from './car_data.json';
import { Image } from './styled';

// import { CarInfo, FH5_info } from './types';

function CarPreviewInfo({ carInfo }: { carInfo: CarInfo }) {
  const MANUFACTURER = carInfo.manufacture;
  const COUNRTY = carInfo.country;
  const YEAR = carInfo.year;
  const DRIVE_TRAIN = carInfo.driveTrain;
  const BODY_STYLE = carInfo.bodyStyle;
  // 인게임 스탯
  const PI = carInfo.fh5.PI;
  const DIVISION = carInfo.fh5.division;

  return (
    <>
      <FlexBox sx={{ columnGap: 1 }}>
        {/* 여기 항목들은 길어서 줄넘김이 일어날 수 있는 것들 */}
        <FlexBox>
          {/* 제조사 로고 + 이름 */}
          {/* 이름이 긴 경우 줄넘김 할 수 있도록 이름 아래에 한 칸 여유 남겨 놓을 것 */}
          <Typography variant="body1">{MANUFACTURER}</Typography>
        </FlexBox>
        <FlexBox>
          {/* 국기 + 국가 이름 */}
          <Typography>{COUNRTY}</Typography>
        </FlexBox>
        {/* 연도 */}
        <Typography>{YEAR}</Typography>
        <FlexBox></FlexBox>
      </FlexBox>
      <FlexBox sx={{ columnGap: 1, rowGap: 0.5, flexDirection: 'column' }}>
        {/* 줄넘김 없고, 길이가 한정된 것들 */}
        <FlexBox sx={{ columnGap: 1 }}>
          {/* == 인게임 스탯 == */}
          <FlexBox sx={{ border: '1px black solid', borderRadius: 0.8, paddingX: 0.5 }}>
            {/* PI, 색 반영해서 이쁘게 바꿀 것 */}
            <Typography variant="body1">{PI}</Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox sx={{ columnGap: 1, justifyContent: 'start' }}>
          {/* == 현실 스탯 == */}
          <FlexBox sx={{ border: '1px black solid', borderRadius: 0.8, paddingX: 0.5 }}>
            {/* 사륜/전륜/후륜 */}
            <Typography variant="body1">{DRIVE_TRAIN}</Typography>
          </FlexBox>
          <FlexBox sx={{ border: '1px black solid', borderRadius: 0.8, paddingX: 0.5 }}>
            {/* Body Style - 세단/왜건/해치백 */}
            <Typography variant="body1">{BODY_STYLE}</Typography>
          </FlexBox>
          <FlexBox sx={{ border: '1px black solid', borderRadius: 0.8, paddingX: 0.5 }}>
            {/* Division - 인게임  */}
            <Typography variant="body1">{DIVISION}</Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
}

export default function CarPreviewCard({ carInfo }: { carInfo: CarInfo }) {
  // 자동차 사진 + 이름, 클래스, 기본적인거 추가

  const W = 250;
  const H = 150;

  const FULL_NAME = carInfo.name;

  return (
    <Grid
      sx={{
        width: '100%',
        height: 250,
      }}
      xs={12}
      md={6}
    >
      <FlexBox
        sx={{
          paddingX: 0.5,
          paddingTop: 0.5,
          flexDirection: 'column',
          alignItems: 'center',
          height: '100%',
        }}
        component={Paper}
      >
        <Paper sx={{ width: '100%', minHeight: 36 }} elevation={3}>
          <FlexBox sx={{ paddingX: 0.5, paddingY: 0.5 }}>
            {/* 이름이 긴 경우 줄넘김 할 수 있도록 이름 아래에 한 칸 여유 남겨 놓을 것 */}
            <Typography variant="h6">{FULL_NAME}</Typography>
          </FlexBox>
        </Paper>
        <Grid container sx={{ width: '100%', height: '100%', maxHeight: 200, paddingTop: 1 }}>
          <Grid
            sx={{
              maxWidth: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            xs={6}
            md={6}
          >
            <Image
              src={carInfo.image.main}
              sx={{
                width: '100%',
                objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid sx={{ flexDirection: 'column' }} xs={6}>
            <CarPreviewInfo carInfo={carInfo} />
          </Grid>
        </Grid>
      </FlexBox>
    </Grid>
  );
}
