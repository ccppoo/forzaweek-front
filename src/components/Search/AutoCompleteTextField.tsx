import { useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import * as image from '@/image';
import { getCars } from '@/api/car';
import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { carInfoWithImage } from '@/data/cars';
import { CarData, CarInfo } from '@/data/types';
import { db } from '@/db';
import type { Car, CarImage, FH5_STAT } from '@/db/schema';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';

export default function AutocompleteTextField({
  searchScope,
  optionName,
  values,
  groupOptions,
  limitTags,
}: {
  searchScope: string;
  optionName: CarSearchOption;
  values: string[];
  groupOptions?: boolean;
  limitTags?: number;
}) {
  const [options, _, __, { setOption }] = useCarSearchFilters(searchScope);
  const setSearchOption = (name: string[]) => setOption(name, optionName);
  const selectedOptions = options[optionName];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <FlexBox sx={{ width: '100%', paddingX: 0 }}>
      <FlexBox sx={{ width: 180, alignItems: 'center' }}>
        <Typography variant="subtitle1">{optionName}</Typography>
      </FlexBox>
      <FlexBox sx={{ width: '100%' }}>
        <Autocomplete
          multiple
          limitTags={limitTags ? limitTags : undefined}
          id="tags-outlined"
          size="small"
          options={values}
          groupBy={groupOptions ? (option) => option[0] : undefined}
          getOptionLabel={(option) => option}
          defaultValue={selectedOptions}
          filterSelectedOptions
          onChange={(event: any, newValue: string[]) => {
            setSearchOption(newValue);
          }}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} size="small" />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={selectedOptions.length == 0 ? optionName : undefined}
              sx={{ 'aria-label': 'Without label' }}
            />
          )}
          sx={{ width: '100%' }}
        />
      </FlexBox>
    </FlexBox>
  );
}
