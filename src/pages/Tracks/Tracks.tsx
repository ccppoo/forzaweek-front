import { useNavigate } from 'react-router-dom';

import { ImageRounded } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import * as image from '@/image';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useTrackSearchFilters from '@/store/trackSearchFilters';
import type { TrackInfo } from '@/types';

import Map from './Map';

function TrackInfo() {}

type TrackType = 'road racing' | 'dirt racing' | 'cross country' | 'street racing' | 'drag racing';

const trackIcon: Record<TrackType, any> = {
  'road racing': {
    circuit: image.track_icon.road_track,
    sprint: image.track_icon.road_sprint,
    goliath: image.track_icon.goliath,
    colossus: image.track_icon.colossus,
  },
  'dirt racing': {
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
  'street racing': {
    'street racing': image.track_icon.street_racing,
    marathon: image.track_icon.marathon,
  },
  'drag racing': {
    'drag racing': image.track_icon.drag_racing,
  },
};

function TrackPreview() {
  return (
    <FlexBox
      sx={{
        maxWidth: '100%',
        height: '100%',
        justifyContent: 'start',
      }}
    >
      <Image src={image.track.molehach} sx={{ objectFit: 'contain' }} />
    </FlexBox>
  );
}

function TrackRowItem({ track }: { track: TrackInfo }) {
  const WIDTH = '80%';
  const HEIGHT = 100;
  const road_type = 'road';
  const track_type = 'circuit';
  const laps = 3;

  const trackicon = trackIcon[track.trackType as TrackType][track.courseType];

  return (
    <FlexBox
      sx={{
        width: WIDTH,
        maxWidth: 1200,
        height: HEIGHT,
        justifyContent: 'space-between',
      }}
      component={Paper}
    >
      <FlexBox sx={{ columnGap: 1 }}>
        <FlexBox
          sx={{
            aspectRatio: '1/1',
            height: '100%',
          }}
        >
          <Image
            src={trackicon}
            sx={{
              objectFit: 'contain',
              borderTopLeftRadius: 4,
              borderBottomLeftRadius: 4,
            }}
          />
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <Typography variant="h5">{track.name}</Typography>
          <Typography variant="subtitle1">{track.en_trans || track.name}</Typography>
          <FlexBox sx={{ columnGap: 1 }}>
            <Typography variant="h6">{road_type}</Typography>
            <Typography variant="h6">{track_type}</Typography>
            <Typography variant="h6">{laps} laps</Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      <TrackPreview />
    </FlexBox>
  );
}

export default function Tracks() {
  const navigate = useNavigate();
  const [_, tracks] = useTrackSearchFilters();

  const MAP_HEIGHT = 600;
  const MAP_WIDTH = 1100;

  return (
    <Container sx={{ paddingTop: 2, width: '100%' }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column' }}>
        {/* <FlexBox sx={{}}>
          <Map height={MAP_HEIGHT} width={MAP_WIDTH} />
        </FlexBox> */}
        <FlexBox
          sx={{
            height: '100%',
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: 1,
            paddingTop: 2,
          }}
        >
          {tracks.map((track: TrackInfo) => {
            return <TrackRowItem track={track} key={`track-info-track=${track.name_en}`} />;
          })}
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
