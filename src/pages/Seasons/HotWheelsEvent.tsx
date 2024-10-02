import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { mainSocketConfig } from '@/api/globalSocket';
import { FlexBox, Image } from '@/components/styled';

function SeasonChampionship() {
  const name = '역사 수업';
  const seasonPoint = 10;
  const reward = "Ford Mustang '16";
  const raceRouteType = 'off road';
  const carLimit = '1960년대 B';
  return (
    <FlexBox>
      {/* sub title */}
      <Typography>시즌 챔피언십</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* Challenge 아이콘 */}

      {/*  챔피언십 트랙 종류 */}
      <Typography>{raceRouteType}</Typography>
      {/* 점수 */}
      <Typography>{seasonPoint} 점</Typography>

      {/* 보상 */}
      <Typography>{reward}</Typography>
      {/* 차량 제한 */}
      <Typography>{carLimit}</Typography>
    </FlexBox>
  );
}

function DangerSign() {
  const name = '대포알';
  const seasonPoint = 3;
  const reward = '슈퍼 휠스핀';
  const speedTrapLocation = '** Danger Sign';
  const carLimit = 'Chevrolet S1';
  return (
    <FlexBox>
      {/* sub title */}
      <Typography>위험 표지판</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* 스피드트랩 아이콘 */}

      {/*  스피드 트랩 윛 */}
      <Typography>{speedTrapLocation}</Typography>
      {/* 점수 */}
      <Typography>{seasonPoint} 점</Typography>

      {/* 보상 */}
      <Typography>{reward}</Typography>
      {/* 차량 제한 */}
      <Typography>{carLimit}</Typography>
    </FlexBox>
  );
}

function SpeedTrap() {
  const name = '협곡로';
  const seasonPoint = 3;
  const reward = '슈퍼 휠스핀';
  const speedTrapLocation = '** speed trap';
  const carLimit = 'Chevrolet S1';
  return (
    <FlexBox>
      {/* sub title */}
      <Typography>스피드 트랩</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* 스피드트랩 아이콘 */}

      {/*  스피드 트랩 윛 */}
      <Typography>{speedTrapLocation}</Typography>
      {/* 점수 */}
      <Typography>{seasonPoint} 점</Typography>

      {/* 보상 */}
      <Typography>{reward}</Typography>
      {/* 차량 제한 */}
      <Typography>{carLimit}</Typography>
    </FlexBox>
  );
}

export function HotWheelsEvent() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <Typography variant="h4">Hot Wheels Event</Typography>
      <FlexBox sx={{ flexWrap: 'wrap' }}>
        <DangerSign />
        <SpeedTrap />
        <SeasonChampionship />
      </FlexBox>
      {/* <SpeedTrap /> */}
    </FlexBox>
  );
}
