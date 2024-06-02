import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import { CarPreviewCard } from '@/components/Car';
import { CarFilterAndSelect } from '@/components/Search';
import { CarAndTagSearch } from '@/components/Search';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';

export default function Cars() {
  const navigate = useNavigate();
  const searchScope = 'cars';
  const [_, searchResults, isSearchOptionEmpty] = useCarSearchFilters(searchScope);
  const totalCarString = (num: number) => `Total ${num} cars`;
  const TOTAL_CARS = 843;

  return (
    <Container sx={{ paddingTop: 2 }}>
      <FlexBox sx={{ flexDirection: 'column', rowGap: 2, paddingTop: 1 }}>
        {/* <NewCars /> */}

        {/* car search */}
        {/* <CarFilterAndSelect scope={carSearchScope} /> */}
        {/* 차, 태그 검색 */}
        <CarAndTagSearch searchScope={searchScope} />
        <FlexBox sx={{ height: 30, alignItems: 'center' }}>
          <Typography variant="h6">
            {isSearchOptionEmpty
              ? totalCarString(TOTAL_CARS)
              : searchResults
                ? totalCarString(searchResults.length)
                : 'searching...'}
          </Typography>
        </FlexBox>
        {/* search result cars */}
        <Grid
          container
          sx={{
            justifyContent: 'space-between',
          }}
          columnSpacing={{ xs: 1, md: 1 }}
          rowSpacing={{ xs: 1, md: 1 }}
        >
          {searchResults ? (
            searchResults.map((carInfo) => {
              return <CarPreviewCard carInfo={carInfo} key={carInfo.name} />;
            })
          ) : (
            <FlexBox>loading</FlexBox>
          )}
        </Grid>
      </FlexBox>
    </Container>
  );
}
