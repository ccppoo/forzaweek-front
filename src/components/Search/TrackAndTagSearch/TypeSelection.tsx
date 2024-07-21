import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { blue, green, orange, pink, purple } from '@mui/material/colors';

import {
  AutocompleteCarSearchBar,
  CarFilterAndSelect,
  TagAutocompleteTextField,
} from '@/components/Search';
import { FlexBox, Image } from '@/components/styled';
import { trackIcons } from '@/image/track_icon';
import useTrackAndTagFilter from '@/store/trackAndTagFilter';

interface TrackAndTagSearchIterface {
  searchScope: string;
  doFinalSelect?: boolean;
}
type TrackColors = {
  main: string;
  sub1: string;
  sub2: string;
};
type TRACK_COLOR_TYPE = Record<TrackCategory, TrackColors>;
const TRACK_COLOR: TRACK_COLOR_TYPE = {
  road: {
    main: blue[800],
    sub1: blue[600],
    sub2: blue[300],
  },
  crossCountry: {
    main: green[800],
    sub1: green[600],
    sub2: green[300],
  },
  offRoad: {
    main: orange[800],
    sub1: orange[600],
    sub2: orange[300],
  },
  street: {
    main: purple[800],
    sub1: purple[600],
    sub2: purple[300],
  },
  drag: {
    main: pink['A200'],
    sub1: pink[400],
    sub2: pink[200],
  },
};

type TrackTypeFormat = {
  name: string;
  icon: string;
};

type TrackTypeItem = {
  formats: TrackTypeFormat[];
  eventTrack: TrackTypeFormat[];
};

// type TrackCategory = 'crossCountry' | "offRoad" | "road" | "street" | "drag"
type TrackCategory = 'crossCountry' | 'offRoad' | 'road' | 'street' | 'drag';

type Tracks = Record<TrackCategory, TrackTypeItem>;

const tracks: Tracks = {
  road: {
    formats: [
      {
        name: 'circuit',
        icon: trackIcons.road_track,
      },
      {
        name: 'sprint',
        icon: trackIcons.road_sprint,
      },
    ],
    eventTrack: [
      {
        name: 'goliath',
        icon: trackIcons.event.goliath,
      },
      {
        name: 'colossus',
        icon: trackIcons.event.colossus,
      },
    ],
  },
  crossCountry: {
    formats: [
      {
        name: 'cross country',
        icon: trackIcons.crosscountry_sprint,
      },
      {
        name: 'circuit',
        icon: trackIcons.crosscountry_track,
      },
    ],
    eventTrack: [
      {
        name: 'titan',
        icon: trackIcons.event.titan,
      },
    ],
  },
  offRoad: {
    formats: [
      {
        name: 'trail',
        icon: trackIcons.offroad_sprint,
      },
      {
        name: 'scramble',
        icon: trackIcons.offroad_track,
      },
    ],
    eventTrack: [
      {
        name: 'gauntlet',
        icon: trackIcons.event.gauntlet,
      },
      {
        name: 'juggernaut',
        icon: trackIcons.event.juggernaut,
      },
    ],
  },
  street: {
    formats: [
      {
        name: 'street',
        icon: trackIcons.street_racing,
      },
    ],
    eventTrack: [
      {
        name: 'marathon',
        icon: trackIcons.event.marathon,
      },
    ],
  },
  drag: {
    formats: [
      {
        name: 'drag',
        icon: trackIcons.drag_racing,
      },
    ],
    eventTrack: [],
  },
};

interface TrackTypeFormatItemIntf {
  trackType: TrackCategory;
  trackFormat: TrackTypeFormat;
  event?: boolean;
}

const TrackTypeRowGrid = styled(Box)((props) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(150px, 15%) repeat(3, minmax(100px ,30%))',
  // gap: '1px',
}));

