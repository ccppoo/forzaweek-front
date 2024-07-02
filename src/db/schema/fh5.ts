export interface FH5_STAT {
  id?: number;
  division: string;
  rarity: string;
  boost: string;
  value: number;

  PI: number;
  speed: number;
  handling: number;
  acceleration: number;
  launch: number;
  braking: number;
  offroad: number;
}

export interface FH5_META {
  id: string;
  division: string;
  rarity: string;
  boost: string;
  value: number;
}

// 어차피 튜닝 페이지에서 가져오는 스탯 정보는 IndexedDB에 따로 저장하지 않으므로
// 기본차 스탯만 저장하는 것임
export interface FH5_Performance {
  id: string;

  PI: number;
  speed: number;
  handling: number;
  acceleration: number;
  launch: number;
  braking: number;
  offroad: number;
}
