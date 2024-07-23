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
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import * as image from '@/image';
import TrackAndTagSearch from '@/components/Search/TrackAndTagSearch';
import TrackPreviewCell from '@/components/Track/TrackPreviewCell';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import type { Track2, TrackImage } from '@/db/schema';
import useTrackSearchFilters from '@/store/trackSearchFilters';
import type { TrackInfo } from '@/types';

// import Map from './Map';

export default function Tracks() {
  const navigate = useNavigate();
  const [_, tracks] = useTrackSearchFilters();

  const searchScope = 'track-browse';
  const MAP_HEIGHT = 600;
  const MAP_WIDTH = 1100;

  console.log(`tracks : ${JSON.stringify(tracks)}`);

  return (
    <Container sx={{ paddingTop: 2, width: '100%' }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column' }}>
        {/* <FlexBox sx={{}}>
          <Map height={MAP_HEIGHT} width={MAP_WIDTH} />
        </FlexBox> */}
        <TrackAndTagSearch searchScope={searchScope} />
        <FlexBox
          sx={{
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            rowGap: 1,
            paddingTop: 2,
            flexWrap: 'wrap',
            flexDirection: 'column',
          }}
        >
          {tracks.map((track: Track2) => {
            return <TrackPreviewCell track={track} key={`track-info-track=${track.name.en}`} />;
          })}
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
