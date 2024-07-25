import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import { useQuery } from '@tanstack/react-query';

import { GetTuning, SearchTunings } from '@/api/data/tuning';
import { PI_Card } from '@/components/PI';
import { FlexBox } from '@/components/styled';
import { getCar2 } from '@/db';
import useCarAndTagFilter from '@/store/carAndTagFilter';

import TuningBriefCell from './TuningBriefCell';

function TuningsShowMore({ carID }: { carID: string }) {
  const {
    actions: {
      car: { setCar: searchCarTuning },
    },
  } = useCarAndTagFilter('tunings');
  const navigate = useNavigate();

  const goto = (relativePath: string) => navigate(relativePath);

  const goSearchTunings = async () => {
    const car2 = await getCar2(carID);
    searchCarTuning(car2);
    goto('/FH5/tuning');
  };
  const onClick = async () => {
    await goSearchTunings();
  };

  return (
    <FlexBox sx={{ justifyContent: 'end', paddingX: 1, paddingTop: 1 }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', marginX: 1 }}>
        <Button onClick={onClick}>show more tunings</Button>
      </FlexBox>
    </FlexBox>
  );
}

interface RelatedTuningsIntf {
  carID?: string;
  trackID?: string;
}

export default function RelatedTunings(props: RelatedTuningsIntf) {
  // 관련 튜닝 -> 태그, 차, 트랙 : 태그로 변경, PI
  const { carID, trackID } = props;

  const TUNING_CLASSES = ['D', 'C', 'B', 'A', 'S1', 'S2', 'X'];
  const TUNING_NUM = {
    D: 500,
    C: 600,
    B: 700,
    A: 800,
    S1: 900,
    S2: 998,
    X: 999,
  };

  const ceilPI = (pi: number) => {
    if (pi <= 500) return 500; // D
    if (pi <= 600) return 600; // C
    if (pi <= 700) return 700; // B
    if (pi <= 800) return 800; // A
    if (pi <= 900) return 900; // S1
    if (pi <= 998) return 998; // S2
    return 1000; // X
  };
  const floorPI = (pi: number) => {
    if (pi <= 500) return 100; // D
    if (pi <= 600) return 501; // C
    if (pi <= 700) return 601; // B
    if (pi <= 800) return 701; // A
    if (pi <= 900) return 801; // S1
    if (pi <= 998) return 901; // S2
    return 999; // X
  };
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [tuningSearchRange, setTuningSearchRange] = useState<number[]>([900, 998]);
  const setTuningSearchClass = (currPI: number) => {
    setTuningSearchRange([floorPI(currPI), ceilPI(currPI)]);
  };
  const [itemLimit, setItemLimit] = useState<number>(10);

  // console.log(`tuningSearchRange : ${JSON.stringify(tuningSearchRange)}`);

  const { data } = useQuery({
    queryKey: ['tuning-search', carID, page, itemLimit],
    queryFn: SearchTunings,
    enabled: !!carID,
  });

  if (data) {
    return (
      <FlexBox
        sx={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
        }}
      >
        <FlexBox>
          <Typography variant="h5">Tunings</Typography>
        </FlexBox>
        <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 1 }}>
          {/* Tuning class */}
          <FlexBox
            sx={{
              height: 60,
              backgroundColor: '#cfcccc',
              justifyContent: 'center',
              alignItems: 'center',
              columnGap: 5,
            }}
          >
            {Object.values(TUNING_NUM).map((val) => {
              return (
                <ButtonBase
                  onClick={() => setTuningSearchClass(val)}
                  key={`pi-card-val-${val}-button`}
                >
                  <PI_Card pi_number={val} height={40} />
                </ButtonBase>
              );
            })}
          </FlexBox>

          {/* 선택된 클래스에 있는 튜닝들 */}
          <Grid container spacing={2}>
            {data.map((tuning) => {
              return (
                <TuningBriefCell tuning={tuning} key={`tuning-${carID}-${tuning.share_code}`} />
              );
            })}
          </Grid>
        </FlexBox>
        <TuningsShowMore carID={carID!} />
      </FlexBox>
    );
  }
}
