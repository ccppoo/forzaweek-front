import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { mainSocketConfig } from '@/api/globalSocket';
import { FlexBox, Image } from '@/components/styled';

function Icon({ src, size }: { src: string; size: number }) {
  return <Image src={src} sx={{ width: size, height: size }} />;
}

function SeasonChampionship() {
  const name = '역사 수업';
  const seasonPoint = 10;
  const reward = "Ford Mustang '16";
  const raceRouteType = 'off road';
  const carLimit = '1960년대 B';

  const champRoadSprint =
    'https://fzwcdn.forzaweek.com/static/FH5/icon/season/champ_road_sprint.png';
  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>시즌 챔피언십</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* Challenge 아이콘 */}
      <Icon src={champRoadSprint} size={75} />
      {/*  챔피언십 트랙 종류 */}
      <Typography>{raceRouteType}</Typography>
      {/* 점수 */}
      <Typography>{seasonPoint} 점</Typography>

      {/* 보상 */}
      <Typography>{reward}</Typography>
      {/* 차량 제한 */}
      <Typography>{carLimit}</Typography>
    </Paper>
  );
}

function DangerSign() {
  const name = '대포알';
  const seasonPoint = 3;
  const reward = '슈퍼 휠스핀';
  const speedTrapLocation = '** Danger Sign';
  const carLimit = 'Chevrolet S1';
  const dangerSignIcon = 'https://fzwcdn.forzaweek.com/static/FH5/icon/season/danger_sign.png';
  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>위험 표지판</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* 스피드트랩 아이콘 */}
      <Icon src={dangerSignIcon} size={75} />

      {/*  스피드 트랩 윛 */}
      <Typography>{speedTrapLocation}</Typography>
      {/* 점수 */}
      <Typography>{seasonPoint} 점</Typography>

      {/* 보상 */}
      <Typography>{reward}</Typography>
      {/* 차량 제한 */}
      <Typography>{carLimit}</Typography>
    </Paper>
  );
}

function SpeedTrap() {
  const name = '협곡로';
  const seasonPoint = 3;
  const reward = '슈퍼 휠스핀';
  const speedTrapLocation = '** speed trap';
  const carLimit = 'Chevrolet S1';
  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
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
    </Paper>
  );
}

export function RallyAdventureEvent() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <Typography variant="h4">Rally Adventure Event</Typography>
      <FlexBox sx={{ flexWrap: 'wrap' }}>
        <DangerSign />
        <SeasonChampionship />
      </FlexBox>
      {/* <SpeedTrap /> */}
    </FlexBox>
  );
}
