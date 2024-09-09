import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

import TrackAndTagSearch from '@/components/Search/TrackAndTagSearch';
import RaceRoutePreviewCell from '@/components/Track/RaceRoutePreviewCell';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useTrackSearchFilters from '@/store/trackSearchFilters';

// import Map from './Map';

export default function Tracks() {
  const navigate = useNavigate();
  const [_, raceRouteFH5IDs] = useTrackSearchFilters();

  const searchScope = 'track-browse';
  const MAP_HEIGHT = 600;
  const MAP_WIDTH = 1100;

  // console.log(`tracks : ${JSON.stringify(tracks)}`);

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
          {raceRouteFH5IDs.map((raceRouteFH5ID: string) => {
            return (
              <RaceRoutePreviewCell
                raceRouteID={raceRouteFH5ID}
                key={`race-rout-${raceRouteFH5ID}`}
              />
            );
          })}
        </FlexBox>
      </FullSizeCenteredFlexBox>
    </Container>
  );
}