function TrackTypeFormatItem(props: TrackTypeFormatItemIntf) {
  const { trackType, trackFormat, event } = props;
  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingY: 0.5,
      }}
    >
      <FlexBox sx={{ height: '100%', aspectRatio: '1/1' }}>
        <Image src={trackFormat.icon} sx={{ objectFit: 'contain', aspectRatio: '1/1' }} />
      </FlexBox>
      {/* {!event && (
        <FlexBox>
          <Typography color={'white'} fontSize={21}>
            {trackFormat.name}
          </Typography>
        </FlexBox>
      )} */}
    </FlexBox>
  );
}

function TrackTypeSelectionsHeader() {
  return (
    <TrackTypeRowGrid
      sx={{
        gridTemplateRows: '50px',
      }}
    >
      <Box></Box>
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Typography>circuit</Typography>
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Linear</Typography>
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Typography>event</Typography>
      </FlexBox>
    </TrackTypeRowGrid>
  );
}

function TrackTypeSelection({ trackType }: { trackType: TrackCategory }) {
  const BackgroundColor = TRACK_COLOR[trackType].main;
  // TEMP
  const isOne = tracks[trackType].formats.length == 1;
  return (
    <TrackTypeRowGrid
      sx={{
        gridTemplateRows: '75px',
        columnGap: 1,
        border: '1px black solid',
      }}
    >
      {/* row */}
      <FlexBox
        sx={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BackgroundColor,
        }}
      >
        <Typography color={'white'} fontSize={21}>
          {trackType}
        </Typography>
      </FlexBox>
      {isOne && <FlexBox sx={{}}></FlexBox>}

      {/* 질주형 */}
      {tracks[trackType].formats
        .toSorted((f1, f2) => (f1.name > f2.name ? 1 : -1))
        .map((trackTypeFormat) => (
          <FlexBox
            key={`select-${trackType}-${trackTypeFormat.name}`}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TrackTypeFormatItem
              trackFormat={trackTypeFormat}
              trackType={trackType}
              // key={`select-${trackType}-${trackTypeFormat.name}`}
            />
          </FlexBox>
        ))}
      {/* 이벤트 트랙 */}
      <FlexBox
        sx={{
          width: '100%',
          height: '100%',
          paddingX: 1,
          columnGap: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {tracks[trackType].eventTrack.map((trackTypeFormat) => (
          <TrackTypeFormatItem
            trackFormat={trackTypeFormat}
            trackType={trackType}
            event
            key={`select-${trackType}-${trackTypeFormat.name}`}
          />
        ))}
      </FlexBox>
    </TrackTypeRowGrid>
  );
}

function TrackTypeSelectionDrag() {
  const DRAG: TrackCategory = 'drag';

  const BackgroundColor = TRACK_COLOR[DRAG].main;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'minmax(150px, 15%) minmax(200px ,60%) auto',
        gridTemplateRows: '75px',
        border: '1px black solid',
      }}
    >
      <FlexBox
        sx={{
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BackgroundColor,
        }}
      >
        <Typography color={'white'} fontSize={21}>
          {DRAG}
        </Typography>
      </FlexBox>
      <FlexBox
        sx={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          paddingY: 0.25,
        }}
      >
        <FlexBox sx={{ height: '100%', aspectRatio: '1/1' }}>
          <Image src={trackIcons.drag_racing} sx={{ objectFit: 'contain', aspectRatio: '1/1' }} />
        </FlexBox>
      </FlexBox>
      <FlexBox></FlexBox>
    </Box>
  );
}

export default function TrackTypeSelections() {
  return (
    <FlexBox
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        rowGap: 2,
        marginBottom: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
          minWidth: 450,
          maxWidth: 850,
          height: '100%',
          display: 'grid',
          gridTemplateRows: '50px repeat(4, 75px)',
        }}
      >
        <TrackTypeSelectionsHeader />
        <TrackTypeSelection trackType="road" />
        <TrackTypeSelection trackType="street" />
        <TrackTypeSelection trackType="offRoad" />
        <TrackTypeSelection trackType="crossCountry" />
      </Box>
      <Box sx={{ minWidth: 450, maxWidth: 850, height: '100%', width: '100%' }}>
        <TrackTypeSelectionDrag />
      </Box>
    </FlexBox>
  );
}
