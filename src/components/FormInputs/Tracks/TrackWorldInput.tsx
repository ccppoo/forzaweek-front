import { useState } from 'react';
import type { ArrayPath, FieldArrayPath, FieldArrayWithId, FieldPath } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { MenuItem, TextField, Typography } from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import FormControl from '@mui/material/FormControl';

import type { GameBase } from '@/FormData/game';
import type { TrackWorld } from '@/FormData/tracks/fh5/world';
import { Image } from '@/components/styled';
import { FlexBox } from '@/components/styled';
import { world_logo } from '@/image/world';
import { Worlds } from '@/types/fh5';

export default function TrackWorldInput<T extends TrackWorld & GameBase>() {
  // 나중에 FH4 대비
  const formPath = 'world' as FieldPath<T>;
  const { control, formState, register, getValues } = useFormContext<T>();
  const unitChoiceWidth = 100;

  const [worldSelected, setWorldSelection] = useState(getValues(formPath) as string);
  const worldsSelection = [
    {
      name: 'Mexico',
      image: world_logo.fh5.mexico,
      formValue: 'Mexico',
    },
    {
      name: 'Hot Wheels',
      image: world_logo.fh5.hot_wheels,
      formValue: 'Hot Wheels',
    },
    {
      name: 'Rally',
      image: world_logo.fh5.rally,
      formValue: 'Sierra Nueva',
    },
  ];

  // const helperText = formState.errors.name?.message ? 'Please input name' : undefined;
  return (
    <FlexBox sx={{ alignItems: 'center' }}>
      {worldsSelection.map((world) => {
        return (
          <FlexBox
            sx={{ width: 240, height: '100%', flexDirection: 'column' }}
            key={`world-select-button-${world.name}`}
          >
            <ButtonBase
              sx={{
                display: 'flex',
                width: 240,
                height: 135,
                border:
                  world.formValue == worldSelected ? '4px solid black' : '2px solid transparent',
              }}
              key={`track-preview-${world.name}`}
              onClick={() => setWorldSelection(world.formValue)}
            >
              <Image src={world.image} sx={{ objectFit: 'contain' }} />
            </ButtonBase>
            <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6">{world.name}</Typography>
            </FlexBox>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
}
