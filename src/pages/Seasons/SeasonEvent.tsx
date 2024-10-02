import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { mainSocketConfig } from '@/api/globalSocket';
import { FlexBox, Image } from '@/components/styled';

function Icon({ src, size }: { src: string; size: number }) {
  return <Image src={src} sx={{ width: size, height: size }} />;
}

function WeeklyChallenge() {
  //
  const name = 'Acura적인 정확한 디테일';
  const carLimit = '슈퍼 세단 A';
  const seasonPoint = 10;
  const reward = "Acura NSX'17";
  const weeklyChanllengeIcon =
    'https://fzwcdn.forzaweek.com/static/FH5/icon/season/Weekly_Challenge.png';

  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>도전</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* Challenge 아이콘 */}
      <Icon src={weeklyChanllengeIcon} size={75} />

      {/* 점수 */}
      <Typography>{seasonPoint} 점</Typography>

      {/* 보상 */}
      <Typography>{reward}</Typography>
      {/* 차량 제한 */}
      <Typography>{carLimit}</Typography>
    </Paper>
  );
}

function EventLab() {
  const eventMapCreator = 'TORQUEDEMONZ';
  const eventMapName = 'Circuit Des Reines';
  const eventMapDescription =
    'Located in the valley of the Royal Lands, this technical yet throttle-friendly course is perfect for competitive racing. Enjoy!';
  const carLimit = '슈퍼 세단 A';
  const reward = '슈퍼 휠스핀';
  const seasonPoint = 3;
  const eventLabIcon = 'https://fzwcdn.forzaweek.com/static/FH5/icon/season/event_lab.png';
  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>이벤트 랩</Typography>
      {/* main title */}
      <Typography>{eventMapCreator} 제공</Typography>

      {/* Challenge 아이콘 */}
      <Icon src={eventLabIcon} size={75} />
      {/*  이벤트 랩 이름 */}
      <Typography>{eventMapName}</Typography>
      {/*  이벤트 랩 설명  */}
      <Typography>{eventMapDescription}</Typography>
      {/* 점수 */}
      <Typography>{seasonPoint} 점</Typography>

      {/* 보상 */}
      <Typography>{reward}</Typography>
      {/* 차량 제한 */}
      <Typography>{carLimit}</Typography>
    </Paper>
  );
}

function SeasonChampionship() {
  //
  // https://fzwcdn.forzaweek.com/static/FH5/icon/season/champ_cross_country.png
  // https://fzwcdn.forzaweek.com/static/FH5/icon/season/champ_hazard_sprint.png
  // https://fzwcdn.forzaweek.com/static/FH5/icon/season/champ_off_road_circuit.png
  // https://fzwcdn.forzaweek.com/static/FH5/icon/season/champ_road_circuit.png

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

function HorizonArcade() {
  const name = '미니 게임';
  const seasonPoint = 5;
  const reward = '슈퍼 휠스핀';
  const horizonArcadeIcon = 'https://fzwcdn.forzaweek.com/static/FH5/icon/Horizon_Arcade.png';

  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>Horizon 아케이드</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* 아케이드 아이콘 */}
      <Icon src={horizonArcadeIcon} size={75} />

      {/* 점수 */}
      <Typography>{seasonPoint} 점</Typography>

      {/* 보상 */}
      <Typography>{reward}</Typography>
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
  const speedTrapIcon = 'https://fzwcdn.forzaweek.com/static/FH5/icon/season/speed_trap.png';
  const speedZoneIcon = 'https://fzwcdn.forzaweek.com/static/FH5/icon/season/speed_zone.png';
  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>스피드 트랩</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* 스피드트랩 아이콘 */}
      <Icon src={speedTrapIcon} size={75} />

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

export function SeasonEvent() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <Typography variant="h4">Season Event</Typography>

      <FlexBox sx={{ flexWrap: 'wrap' }}>
        <HorizonArcade />
        <WeeklyChallenge />
        <EventLab />
        <DangerSign />
        <SpeedTrap />
        <SeasonChampionship />
      </FlexBox>
    </FlexBox>
  );
}
