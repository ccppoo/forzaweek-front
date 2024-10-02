import { ScrollRestoration, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

import { useLiveQuery } from 'dexie-react-hooks';

import { CarPreviewCard } from '@/components/Car';
import { CarFilterAndSelect } from '@/components/Search';
import { CarAndTagSearch } from '@/components/Search';
import { Image } from '@/components/styled';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { groupByManufacturer } from '@/db/query/fh5/car';
import { getManufacturerById } from '@/db/query/real/manufacturer';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';

function ManufacturerHead({ manufacturerID }: { manufacturerID: string }) {
  const man = useLiveQuery(() => getManufacturerById(manufacturerID), [manufacturerID]);

  return (
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
        src={man?.imageURL}
        sx={{
          height: 30,
          width: 'auto',
          objectFit: 'contain',
        }}
      />
      <Typography>{man?.name.en}</Typography>
    </FlexBox>
  );
}

function CarListing({ carFH5IDs }: { carFH5IDs: string[] }) {
  // searchResults -> CarFH5 ID

  // const carManu: { [key: string]: string[] } | undefined = useLiveQuery(
  //   async () => await groupByManufacturer(carFH5IDs),
  //   [...carFH5IDs],
  // );

  return (
    <FlexBox
      sx={{
        width: '100%',
        justifyContent: 'space-evenly',
        paddingBottom: 4,
        alignItems: 'center',
        // flexDirection: 'column',
        rowGap: 2,
        flexWrap: 'wrap',
      }}
    >
      {carFH5IDs.map((carFH5ID) => {
        return <CarPreviewCard carFH5ID={carFH5ID} key={`car-preview-card-${carFH5ID}`} />;
      })}
    </FlexBox>
  );
}

export default function Cars() {
  const navigate = useNavigate();
  const searchScope = 'cars';
  const [_, searchResults, isSearchOptionEmpty] = useCarSearchFilters(searchScope);
  const totalCarString = (num: number) => `Total ${num} cars`;
  const TOTAL_CARS = 843;

  // console.log(
  //   `searchResultManufacturers : ${searchResultManufacturers.length} ${JSON.stringify(
  //     searchResultManufacturers,
  //   )}`,
  // );

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
        {searchResults.length ? (
          <CarListing carFH5IDs={searchResults} />
        ) : (
          <Skeleton variant="rectangular" width={210} height={60} />
        )}
      </FlexBox>
    </Container>
  );
}
