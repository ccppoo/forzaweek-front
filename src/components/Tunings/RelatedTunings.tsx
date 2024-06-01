import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';

import * as image from '@/image';
import { PI_Card } from '@/components/PI';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { tunings } from '@/data/tunings';
import type { Tuning } from '@/data/tunings';

import { smallChartOptions } from './chartOption';

function ShareCode({ shareCode }: { shareCode: string }) {
  const share_code3 = [
    shareCode.substring(0, 3),
    shareCode.substring(3, 6),
    shareCode.substring(6, 9),
  ];

  return (
    <FlexBox
      sx={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <FlexBox
        sx={{
          width: 180,

          alignItems: 'center',
          justifyContent: 'center',
          columnGap: 1,
          borderRadius: 2,
          backgroundColor: '#d1d1d1',
        }}
      >
        {share_code3.map((code_peice) => {
          return (
            <Typography variant="h6" key={`share-code-piece-${code_peice}`}>
              {code_peice}
            </Typography>
          );
        })}
      </FlexBox>
    </FlexBox>
  );
}

function TuningBreifInfo({ tuning }: { tuning: Tuning }) {
  const tuningTitle = 'good tuning';
  const creator = tuning.creater.club
    ? `[${tuning.creater.club}] ${tuning.creater.id}`
    : tuning.creater.id;
  // TODO: 이쁘게
  return (
    <Grid xs={6} sx={{ display: 'flex', flexDirection: 'column' }}>
      <FlexBox sx={{ width: '100%' }}>
        <Typography>{tuningTitle}</Typography>
      </FlexBox>
      <FlexBox>
        <Typography>creator : {creator}</Typography>
      </FlexBox>

      <FlexBox>
        <Typography>tags : grip</Typography>
      </FlexBox>

      <FlexBox>
        <Typography>suspension : {tuning.suspension}</Typography>
      </FlexBox>
      <FlexBox>
        <Typography>tier : {tuning.tier}</Typography>
      </FlexBox>
      <FlexBox>
        <Typography>driving system : {tuning.driving_system}</Typography>
      </FlexBox>
      <ShareCode shareCode={tuning.share_code} />
    </Grid>
  );
}

function RelatedTuning({ tuning }: { tuning: Tuning }) {
  const series = [
    {
      name: 'performance',
      data: [
        tuning.performance.acceleration,
        tuning.performance.speed,
        tuning.performance.braking,
        tuning.performance.offroad,
        tuning.performance.launch,
        tuning.performance.handling,
      ],
    },
  ];

  return (
    <Grid xs={6} sx={{ display: 'flex', flexDirection: 'column', padding: 1 }}>
      <Paper sx={{ display: 'flex', width: '100%', height: '100%' }} elevation={4}>
        <FlexBox sx={{ width: 0, position: 'static', paddingTop: 1, paddingLeft: 1 }}>
          <PI_Card pi_number={tuning.PI} height={30} />
        </FlexBox>
        <Grid container sx={{ width: '100%' }}>
          {/* 성능 그래프 */}
          <Grid xs={6} sx={{ aspectRatio: '1/1' }}>
            <ReactApexChart
              series={series}
              options={smallChartOptions}
              width={'100%'}
              height={'100%'}
              type="radar"
              id={`radar-chart-${tuning.share_code}`}
            />
          </Grid>
          {/* 튜닝 간단 정보 */}
          <TuningBreifInfo tuning={tuning} />
        </Grid>
      </Paper>
    </Grid>
  );
}

export default function RelatedTunings() {
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

  console.log(`tuningSearchRange : ${JSON.stringify(tuningSearchRange)}`);

  return (
    <FlexBox
      sx={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <FlexBox>
        <Typography variant="h3">Tunings</Typography>
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
        <Grid container>
          {tunings
            .filter(
              (tuning) => tuning.PI > tuningSearchRange[0] && tuning.PI <= tuningSearchRange[1],
            )
            .slice(0, 6)
            .map((tuning) => {
              return (
                <RelatedTuning tuning={tuning} key={`tuning-${tuning.PI}-${tuning.share_code}`} />
              );
            })}
        </Grid>
      </FlexBox>
      {/* Pagination */}
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3 }}>
        <Pagination count={10} page={page} onChange={handleChange} size="large" />
      </FlexBox>
    </FlexBox>
  );
}
