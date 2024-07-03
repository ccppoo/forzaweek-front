import { useState } from 'react';

import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import { Box, Divider, IconButton, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { CarInfo } from '@/types';
import { CarInfo2 } from '@/types/car';

function CarPreviewInfo({ carInfo }: { carInfo: CarInfo2 }) {
  const MANUFACTURER = carInfo.manufacturer;
  const COUNRTY = carInfo.nation.name_en;
  const YEAR = carInfo.productionYear;
  // const DRIVE_TRAIN = carInfo.driveTrain;
  const BODY_STYLE = carInfo.bodyStyle;
  // 인게임 스탯
  const PI = carInfo.fh5_perf.PI;
  const DIVISION = carInfo.fh5_meta.division;

  return (
    <FlexBox
      sx={{
        maxWidth: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        src={carInfo.image.first}
        sx={{
          width: '100%',
          objectFit: 'contain',
        }}
      />
      <FlexBox sx={{ columnGap: 1, rowGap: 0.5, flexDirection: 'column' }}>
        {/* 연도 */}
        <Typography>{YEAR}</Typography>
        {/* 줄넘김 없고, 길이가 한정된 것들 */}
        <FlexBox sx={{ columnGap: 1, justifyContent: 'start' }}>
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
    </FlexBox>
  );
}

export default function CarPreviewCard({ carInfo }: { carInfo: CarInfo2 }) {
  // 자동차 사진 + 이름, 클래스, 기본적인거 추가

  const W = 250;
  const H = 150;

  const FULL_NAME = carInfo.name_en;

  const COUNRTY = carInfo.nation.name_en;
  const YEAR = carInfo.productionYear;
  // const DRIVE_TRAIN = carInfo.;
  const BODY_STYLE = carInfo.bodyStyle;
  // 인게임 스탯
  const PI = carInfo.fh5_perf.PI;
  const DIVISION = carInfo.fh5_meta.division;
  // min 245 max 405
  return (
    <FlexBox sx={{ minWidth: 400, width: 'calc( 50% - 20px )', maxWidth: 560 }}>
      <Paper
        sx={{
          display: 'grid',
          width: '100%',
          gridTemplateColumns: '150px 5px auto',
          gridTemplateRows: '120px',
          paddingTop: 0.5,
        }}
      >
        {/* 차 사진 */}
        <FlexBox
          sx={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={carInfo.image.first}
            sx={{
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </FlexBox>
        {/* 여백  */}
        <Divider orientation="vertical" sx={{ margin: 0 }} />
        {/* 이름 기타 정보 */}
        <FlexBox
          sx={{
            paddingX: 1,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'start',
            rowGap: 0.3,
          }}
        >
          {/* 차 이름 + 연식 */}
          <FlexBox sx={{ width: '100%', paddingY: 0.2, alignItems: 'baseline', columnGap: 1 }}>
            <Typography variant="h6">{FULL_NAME}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 200 }}>
              {YEAR}
            </Typography>
          </FlexBox>
          {/* 디비전 + 바로가기 버튼(데칼, 튜닝) */}
          <FlexBox
            sx={{
              columnGap: 1,
              justifyContent: 'start',
              height: '100%',
              paddingTop: 0.3,
              flexDirection: 'column',
            }}
          >
            <FlexBox>
              {/* 디비전 */}
              <FlexBox
                sx={{
                  border: '1px black solid',
                  borderRadius: 0.8,
                  paddingX: 0.5,
                  justifyContent: 'start',
                }}
              >
                <Typography variant="body2">{DIVISION}</Typography>
              </FlexBox>
            </FlexBox>

            {/* 데칼, 튜닝, 댓글  */}
            <FlexBox
              sx={{
                justifyContent: 'end',
                width: '100%',
                height: '100%',
                columnGap: 0.3,
                alignItems: 'end',
              }}
            >
              {/* TODO: click -> goto decal selected car */}
              <IconButton sx={{ padding: 0.4, borderRadius: 1 }}>
                <ColorLensOutlinedIcon fontSize="small" />
                <Typography sx={{ fontSize: '15px' }}>Decal</Typography>
              </IconButton>
              <IconButton sx={{ padding: 0.4, borderRadius: 1 }} size="small">
                <BuildOutlinedIcon fontSize="small" />
                <Typography sx={{ fontSize: '15px' }}>Tuning</Typography>
              </IconButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Paper>
    </FlexBox>
  );
}
