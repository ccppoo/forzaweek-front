import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, ButtonBase, Typography } from '@mui/material';
import { styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { blue, green, orange, pink, purple } from '@mui/material/colors';

import { FlexBox, Image } from '@/components/styled';
import { trackIcons } from '@/image/track_icon';
import useTrackAndTagFilter from '@/store/trackAndTagFilter';
import useTrackSearchFilters from '@/store/trackSearchFilters';
import type { TrackCategory, TrackFormat, TrackFormatTopology } from '@/types/fh5';
import {
  CircularFormats,
  CrossCountryFormats,
  DragFormats,
  LinearFormats,
  OffRoadFormats,
  RoadFormats,
  StreetFormats,
  TrackFormatTopologies,
} from '@/types/fh5';

const TEMP: Record<TrackCategory, TrackFormat[]> = {
  road: RoadFormats,
  crossCountry: CrossCountryFormats,
  street: StreetFormats,
  offRoad: OffRoadFormats,
  drag: DragFormats,
};
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
  format: TrackFormat;
  icon: string;
};

type TrackTypeItem = Record<TrackFormatTopology, TrackTypeFormat[]>;
type Tracks = Record<TrackCategory, TrackTypeItem>;

const tracks: Tracks = {
  road: {
    circular: [
      {
        format: 'circuit',
        icon: trackIcons.road_track,
      },
      {
        format: 'goliath',
        icon: trackIcons.event.goliath,
      },
    ],
    linear: [
      {
        format: 'sprint',
        icon: trackIcons.road_sprint,
      },
      {
        format: 'colossus',
        icon: trackIcons.event.colossus,
      },
    ],
  },
  crossCountry: {
    circular: [
      {
        format: 'crossCountryCircuit',
        icon: trackIcons.crosscountry_track,
      },
    ],
    linear: [
      {
        format: 'crossCountry',
        icon: trackIcons.crosscountry_sprint,
      },
      {
        format: 'titan',
        icon: trackIcons.event.titan,
      },
    ],
  },
  offRoad: {
    circular: [
      {
        format: 'scramble',
        icon: trackIcons.offroad_track,
      },
    ],
    linear: [
      {
        format: 'trail',
        icon: trackIcons.offroad_sprint,
      },
      {
        format: 'gauntlet',
        icon: trackIcons.event.gauntlet,
      },
      {
        format: 'juggernaut',
        icon: trackIcons.event.juggernaut,
      },
    ],
  },
  street: {
    circular: [],
    linear: [
      {
        format: 'street',
        icon: trackIcons.street_racing,
      },
      {
        format: 'marathon',
        icon: trackIcons.event.marathon,
      },
    ],
  },
  drag: {
    circular: [],
    linear: [
      {
        format: 'drag',
        icon: trackIcons.drag_racing,
      },
    ],
  },
};

interface TrackTypeFormatItemIntf {
  category: TrackCategory;
  format: TrackFormat;
  icon: string;
}

const TrackTypeRowGrid = styled(Box)((props) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(150px, 15%) repeat(2, minmax(100px ,45%))',
  gridTemplateRows: '75px',
  justifyItems: 'center',
  border: '1px black solid',
}));

const TrackTypeDragRowGrid = styled(Box)((props) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(150px, 15%) 1fr',
  gridTemplateRows: '75px',
  justifyItems: 'center',
  border: '1px black solid',
}));

function TrackTypeFormatItem(props: TrackTypeFormatItemIntf) {
  const [
    searchOptions,
    _,
    {
      format: { toggleTrackFormat },
    },
  ] = useTrackSearchFilters();

  const { category, icon, format } = props;
  const selected = searchOptions.format[format];
  // console.log(
  //   `${category} : ${searchOptions.category[category]}, ${format} : ${searchOptions.format[format]},  selected : ${selected}`,
  // );

  const toggleFormatOption = () => toggleTrackFormat(format);

  return (
    <ButtonBase
      sx={{
        display: 'flex',
        height: '100%',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingY: 0.5,
        aspectRatio: '1/1',
        ':only-child': {
          margin: '0 auto',
        },
        backgroundColor: selected ? 'green' : 'yellow',
      }}
      onClick={toggleFormatOption}
    >
      <Image src={icon} sx={{ objectFit: 'contain', aspectRatio: '1/1' }} />
    </ButtonBase>
  );
}

