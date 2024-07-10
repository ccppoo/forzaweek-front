import { useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useLiveQuery } from 'dexie-react-hooks';

import { FlexBox } from '@/components/styled';
import { getAllCarInfoSimple, getCar2 } from '@/db';
import useCarAndTagFilter from '@/store/carAndTagFilter';
import type { CarInfoSimple } from '@/types/car';

export default function AutocompleteCarSearchBar({ searchScope }: { searchScope: string }) {
  // 직접 검색해서 찾을 수 있는 검색 바
  // TODO: Selection -> DB에서 자동차 ID로 저장 + 하나 선택했으면 Search Filter 업데이트하기

  const {
    filter: { car },
    actions: {
      car: { setCar, removeCar },
    },
  } = useCarAndTagFilter(searchScope);
  const options = useLiveQuery<CarInfoSimple[]>(getAllCarInfoSimple) || [];
  const [selection, setSelection] = useState<CarInfoSimple | undefined>(undefined);
  const submitToCarTagFilter = async (carID: string) => {
    const car = await getCar2(carID);
    setCar(car);
  };
  return (
    <FlexBox sx={{ width: '100%', paddingY: 1, justifyContent: 'center' }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', paddingX: 1 }}>
        <SearchOutlinedIcon />
      </FlexBox>
      <Autocomplete
        id="tags-outlined"
        size="small"
        options={options}
        filterOptions={(options, state) => {
          const displayOptions = options.filter((option) =>
            option.name_en.toLowerCase().trim().includes(state.inputValue.toLowerCase().trim()),
          );

          return displayOptions;
        }}
        groupBy={(car: CarInfoSimple) => car.manufacturer.id}
        getOptionLabel={(option: CarInfoSimple) => option.name_en}
        defaultValue={null}
        // value={selection}
        filterSelectedOptions
        onChange={(event: any, newValue: CarInfoSimple | null) => {
          newValue || removeCar();
          setSelection(newValue || undefined);
          if (newValue?.id) {
            submitToCarTagFilter(newValue.id);
          }
        }}
        renderInput={(params) => <TextField {...params} placeholder={'Search car'} sx={{}} />}
        sx={{ width: '60%', overscrollBehavior: 'contain' }}
      />
    </FlexBox>
  );
}
