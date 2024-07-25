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
import type { TuningEditSchema, TuningSchemaType } from '@/FormData/tuning';
import { PI_Card } from '@/components/PI';
import CommentsButton from '@/components/Post/CommentsButton';
import FavsButton from '@/components/Post/FavsButton';
import { TagChip } from '@/components/Post/Tags';
import DrivingSystem from '@/components/Tunings/MajorParts/DrivingSystem';
import Suspension from '@/components/Tunings/MajorParts/Suspension';
import Tire from '@/components/Tunings/MajorParts/Tire';
import TuningOptionFilter from '@/components/Tunings/TuningSearchFilter';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

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

export default function TuningBriefCell({ tuning }: { tuning: TuningSchemaType }) {
  const carName = '#98 Bryan Herta Autosport Elantra N';
  const manufacturer = 'Hyundai';
  const year = 2021;
  const WIDTH = '33%';
  const HEIGHT = 180;
  const creator = tuning.creator;

  const FAV_COUNT = 123;
  const FAV_CHECKED = true;

  const PI_DS_S_Tire_H = 30;

  return (
    <Grid xs={4}>
      <Paper
        sx={{
          width: '100%',
          height: HEIGHT,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          paddingX: 0.5,
        }}
      >
        {/* 만든사람 */}
        <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
          <Avatar {...stringAvatar(creator)} sx={{ width: 25, height: 25 }} />
          <Typography variant="h6" sx={{ fontWeight: 300 }}>
            {creator}
          </Typography>
        </FlexBox>
        {/* PI / DrivingSystem / Tire / Suspension */}
        <FlexBox
          sx={{
            width: '100%',
            alignItems: 'center',
            paddingY: 1,
            columnGap: 1,
          }}
        >
          <PI_Card height={PI_DS_S_Tire_H} pi_number={tuning.pi} />
          <DrivingSystem
            height={PI_DS_S_Tire_H}
            drivingSystem={tuning.tuningMajorParts.drivingSystem}
          />
          <Suspension
            height={PI_DS_S_Tire_H}
            suspension={tuning.tuningMajorParts.suspension || ''}
          />
          <Tire height={PI_DS_S_Tire_H} tire={tuning.tuningMajorParts.tire || ''} />
        </FlexBox>
        {/* 태그 */}
        <FlexBox
          sx={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            paddingX: 0.25,
            paddingY: 0.5,
            flexWrap: 'wrap',
            columnGap: 0.5,
            rowGap: 0.5,
            justifyContent: 'start',
            alignItems: 'flex-start',
          }}
        >
          {tuning.tags.map((tag, idx) => (
            <TagChip tagID={tag} key={`tuning-brief-tag-${tuning.share_code}-${tag}-${idx}`} />
          ))}
        </FlexBox>

        {/* 공유코드 + 댓글 + 좋아요 */}
        <FlexBox
          sx={{
            height: 35,
            width: '100%',
            alignItems: 'end',
            justifyContent: 'end',
          }}
        >
          <FlexBox sx={{ alignItems: 'center' }}>
            <CommentsButton comments={FAV_COUNT} displayOnly />
            <FavsButton favs={FAV_COUNT} faved={FAV_CHECKED} displayOnly />
          </FlexBox>
        </FlexBox>
      </Paper>
    </Grid>
  );
}
