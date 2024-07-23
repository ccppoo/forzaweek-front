import { useNavigate } from 'react-router-dom';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { useLiveQuery } from 'dexie-react-hooks';

import * as image from '@/image';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { getTrackImage } from '@/db/index';
// import type { TrackInfo } from '@/types';
import type { Track2, TrackImage } from '@/db/schema';
import useTrackSearchFilters from '@/store/trackSearchFilters';

type TrackType = 'road' | 'off-road' | 'cross country' | 'street' | 'drag';

const trackIcon: Record<TrackType, any> = {
  road: {
    circuit: image.track_icon.road_track,
    sprint: image.track_icon.road_sprint,
    goliath: image.track_icon.goliath,
    colossus: image.track_icon.colossus,
  },
  'off-road': {
    trail: image.track_icon.offroad_track,
    scramble: image.track_icon.offroad_sprint,
    gauntlet: image.track_icon.gauntlet,
  },
  'cross country': {
    'cross country': image.track_icon.offroad_sprint,
    circuit: image.track_icon.offroad_track,
    juggernaut: image.track_icon.juggernaut,
    titan: image.track_icon.titan,
  },
  street: {
    'street racing': image.track_icon.street_racing,
    marathon: image.track_icon.marathon,
  },
  drag: {
    'drag racing': image.track_icon.drag_racing,
  },
};

function TrackName({ track }: { track: Track2 }) {
  const trackicon = trackIcon[track.category as TrackType][track.format];

  return (
    <FlexBox
      sx={{
        height: '100%',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      {/* 트랙 아이콘, 이름, 밑에 다른 이름 */}
      <FlexBox sx={{ width: '100%', height: 75 }}>
        <Box
          sx={{
            aspectRatio: '1/1',
            height: '100%',
            width: 50,
          }}
        >
          <Image
            src={trackicon}
            sx={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <Typography variant="h5">{track.name.en}</Typography>
        </FlexBox>
      </FlexBox>
      {/* 맵 특징 태그,  */}
      <FlexBox sx={{ width: '100%' }}></FlexBox>
      {/* 추천 튜닝으로 가는 바로가기 */}
      <FlexBox sx={{ width: '100%' }}></FlexBox>
    </FlexBox>
  );
}

function TrackPreview({ trackImage }: { trackImage: TrackImage }) {
  return (
    <FlexBox
      sx={{
        maxWidth: '100%',
        height: '100%',
        aspectRatio: '16/9',
        justifyContent: 'start',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      }}
    >
      <Image
        src={trackImage.fullPathImage.zoom_out}
        // sx={{ objectFit: 'contain', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}
        sx={{ objectFit: 'fill', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}
      />
    </FlexBox>
  );
}

export default function TrackPreviewCell({ track }: { track: Track2 }) {
  const WIDTH = '100%';
  const HEIGHT = 200;

  const trackImage: TrackImage | undefined = useLiveQuery(
    async () => await getTrackImage(track.id!),
  );

  return (
    <FlexBox
      sx={{
        width: WIDTH,
        maxWidth: 1200,
        height: HEIGHT,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      }}
      component={Paper}
    >
      {trackImage && <TrackPreview trackImage={trackImage} />}
      <TrackName track={track} />
    </FlexBox>
  );
}