function TrackFormatTopologySelectionButton({
  formats,
  topology,
}: {
  topology: TrackFormatTopology;
  formats: TrackFormat[];
}) {
  // formats.map((fmt) => console.log(`${fmt} : ${searchOptions.format[fmt]}`));

  const toggleOptions = (bool: boolean) => formats.reduce((a, v) => ({ ...a, [v]: bool }), {});

  return (
    <Button variant={'outlined'} onClick={() => {}}>
      <Typography>{topology}</Typography>
    </Button>
  );
}

function TrackFormatTopologySelectionHeader() {
  const TEMP: Record<TrackFormatTopology, TrackFormat[]> = {
    linear: LinearFormats,
    circular: CircularFormats,
  };

  return (
    <TrackTypeRowGrid
      sx={{
        gridTemplateRows: '50px',
      }}
    >
      <FlexBox>{/* TODO: 이거 클릭하면 전부 클릭 되는 것 */}</FlexBox>
      {TrackFormatTopologies.toSorted((a1, a2) => (a1 > a2 ? 1 : -1)).map((topology) => (
        <FlexBox
          sx={{ alignItems: 'center', justifyContent: 'center' }}
          key={`track-format-topology-header-${topology}`}
        >
          <TrackFormatTopologySelectionButton topology={topology} formats={TEMP[topology]} />
        </FlexBox>
      ))}
    </TrackTypeRowGrid>
  );
}

function TrackTypeSelection({ trackCategory }: { trackCategory: TrackCategory }) {
  const [
    searchOptions,
    _,
    {
      format: { setTrackFormat },
      category: { setTrackCategory },
    },
  ] = useTrackSearchFilters();

  const ICON_W = 67;
  const MIN_WIDTH = (ICON_W + 20) * 3;
  const ICON_LISTING_WIDTH = '70%';

  // console.log(`searchOptions.format : ${searchOptions.format}`);

  const allChecked = TEMP[trackCategory].map((fmt) => searchOptions.format[fmt]).every((v) => !!v);
  const toggleOptions = (bool: boolean) =>
    TEMP[trackCategory].reduce((a, v) => ({ ...a, [v]: bool }), {});

  // console.log(`toggleOptions(!allChecked) : ${JSON.stringify(toggleOptions(!allChecked))}`);

  const toggleOption = () => {
    // console.log(`toggleOptions(!allChecked) : ${JSON.stringify(toggleOptions(!allChecked))}`);
    const aa = {
      ...searchOptions.format,
      ...toggleOptions(!allChecked),
    };
    // console.log(`aa : ${JSON.stringify(aa)}`);
    setTrackFormat(aa);

    // const { [trackCategory]: prevVal, ...res } = searchOptions.category;
    // const aaa = {
    //   ...res,
    //   [trackCategory]: !prevVal,
    // };

    // setTrackCategory(aaa as Record<TrackCategory, boolean>);
  };
  const BackgroundColor = allChecked
    ? TRACK_COLOR[trackCategory].main
    : TRACK_COLOR[trackCategory].sub1;

  return (
    <TrackTypeRowGrid sx={{}}>
      {/* row */}
      <ButtonBase
        sx={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: BackgroundColor,
        }}
        onClick={toggleOption}
      >
        <Typography color={'white'} fontSize={21}>
          {trackCategory}
        </Typography>
      </ButtonBase>
      {TrackFormatTopologies.toSorted((a1, a2) => (a1 > a2 ? 1 : -1)).map((topology) => (
        <FlexBox
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: MIN_WIDTH,
            width: ICON_LISTING_WIDTH,
          }}
          key={`track-format-topology-${topology}`}
        >
          {tracks[trackCategory][topology].map((trackCategoryFormat) => (
            <TrackTypeFormatItem
              format={trackCategoryFormat.format}
              category={trackCategory}
              icon={trackCategoryFormat.icon}
              key={`select-${topology}-${trackCategory}-${trackCategoryFormat.format}`}
            />
          ))}
        </FlexBox>
      ))}
    </TrackTypeRowGrid>
  );
}

function TrackTypeSelectionDrag() {
  const DRAG: TrackCategory = 'drag';

  const BackgroundColor = TRACK_COLOR[DRAG].main;

  return (
    <TrackTypeDragRowGrid>
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
    </TrackTypeDragRowGrid>
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
        <TrackFormatTopologySelectionHeader />
        <TrackTypeSelection trackCategory="road" />
        <TrackTypeSelection trackCategory="street" />
        <TrackTypeSelection trackCategory="offRoad" />
        <TrackTypeSelection trackCategory="crossCountry" />
      </Box>
      <Box sx={{ minWidth: 450, maxWidth: 850, height: '100%', width: '100%' }}>
        <TrackTypeSelectionDrag />
      </Box>
    </FlexBox>
  );
}
