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

import * as image from '@/image';
import { PI_Card } from '@/components/PI';
import TuningOptionFilter from '@/components/Tunings/TuningSearchFilter';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';

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

export default function TuningBriefCell({ tuning }: { tuning: Tuning }) {
  const carName = '#98 Bryan Herta Autosport Elantra N';
  const manufacturer = 'Hyundai';
  const year = 2021;
  const WIDTH = '33%';
  const HEIGHT = 180;
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
        <Box
          sx={{
            display: 'grid',
            paddingY: 1,
            gridTemplateColumns: 'auto 75px',
            gridTemplateRows: '35px',
          }}
        >
          {/* 만든사람 */}
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Avatar {...stringAvatar(tuning.creater.id)} sx={{ width: 25, height: 25 }} />
            <Typography variant="h6" sx={{ fontWeight: 300 }}>
              {creator}
            </Typography>
          </FlexBox>
          {/* PI Card */}
          <FlexBox sx={{ alignItems: 'center' }}>
            <PI_Card height={30} pi_number={tuning.PI} />
          </FlexBox>
        </Box>
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

          {/* 공유코드 + 댓글 + 좋아요 */}
          <Box
            sx={{
              display: 'grid',
              height: 35,
              width: '100%',
              gridTemplateColumns: 'auto 50px 50px',
            }}
          >
            <FlexBox
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></FlexBox>
            <FlexBox sx={{ alignItems: 'center' }}>
              <IconButton sx={{ borderRadius: 1, paddingY: `2px`, paddingX: `4px` }}>
                <ModeCommentOutlinedIcon sx={{ fontSize: 15 }} />
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
              <IconButton sx={{ borderRadius: 1, paddingY: `2px`, paddingX: `4px` }}>
                {tuning.fav.checked ? (
                  <FavoriteOutlinedIcon sx={{ fontSize: 15 }} />
                ) : (
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: 15 }} />
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
          </Box>
        </FlexBox>
      </Paper>
    </Grid>
  );
}
