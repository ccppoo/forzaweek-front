import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { ApexOptions } from 'apexcharts';

import * as image from '@/image';
import Comments from '@/components/Comment';
import { PI_Card } from '@/components/PI';
import { RelatedTunings } from '@/components/Tunings';
import { RelatedVideos } from '@/components/Videos';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';
import { decals as decalImages } from '@/image/decal';

export default function BaseCarInfo() {
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
