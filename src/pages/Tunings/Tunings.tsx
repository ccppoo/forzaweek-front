import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import * as image from '@/image';
import { CarAndTagSearch } from '@/components/Search';
import { TuningBriefCell } from '@/components/Tunings';
import TuningOptionFilter from '@/components/Tunings/TuningSearchFilter';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { tunings } from '@/data/tunings';
import { getCar2 } from '@/db/index';
import ScrollToTop from '@/hooks/useResetScroll';
import useCarAndTagFilter from '@/store/carAndTagFilter';

function TuningCellListingHeader() {
  const carDetail = {
    manufacture: 'Hyundai',
    year: 2021,
    country: 'Korea',
    name: '#98 Bryan Herta Autosport Elantra N',
    drive_train: 'FWD',
    body_style: 'sedan',
    door: 4,
    engine: 'ICE',
    FH5: {
      PI: 800,
      division: 'track toys',
    },
  };

  // 목차 시작, 자동차 사진 + 이름
  return (
    <FlexBox sx={{ flexDirection: 'row', paddingBottom: 2 }}>
      {/* 자동차 사진 */}
      <FlexBox sx={{ height: 80, aspectRatio: '16/9', maxWidth: '100%', alignItems: 'center' }}>
        <Image src={image.car.hyundaiElantra} sx={{ objectFit: 'contain' }} />
      </FlexBox>
      {/* 제조사, 이름, 연식 */}
      <FlexBox sx={{ flexDirection: 'column', paddingLeft: 1, justifyContent: 'center' }}>
        {/* 제조사 */}
        <FlexBox>
          <FlexBox
            sx={{
              aspectRatio: '1/1',
              height: 30,
            }}
          >
            <Image
              src={image.manufacturer.hyundai}
              sx={{
                objectFit: 'contain',
                borderTopLeftRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            />
          </FlexBox>
          <FlexBox sx={{ alignItems: 'center', paddingX: 1 }}>
            <Typography variant="subtitle2">{carDetail.manufacture}</Typography>
          </FlexBox>
        </FlexBox>

        <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
          <FlexBox>
            <Typography variant="subtitle1">{carDetail.name}</Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}

function TuningShowMore({ carName, searchScope }: { carName: string; searchScope: string }) {
  // TODO:  처음부터 Car DB의 ID로 받아서 DB 쿼리 안하고 바로 세팅할 수 있도록

  const {
    actions: {
      car: { setCar },
    },
  } = useCarAndTagFilter(searchScope);

  // more -> search filter 보여주고 있는 차로 세팅 -> 재검색

  const onClick = async () => {
    console.log(`show more - tuning`);
    const car2 = await getCar2(carName);
    console.log(`carInfo : ${JSON.stringify(car2)}`);
    setCar(car2);
  };

  return (
    <FlexBox sx={{ justifyContent: 'end', paddingX: 1, paddingTop: 1 }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', marginX: 1 }}>
        <Button onClick={onClick}>show more</Button>
      </FlexBox>
    </FlexBox>
  );
}

interface TuningCellListingInterface {
  searchScope: string;
  carName: string;
  showMore?: boolean | undefined;
}

function TuningCellListing(props: TuningCellListingInterface) {
  const { searchScope, carName, showMore } = props;

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', paddingBottom: 1 }}>
      <TuningCellListingHeader />
      <Grid container sx={{ width: '100%' }} spacing={2}>
        {[...tunings.slice(0, 6)].map((tuning) => (
          <TuningBriefCell tuning={tuning} key={`tuning-cell-${tuning.share_code}`} />
        ))}
      </Grid>
      {/* Show More Tunings */}
      {showMore && <TuningShowMore carName={carName} searchScope={searchScope} />}
    </FlexBox>
  );
}

function RecommandedTunings() {
  const searchScope = 'tunings';
  const carName = '#98 Elantra';
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <TuningCellListing searchScope={searchScope} carName={carName} showMore />
      <TuningCellListing searchScope={searchScope} carName={carName} showMore />
      <TuningCellListing searchScope={searchScope} carName={carName} showMore />
    </FlexBox>
  );
}

function TuningsSearchResults() {
  const [page, setPage] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', paddingBottom: 1 }}>
      <Grid container sx={{ width: '100%' }} spacing={2}>
        {[...tunings.slice(0, 6)].map((tuning) => (
          <TuningBriefCell tuning={tuning} key={`tuning-cell-${tuning.share_code}`} />
        ))}
      </Grid>
      {/* Pagination */}
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
        <Pagination count={10} page={page} onChange={handleChange} size="large" />
      </FlexBox>
    </FlexBox>
  );
}
function SearchResultTunings() {
  const searchScope = 'tunings';
  const carName = '#98 Elantra';
  return (
    <FlexBox sx={{ flexDirection: 'column', paddingTop: 3 }}>
      <FlexBox>
        <Typography variant="h6">Search results</Typography>
      </FlexBox>
      <TuningsSearchResults />
    </FlexBox>
  );
}

export default function Tunings() {
  const navigate = useNavigate();
  const searchScope = 'tunings';

  const {
    filter: { car, tags },
  } = useCarAndTagFilter(searchScope);

  // 1) 검색 조건이 없을 땐 -> 최근에 추가된 차, 검색 많이 된 차 미리 정해서 목록으로 올리기
  // 2) 검색 조건이 생기면 -> 검색 조건에 맞는 차 목록 만들기
  return (
    <Container sx={{ paddingTop: 2 }}>
      <FullSizeCenteredFlexBox sx={{ flexDirection: 'column' }}>
        <CarAndTagSearch searchScope={searchScope} doFinalSelect />
        <TuningOptionFilter />
        {/* if no car selected */}
        {car ? <SearchResultTunings /> : <RecommandedTunings />}
      </FullSizeCenteredFlexBox>
      <ScrollToTop />
    </Container>
  );
}
