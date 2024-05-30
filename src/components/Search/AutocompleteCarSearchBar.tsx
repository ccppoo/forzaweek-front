import { useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';
import { useLiveQuery } from 'dexie-react-hooks';

import { FlexBox } from '@/components/styled';
import { db, getCarInfoByID } from '@/db';
import type { Car, CarImage, FH5_STAT } from '@/db/schema';
import useCarAndTagFilter from '@/store/carAndTagFilter';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';

async function getCarData(): Promise<Car[]> {
  return await db.car.toArray();
}

export default function AutocompleteCarSearchBar({ searchScope }: { searchScope: string }) {
  // 직접 검색해서 찾을 수 있는 검색 바
  // TODO: Selection -> DB에서 자동차 ID로 저장 + 하나 선택했으면 Search Filter 업데이트하기

  // const [options, _, __, { setOption }] = useCarSearchFilters();
  const {
    actions: {
      car: { setCar },
    },
  } = useCarAndTagFilter(searchScope);
  const options = useLiveQuery(getCarData) || [];
  const [selection, setSelection] = useState<Car | undefined>(undefined);
  const submitToCarTagFilter = async (carID: number) => {
    const car = await getCarInfoByID(carID);
    setCar(car);
  };
  return (
    <FlexBox sx={{ width: '100%', paddingY: 1 }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', paddingX: 1 }}>
        <SearchOutlinedIcon />
      </FlexBox>
      <Autocomplete
        id="tags-outlined"
        size="small"
        options={options}
        filterOptions={(options, state) => {
          const displayOptions = options.filter((option) =>
            option.name.toLowerCase().trim().includes(state.inputValue.toLowerCase().trim()),
          );

          return displayOptions;
        }}
        groupBy={(option: Car) => option.manufacture}
        getOptionLabel={(option: Car) => option.name}
        defaultValue={null}
        filterSelectedOptions
        onChange={(event: any, newValue: Car | null) => {
          setSelection(newValue || undefined);
          if (newValue?.id) {
            submitToCarTagFilter(newValue.id);
          }
          // setCar(newValue?.name)
        }}
        renderInput={(params) => <TextField {...params} placeholder={'Search car'} sx={{}} />}
        sx={{ width: '100%' }}
      />
    </FlexBox>
  );
}
