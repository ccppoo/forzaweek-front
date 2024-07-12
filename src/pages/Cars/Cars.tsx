import { ScrollRestoration, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { CarPreviewCard } from '@/components/Car';
import { CarFilterAndSelect } from '@/components/Search';
import { CarAndTagSearch } from '@/components/Search';
import { Image } from '@/components/styled';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Manufacturer } from '@/db/schema';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';

const sortedManufacutererSet = (manufacturerers: Manufacturer[]): Manufacturer[] => {
  const IDset: string[] = [...new Set(manufacturerers.map((manufacturerer) => manufacturerer.id))];

  const _mans = IDset.map((id) => {
    let _man = undefined;
    for (const man of manufacturerers) {
      if (man.id == id) {
        _man = man;
        break;
      }
    }
    if (_man) {
      return _man;
    }
  });
  const _mans2 = _mans
    .filter((x) => x != undefined)
    .sort((a, b) => (a.name_en.toLowerCase() > b.name_en.toLowerCase() ? 1 : -1));
  return _mans2;
};

export default function Cars() {
  const navigate = useNavigate();
  const searchScope = 'cars';
  const [_, searchResults, isSearchOptionEmpty] = useCarSearchFilters(searchScope);
  const totalCarString = (num: number) => `Total ${num} cars`;
  const TOTAL_CARS = 843;

  const searchResultManufacturers = sortedManufacutererSet(
    searchResults.map((carinfo) => carinfo.manufacturer),
  );

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
            paddingBottom: 4,
            alignItems: 'center',
            flexDirection: 'column',
            rowGap: 1,
          }}
        >
          {searchResultManufacturers.map((man) => {
            // @ts-ignore
            const imgSrc = man.imageURL;

            return (
              <FlexBox
                sx={{ flexDirection: 'column', width: '100%', paddingTop: 2 }}
                key={`search-manufacturer-${man.name_en}`}
              >
                <FlexBox
                  sx={{
                    height: 50,
                    alignItems: 'center',
                    marginTop: 2,
                    paddingBottom: 1,
                    paddingLeft: 1,
                    columnGap: 2,
                  }}
                >
                  <Image
                    src={imgSrc}
                    sx={{
                      height: 30,
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                  <Typography>{man.name_en}</Typography>
                </FlexBox>

                <FlexBox
                  sx={{
                    width: '100%',
                    justifyContent: 'space-between',
                    // alignItems: 'center',
                    flexWrap: 'wrap',
                    rowGap: 1.5,
                  }}
                >
                  {searchResults
                    .filter((carinfo) => carinfo.manufacturer.id == man.id)
                    .map((carinfo) => {
                      return (
                        <CarPreviewCard
                          carInfo={carinfo}
                          key={`car-preview-card-${carinfo.id}-${carinfo.name_en}`}
                        />
                      );
                    })}
                </FlexBox>
              </FlexBox>
            );
          })}
        </FlexBox>
      </FlexBox>
    </Container>
  );
}
