import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonBase,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { useLiveQuery } from 'dexie-react-hooks';

import * as image from '@/image';
import { RouterLinkWrapper } from '@/components/Routing/LinkWrapper';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { getRaceRouteFH5 } from '@/db/query/fh5/raceRoute';
import type { RaceRouteFH5Input, RaceRouteFH5Type } from '@/schema/fh5/types';
import type { FH5_Category, FH5_Format } from '@/types/fh5/race_route';

type TrackType = 'road' | 'offRoad' | 'crossCountry' | 'street' | 'drag';
type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
type RaceRouteIcon = PartialRecord<FH5_Format, string>;

const trackIcon: PartialRecord<FH5_Category, RaceRouteIcon> = {
  road: {
    circuit: image.track_icon.road_track,
    sprint: image.track_icon.road_sprint,
  },
  offroad: {
    trail: image.track_icon.offroad_track,
    scramble: image.track_icon.offroad_sprint,
  },
  crosscountry: {
    crosscountry: image.track_icon.crosscounrty_sprint,
    circuit: image.track_icon.crosscounrty_track,
  },
  street: {
    street: image.track_icon.street_racing,
  },
  drag: {
    drag: image.track_icon.drag_racing,
  },
};

const raceRouteEventIcon = {
  goliath: image.track_icon.goliath,
  colossus: image.track_icon.colossus,
};
// The Titan
// event: The Goliath
// event: The Colossus
// juggernaut: image.track_icon.juggernaut,
// titan: image.track_icon.titan,
// marathon: image.track_icon.marathon,

function getTrackIcon({
  category,
  format,
  event,
}: {
  category: string;
  format: string;
  event: string | undefined;
}): string | undefined {
  if (format == 'showcase') {
  }
  if (event) {
  }

  const trackIcon_ = trackIcon[category as FH5_Category];
  if (!trackIcon_) return undefined;
  return trackIcon_[format as FH5_Format];
}

function RaceRouteName({ raceRoute }: { raceRoute: RaceRouteFH5Type }) {
  raceRoute.category;
  const { category, raceFormat: format, event } = raceRoute;
  // const iconSrc = getTrackIcon({ category, format, event });
  const iconSrc = raceRoute.iconURL;
  const raceRouteName = raceRoute.name.en;
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
            src={iconSrc}
            sx={{
              objectFit: 'contain',
            }}
          />
        </Box>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <Typography variant="h5">{raceRouteName}</Typography>
        </FlexBox>
      </FlexBox>
      {/* 맵 특징 태그,  */}
      <FlexBox sx={{ width: '100%' }}></FlexBox>
      {/* 추천 튜닝으로 가는 바로가기 */}
      <FlexBox sx={{ width: '100%' }}></FlexBox>
    </FlexBox>
  );
}

function RaceRoutePreview({ image }: { image: string }) {
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
        src={image}
        // sx={{ objectFit: 'contain', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}
        sx={{ objectFit: 'fill', borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}
      />
    </FlexBox>
  );
}

export default function RaceRoutePreviewCell({ raceRouteID }: { raceRouteID: string }) {
  const WIDTH = '100%';
  const HEIGHT = 200;

  const raceRouteFH5: RaceRouteFH5Type | undefined = useLiveQuery(
    async () => await getRaceRouteFH5(raceRouteID!),
    [raceRouteID],
  );

  const game = 'FH5';
  const raceRoute_name_ = raceRouteFH5?.name.en;
  const raceRoute_image =
    raceRouteFH5?.fullPathImage.zoom_in || raceRouteFH5?.fullPathImage.zoom_out;
  const track_href = `/${game}/raceroute/${raceRoute_name_}`;

  if (raceRouteFH5) {
    return (
      <Paper
        sx={{
          width: WIDTH,
          maxWidth: 1200,
          height: HEIGHT,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
        }}
      >
        <RouterLinkWrapper to={track_href}>
          <FlexBox sx={{ display: 'flex', width: '100%', height: '100%' }}>
            {raceRoute_image && <RaceRoutePreview image={raceRoute_image} />}
            <RaceRouteName raceRoute={raceRouteFH5!} />
          </FlexBox>
        </RouterLinkWrapper>
      </Paper>
    );
  }
}
