import { HTMLAttributes, useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import type {
  AutocompleteRenderGroupParams,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { darken, lighten, styled } from '@mui/system';

import { useLiveQuery } from 'dexie-react-hooks';

import { FlexBox } from '@/components/styled';
import { getAllCar, getCarFH5, getCarFH5FullType, searchCarByName } from '@/db/query/fh5/car';
import { getManufacturerById } from '@/db/query/real/manufacturer';
import useAsyncLiveQuery from '@/db/useAsyncLiveQuery';

/**
 * NOTE: 이 자동완성은 튜닝, 데칼 글 작성할 때 차 선택하는 컴포넌트
 */
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';
import {
  ManufacturerFullInput,
  ManufacturerFullType,
  ManufacturerInput,
  ManufacturerType,
} from '@/schema/real/types';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});

function ManufacturerGroupHeader({ manufacturerID }: { manufacturerID: string }) {
  const manufacturer = useLiveQuery<ManufacturerType | undefined>(
    async () => getManufacturerById(manufacturerID),
    [manufacturerID],
  );

  return <GroupHeader>{manufacturer?.name.en}</GroupHeader>;
}

interface AutocompleteCarSearchBar2Intf {
  searchScope: string;
  onSelect: (car: string) => void;
}

export default function AutocompleteCarSearchBar2(props: AutocompleteCarSearchBar2Intf) {
  // 직접 검색해서 찾을 수 있는 검색 바
  // TODO: Selection -> DB에서 자동차 ID로 저장 + 하나 선택했으면 Search Filter 업데이트하기

  const { searchScope, onSelect } = props;

  const [carID, setCarID] = useState<string | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>('');

  const { data: options, isLoading } = useAsyncLiveQuery<CarFH5FullType[]>({
    // queryFn: async () => searchCar({ query: inputValue }),
    queryFn: async () => searchCarByName({ query: inputValue }),
    queryKeys: [inputValue],
    defaultIfMissing: [],
    // enabled: inputValue.length > 0,
    placeHolder: [],
  });

  const carSelected = useLiveQuery<CarFH5FullType | undefined>(async () =>
    !!carID ? getCarFH5FullType(carID) : undefined,
  );

  const renderGroup = (params: AutocompleteRenderGroupParams) => {
    // console.log(`params.key : ${params.key}`);
    // console.log(`params.group : ${params.group}`);
    return (
      <li key={params.key}>
        <ManufacturerGroupHeader manufacturerID={params.group} />
        <GroupItems>{params.children}</GroupItems>
      </li>
    );
  };

  const getOptionLabel = (option: CarFH5FullType) => option.baseCar.name.en[0];

  const renderOptions = (
    props: HTMLAttributes<HTMLLIElement>,
    option: CarFH5FullType,
    state: AutocompleteRenderOptionState,
  ) => {
    const { ...optionProps } = props;
    const { selected } = state;
    const key = option.id;
    return (
      <Box
        {...optionProps}
        key={key}
        sx={{
          borderRadius: '8px',
          margin: '5px',
        }}
        component="li"
      >
        {getOptionLabel(option)}
      </Box>
    );
  };

  return (
    <FlexBox sx={{ width: '100%', paddingY: 1, paddingX: 3, justifyContent: 'center' }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', paddingX: 1 }}>
        <SearchOutlinedIcon />
      </FlexBox>
      <Autocomplete
        id="tags-outlined"
        size="small"
        options={options || []}
        renderGroup={renderGroup}
        // filterOptions={(options, state) => {
        //   const displayOptions = options.filter((option) => {
        //     const search = state.inputValue.toLowerCase().trim();
        //     return [
        //       option.name_en.toLowerCase().trim().includes(search),
        //       option.manufacturer.name_en.toLowerCase().trim().includes(search),
        //       option.short_name_en.toLowerCase().trim().includes(search),
        //     ].some((x) => x);
        //   });
        //   return displayOptions;
        // }}
        isOptionEqualToValue={(option: CarFH5FullType, value: CarFH5FullType | undefined) => {
          return value ? option.id == value.id : false;
        }}
        groupBy={(car: CarFH5FullType) => car.baseCar.manufacturer.id!!}
        getOptionLabel={getOptionLabel}
        defaultValue={null}
        autoSelect
        value={carSelected}
        // setCarID
        onChange={(event: any, newValue: CarFH5FullType | null) => {
          // newValue || removeCar();
          // setSelection(newValue || undefined);
          if (newValue?.id) {
            setCarID(newValue.id);
            onSelect(newValue.id);
          }
        }}
        renderOption={renderOptions}
        inputValue={inputValue}
        onInputChange={(event, newInputValue, reason) => {
          // console.log(`4`);
          setInputValue(newInputValue);
          // console.log(`reason : ${reason}`);
          // if (reason == 'reset') {
          //   setInputValue('');
          //   setCarValue(undefined);
          // }
        }}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} placeholder={'Search car'} sx={{}} />}
        sx={{ width: '100%' }}
      />
    </FlexBox>
  );
}
