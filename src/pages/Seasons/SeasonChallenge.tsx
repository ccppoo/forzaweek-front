import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { mainSocketConfig } from '@/api/globalSocket';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';

function Icon({ src, size }: { src: string; size: number }) {
  return <Image src={src} sx={{ width: size, height: size }} />;
}

function HideAndSeek() {
  //

  const name = '5 대 1';
  const reward = '슈퍼 휠스핀';
  const hideAndSeekIcon = 'https://fzwcdn.forzaweek.com/static/FH5/icon/hide_and_seek.png';
  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>숨바꼭질</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* Photo Challenge 아이콘 */}
      <Icon src={hideAndSeekIcon} size={75} />

      {/* 보상 */}
      <Typography>{reward}</Typography>
    </Paper>
  );
}

function HorizonOpen() {
  //

  const name = 'A, 실력을 보여줘';
  const reward = '자동차 경적 보상 - 색종이 대포';
  const horizonOpenIcon = 'https://fzwcdn.forzaweek.com/static/FH5/icon/horizon_open.png';
  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>Horizon 오픈</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* Photo Challenge 아이콘 */}
      <Icon src={horizonOpenIcon} size={75} />

      {/* 보상 */}
      <Typography>{reward}</Typography>
    </Paper>
  );
}

function PhotoChallenge() {
  //
  const name = '#스파이훈련';
  const photoChallengeDescription = '카스티요 산타 세실리아 호텔에서 탐정 탱크 사진을 찍으세요';
  const reward = 'Forza Link - wha tntkdgksepdy';
  const photoChallengeIcon =
    'https://fzwcdn.forzaweek.com/static/FH5/icon/season/photo_challenge.png';
  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>사진 챌린지</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* Photo Challenge 아이콘 */}
      <Icon src={photoChallengeIcon} size={75} />

      {/* 설명 */}
      <Typography>{photoChallengeDescription}</Typography>
      {/* 보상 */}
      <Typography>{reward}</Typography>
    </Paper>
  );
}

function TreasureHunt() {
  //

  const name = '파랑새처럼 자유롭게';
  const photoChallengeDescription = '카스티요 산타 세실리아 호텔에서 탐정 탱크 사진을 찍으세요';
  const reward = 'Forza Link - wha tntkdgksepdy';
  const treasuerHuntIcon = 'https://fzwcdn.forzaweek.com/static/FH5/icon/season/treasure_hunt.png';
  return (
    <Paper sx={{ width: 300, height: 300, padding: 1 }}>
      {/* sub title */}
      <Typography>보물 사냥</Typography>
      {/* main title */}
      <Typography>{name}</Typography>
      {/* Photo Challenge 아이콘 */}
      <Icon src={treasuerHuntIcon} size={75} />

      {/* 설명 */}
      <Typography>{photoChallengeDescription}</Typography>
      {/* 보상 */}
      <Typography>{reward}</Typography>
    </Paper>
  );
}

export function SeasonChallenge() {
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <Typography variant="h4">Season Challenge</Typography>
      <FlexBox sx={{ flexWrap: 'wrap' }}>
        <TreasureHunt />
        <PhotoChallenge />
        <HideAndSeek />
        <HorizonOpen />
      </FlexBox>
    </FlexBox>
  );
}
