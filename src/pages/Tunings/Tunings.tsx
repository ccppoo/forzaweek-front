import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import IconButton from '@mui/material/IconButton';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { ApexOptions } from 'apexcharts';

import * as image from '@/image';
import { PI_Card } from '@/components/PI';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { carInfoWithImage } from '@/data/cars';
import { decalsWithImage } from '@/data/decals';
import type { DecalData } from '@/data/decals';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';
import { CarData, CarInfo } from '@/data/types';
import { decals as decalImages } from '@/image/decal';
import useTuningSearchFilters from '@/store/tuningSearchFilters';
import {
  BOOST,
  COUNTRY,
  DIVISIONS,
  MANUFACTURER,
  PRODUCTION_YEAR,
  PRODUCTION_YEARs,
  RARITY,
} from '@/store/tuningSearchFilters/values';

import TuningCarSelection from './TuningCarSearchFilter';
import TuningOptionFilter from './TuningSearchFilter';
import { Image } from './styled';

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

function DecalItemRow({ decal }: { decal: DecalData }) {
  const WIDTH = '100%';
  const HEIGHT = 200;
  const share_code3 = [
    decal.share_code.substring(0, 3),
    decal.share_code.substring(3, 6),
    decal.share_code.substring(6, 9),
  ];

  return (
    <Paper sx={{ width: WIDTH, maxWidth: 1200, height: HEIGHT, display: 'flex' }}>
      <FlexBox sx={{ aspectRatio: '16/9', height: '100%' }}>
        <Image
          src={decal.frontImage}
          sx={{
            objectFit: 'contain',
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
      </FlexBox>
      <FlexBox
        sx={{ flexDirection: 'column', width: '100%', paddingX: 1, paddingY: 0.5, rowGap: 1 }}
      >
        <FlexBox sx={{ height: '20%' }}>
          <Typography variant="h4">hyundai elantra deco!!</Typography>
        </FlexBox>
        <FlexBox sx={{ height: '60%', columnGap: 1, rowGap: 1, flexWrap: 'wrap' }}>
          {decal.tags.map((tag) => (
            <Chip label={tag} key={`decal-tag-${decal.share_code}-${tag}`} />
          ))}
        </FlexBox>
        <FlexBox sx={{ height: '20%', width: '100%', justifyContent: 'space-between' }}>
          <FlexBox>
            <FlexBox
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: 1,
                paddingX: 1,
                borderRadius: 4,
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
          <FlexBox>
            <IconButton sx={{ borderRadius: 4 }}>
              <ModeCommentOutlinedIcon fontSize="small" />
              <FlexBox
                sx={{
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 0.5,
                }}
              >
                <Typography>{decal.fav.count}</Typography>
              </FlexBox>
            </IconButton>
            <IconButton sx={{ borderRadius: 4 }}>
              {decal.fav.checked ? (
                <FavoriteOutlinedIcon fontSize="small" />
              ) : (
                <FavoriteBorderOutlinedIcon fontSize="small" />
              )}
              <FlexBox
                sx={{
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingLeft: 0.5,
                }}
              >
                <Typography>{decal.fav.count}</Typography>
              </FlexBox>
            </IconButton>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Paper>
  );
}

function TuningItemCell({ tuning }: { tuning: Tuning }) {
  const carName = '#98 Bryan Herta Autosport Elantra N';
  const manufacturer = 'Hyundai';
  const year = 2021;
  const WIDTH = '33%';
  const HEIGHT = 400;
  const series = [
    {
      name: 'performance',
      data: [
        tuning.performance.acceleration,
        tuning.performance.speed,
        tuning.performance.braking,
        tuning.performance.offroad,
        tuning.performance.launch,
        tuning.performance.handling,
      ],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: 'radar',
      toolbar: {
        show: false,
      },
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
      redrawOnParentResize: true,
    },
    tooltip: {
      enabled: false,
    },
    yaxis: {
      min: 0,
      max: 10,
      stepSize: 2,
      tooltip: {
        enabled: false,
      },
      labels: {
        show: false,
        formatter: (value) => {
          return '';
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    xaxis: {
      categories: ['acceleration', 'speed', 'braking', 'offroad', 'launch', 'handling'],
      labels: {
        style: {
          colors: '#050505',
          fontWeight: 500,
        },
        // show: false,
      },
    },

    fill: {
      opacity: 0.5,
    },
  };

  const creator = tuning.creater.club
    ? `[${tuning.creater.club}] ${tuning.creater.id}`
    : tuning.creater.id;

  const share_code3 = [
    tuning.share_code.substring(0, 3),
    tuning.share_code.substring(3, 6),
    tuning.share_code.substring(6, 9),
  ];

  return (
    <Grid xs={4}>
      <Paper
        sx={{
          // width: '100%',
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          paddingX: 0.5,
        }}
      >
        <FlexBox
          sx={{ paddingTop: 0.5, alignItems: 'center', justifyContent: 'end', columnGap: 0.5 }}
        >
          <PI_Card height={30} pi_number={tuning.PI} />
        </FlexBox>
        {/* 만든사람 */}
        <FlexBox>
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Avatar {...stringAvatar(tuning.creater.id)} sx={{ width: 25, height: 25 }} />
            <Typography variant="h6">{creator}</Typography>
          </FlexBox>
        </FlexBox>

        {/* 본문 */}
        <FlexBox
          sx={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            paddingX: 1,
            paddingY: 0.5,
            rowGap: 2,
            justifyContent: 'space-between',
          }}
        >
          {/* 태그 */}
          <FlexBox sx={{ flexDirection: 'column' }}>
            <FlexBox
              sx={{
                height: '100%',
                flexWrap: 'wrap',
                columnGap: 0.2,
                rowGap: 0.5,
                justifyContent: 'start',
                alignItems: 'flex-start',
              }}
            >
              {tuning.tags.map((tag) => (
                <Chip label={tag} key={`decal-tag-${tuning.share_code}-${tag}`} />
              ))}
            </FlexBox>
          </FlexBox>
          {/* 서스펜션, 타이어, 동작 방식 */}
          <FlexBox>
            <FlexBox sx={{ flexDirection: 'column', width: '33%', border: '1px black solid' }}>
              <FlexBox
                sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography>Suspension</Typography>
                <Typography>{tuning.suspension}</Typography>
              </FlexBox>
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', width: '33%', border: '1px black solid' }}>
              <FlexBox
                sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography>Tier</Typography>
                <Typography>{tuning.tier}</Typography>
              </FlexBox>
            </FlexBox>
            <FlexBox sx={{ flexDirection: 'column', width: '33%', border: '1px black solid' }}>
              <FlexBox
                sx={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
              >
                <Typography>Drive System</Typography>
                <Typography>{tuning.driving_system}</Typography>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          {/* 공유코드 + 댓글 + 좋아요 */}
          <FlexBox sx={{ height: '20%', width: '100%', justifyContent: 'space-between' }}>
            <FlexBox
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FlexBox
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  columnGap: 1,
                  paddingX: 1,
                  borderRadius: 4,
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
            <FlexBox>
              <IconButton sx={{ borderRadius: 4 }}>
                <ModeCommentOutlinedIcon fontSize="small" />
                <FlexBox
                  sx={{
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 0.5,
                  }}
                >
                  <Typography>{tuning.fav.count}</Typography>
                </FlexBox>
              </IconButton>
              <IconButton sx={{ borderRadius: 4 }}>
                {tuning.fav.checked ? (
                  <FavoriteOutlinedIcon fontSize="small" />
                ) : (
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                )}
                <FlexBox
                  sx={{
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingLeft: 0.5,
                  }}
                >
                  <Typography>{tuning.fav.count}</Typography>
                </FlexBox>
              </IconButton>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Paper>
    </Grid>
  );
}

function TuningCellListing() {
  return (
    <Grid container sx={{ width: '100%' }} spacing={2}>
      {[...tunings.slice(0, 9)].map((tuning) => (
        <TuningItemCell tuning={tuning} key={`tuning-cell-${tuning.share_code}`} />
      ))}
    </Grid>
  );
}

function DecalRowListing() {
  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%', rowGap: 2 }}>
      {decalsWithImage.map((decal) => (
        <DecalItemRow decal={decal} />
      ))}
    </FlexBox>
  );
}

export default function Tunings() {
  const navigate = useNavigate();

  const WIDTH = '100%';
  const HEIGHT = 200;
  const name = carinfo.name;
  const manufacturer = carinfo.manufacture;
  const year = carinfo.year;
  const description = 'design of Hyundai elantra, its my style';
  const maker = 'DecalMaster';
  const share_code = '123 123 123';

  return (
    <Container sx={{ height: '140vh', paddingTop: 90 }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column' }}>
        <TuningCarSelection />
        <TuningOptionFilter />
        <TuningCellListing />
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
