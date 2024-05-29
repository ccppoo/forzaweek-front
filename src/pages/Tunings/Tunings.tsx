import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
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
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { ApexOptions } from 'apexcharts';

import { PI_Card } from '@/components/PI';
import { CarSearchAndSelect } from '@/components/Search';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';

import TuningOptionFilter from './TuningSearchFilter';

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

export default function Tunings() {
  const navigate = useNavigate();
  const searchScope = 'tunings';
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container sx={{ paddingTop: 1 }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column' }}>
        <CarSearchAndSelect scope={searchScope} doFinalSelect />
        <TuningOptionFilter />
        <TuningCellListing />
        {/* Pagination */}
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
          <Pagination count={10} page={page} onChange={handleChange} size="large" />
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
