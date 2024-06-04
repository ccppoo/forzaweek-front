import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { CarPreviewCard } from '@/components/Car';
import { CarFilterAndSelect } from '@/components/Search';
import { CarAndTagSearch } from '@/components/Search';
import { Image } from '@/components/styled';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import manufacturer2 from '@/image/manufacturer2';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';

export default function Cars() {
  const navigate = useNavigate();
  const searchScope = 'cars';
  const [_, searchResults, isSearchOptionEmpty] = useCarSearchFilters(searchScope);
  const totalCarString = (num: number) => `Total ${num} cars`;
  const TOTAL_CARS = 843;

  const searchResultsManufactures = [
    ...new Set(searchResults.map((carinfo) => carinfo.manufacture)),
  ].sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));

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
        <FlexBox
          sx={{
            width: '100%',
            // justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'column',
            rowGap: 1,
          }}
        >
          {searchResultsManufactures.map((manfuactre) => {
            // @ts-ignore
            const imgSrc = manufacturer2[manfuactre.toLowerCase().replace(' ', '_')];

            return (
              <FlexBox sx={{ flexDirection: 'column', width: '100%', paddingTop: 2 }}>
                <FlexBox sx={{ height: 40, alignItems: 'center', paddingBottom: 1, columnGap: 2 }}>
                  <Image
                    src={imgSrc}
                    sx={{
                      height: '100%',
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                  <Typography>{manfuactre}</Typography>
                </FlexBox>

                <FlexBox
                  sx={{
                    width: '100%',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    flexWrap: 'wrap',
                    rowGap: 1,
                  }}
                >
                  {searchResults
                    .filter((carinfo) => carinfo.manufacture == manfuactre)
                    .map((carinfo) => {
                      return <CarPreviewCard carInfo={carinfo} key={carinfo.name} />;
                    })}
                </FlexBox>
              </FlexBox>
            );
          })}
          {/* {searchResults ? (
            searchResults.map((carInfo) => {
              return <CarPreviewCard carInfo={carInfo} key={carInfo.name} />;
            })
          ) : (
            <FlexBox>loading</FlexBox>
          )} */}
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
