import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import type { ColorResult } from 'react-color';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';

import { Box, Button, MenuItem, Paper, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { supportLangs } from '@/config/i18n';
import type { Color } from '@/schema/tag/types';

interface InputTagColorIntf {
  label: string;
}

export function InputTagColor<T extends Color>(props: InputTagColorIntf) {
  const { register, formState, getValues, setValue } = useFormContext<T>();

  const { label } = props;
  const formPath = `color` as FieldPath<T>;

  const colorValue = getValues(formPath);
  const [color, setColor] = useState<string>(colorValue || '#000000');

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setColorValue = (colorHEX: string) => {
    setColor(colorHEX);
    setValue(formPath, colorHEX as PathValue<T, FieldPath<T>>);
  };

  const open = !!anchorEl;

  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <Button style={{ color: color, fontWeight: 700 }} onClick={handleClick} variant="outlined">
        {label}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <ChromePicker
          onChangeComplete={(color) => {
            setColorValue(color.hex);
          }}
          color={color}
        />
      </Popover>
    </FlexBox>
  );
}
