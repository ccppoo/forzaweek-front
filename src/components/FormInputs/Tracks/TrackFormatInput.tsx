import { useState } from 'react';
import type { ArrayPath, FieldArrayPath, FieldPath, PathValue } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button, MenuItem, TextField, Typography } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import FormControl from '@mui/material/FormControl';

import type { GameBase } from '@/FormData/game';
import type { TrackCategory } from '@/FormData/tracks/fh5/category';
import type { TrackFormat } from '@/FormData/tracks/fh5/format';
import type { TrackWorld } from '@/FormData/tracks/fh5/world';
import { Image } from '@/components/styled';
import { FlexBox } from '@/components/styled';
import { trackIcons } from '@/image/track_icon';
import type { GAME } from '@/types';
import { TrackFormats } from '@/types/fh5';
import { Worlds } from '@/types/fh5';
import type { TrackFormat as TrackFormatType, World } from '@/types/fh5';

type TrackFormatAndIcon = {
  format: TrackFormatType;
  icon: string;
};

// type WorldTrackFormat = Record<'FH5', Record<World, Record<TrackFormatType>>>;

const Mexico = [
  {
    category: 'road',
    name: 'circuit',
    icon: trackIcons.road_track,
    laps: 1,
  },
  {
    category: 'road',
    name: 'sprint',
    icon: trackIcons.road_sprint,
    laps: 0,
  },
  {
    category: 'offRoad',
    name: 'scramble',
    icon: trackIcons.offroad_track,
    laps: 1,
  },
  {
    category: 'offRoad',
    name: 'trail',
    icon: trackIcons.offroad_sprint,
    laps: 0,
  },
  {
    category: 'crossCountry',
    name: 'circuit',
    icon: trackIcons.crosscountry_track,
    laps: 1,
  },
  {
    category: 'crossCountry',
    name: 'crossCountry',
    icon: trackIcons.crosscountry_sprint,
    laps: 0,
  },
  {
    category: 'street',
    name: 'street',
    icon: trackIcons.street_racing,
    laps: 0,
  },
  {
    category: 'drag',
    name: 'drag',
    icon: trackIcons.drag_racing,
    laps: 0,
  },
];

// NOTE: 특별 이벤트 : 골리앗, 콜로서스, 마라톤, 등 -> 직접 추가함

export default function TrackFormatInput<
  T extends TrackFormat & TrackCategory & TrackWorld & GameBase,
>() {
  type FormDataType = PathValue<T, FieldPath<T>>;

  const trackWorldFormPath = 'world' as FieldPath<T>;

  const trackCategoryFormPath = 'category' as FieldPath<T>;
  const trackFormatFormPath = 'format' as FieldPath<T>;
  const trackLapsFormPath = 'laps' as FieldPath<T>;

  const { control, watch, setValue, getValues } = useFormContext<T>();

  const [worldSelected, _] = useState(getValues(trackWorldFormPath) as string);
  const [trackCategorySelected, setTrackCategorySelected] = useState(
    getValues(trackCategoryFormPath) as string,
  );
  const [trackFormatSelected, setTrackFormatSelected] = useState(
    getValues(trackFormatFormPath) as string,
  );

  const selectOption = ({
    category,
    format,
    laps,
  }: {
    category: string;
    format: string;
    laps: number;
  }) => {
    setValue(trackCategoryFormPath, category as FormDataType);
    setValue(trackFormatFormPath, format as FormDataType);
    setValue(trackLapsFormPath, laps as FormDataType);
    // console.log(`category : ${category}, format : ${format},laps : ${laps}`);
  };

  // console.log(
  //   `${getValues(trackWorldFormPath)} ${getValues(trackCategoryFormPath)} ${getValues(
  //     trackLapsFormPath,
  //   )}`,
  // );

  const T_world = watch(trackWorldFormPath);
  const T_format = watch(trackFormatFormPath);
  const T_categorty = watch(trackCategoryFormPath);
  const T_laps = watch(trackLapsFormPath);

  const addLaps = (delta: number) => {
    const lapBefore = getValues(trackLapsFormPath) as number;
    if (lapBefore + delta < 1) {
      return;
    }
    setValue(trackLapsFormPath, (lapBefore + delta) as FormDataType);
  };

  // const helperText = formState.errors.name?.message ? 'Please input name' : undefined;
  // 트랙 아이콘으로 버튼 -> 서킷 형태면 Lap TextInput 활성화
  // TODO: Trackformat -> circuit,scramble 일 때 Laps 항목 추가해서 ( +, - ) 아이콘 버튼으로 Laps 수정할 수 있게 하기
  return (
    <FlexBox
      sx={{ justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: '80%' }}
    >
      {/* 월드마다 있는 트랙 포맷 아이콘 버튼 */}
      {Mexico.map((trackFormat) => {
        const isSelected =
          T_categorty == trackFormat.category &&
          !!T_laps == !!trackFormat.laps &&
          T_format == trackFormat.name;
        return (
          <FlexBox
            sx={{
              width: 150,
              height: '100%',
              flexDirection: 'column',
              alignItems: 'center',
              flex: '1 1 25%',
            }}
            key={`track-format-icon-${trackFormat.name}-${trackFormat.category}`}
          >
            <ButtonBase
              sx={{
                display: 'flex',
                width: 75,
                height: 75,
                border: isSelected ? '4px solid black' : '2px solid transparent',
              }}
              key={`track-preview-${trackFormat.name}`}
              onClick={() =>
                selectOption({
                  category: trackFormat.category,
                  laps: trackFormat.laps,
                  format: trackFormat.name,
                })
              }
            >
              <Image src={trackFormat.icon} sx={{ objectFit: 'contain' }} />
            </ButtonBase>
            <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{trackFormat.name}</Typography>
            </FlexBox>
          </FlexBox>
        );
      })}

      <FlexBox
        sx={{
          opacity: !T_laps ? 0.4 : 1,
          pointerEvents: !T_laps ? 'none' : 'auto',
          paddingY: 2,
        }}
      >
        <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <Typography>{T_laps} Laps</Typography>
        </FlexBox>

        <FlexBox>
          <FlexBox sx={{ columnGap: 1, paddingX: 2 }}>
            <Button
              variant="outlined"
              disabled={(T_laps as number) < 2}
              color="error"
              onClick={() => addLaps(-1)}
            >
              <Typography fontWeight={800}>- 1</Typography>
            </Button>
            <Button variant="outlined" onClick={() => addLaps(1)}>
              <Typography fontWeight={800}>+ 1</Typography>
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
