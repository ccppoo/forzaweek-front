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
import { ManufacturerType } from '@/schema/real/types';

function getOptionLabel(option: CarFH5FullType) {
  return option.baseCar.name.en[0];
}

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
  carID: string | undefined;
  setCarID: (car: string | undefined) => void;
}

function renderOptions(
  props: HTMLAttributes<HTMLLIElement>,
  option: CarFH5FullType,
  state: AutocompleteRenderOptionState,
) {
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
}

function renderGroup(params: AutocompleteRenderGroupParams) {
  // console.log(`params.key : ${params.key}`);
  // console.log(`params.group : ${params.group}`);
  return (
    <li key={params.key}>
      <ManufacturerGroupHeader manufacturerID={params.group} />
      <GroupItems>{params.children}</GroupItems>
    </li>
  );
}

export default function AutocompleteCarSearchBarSelect(props: AutocompleteCarSearchBar2Intf) {
  // 직접 검색해서 찾을 수 있는 검색 바
  // TODO: Selection -> DB에서 자동차 ID로 저장 + 하나 선택했으면 Search Filter 업데이트하기

  const { carID, setCarID } = props;

  const [inputValue, setInputValue] = useState<string>('');

  const { data: options, isLoading } = useAsyncLiveQuery<CarFH5FullType[]>({
    queryFn: async () => searchCarByName({ query: inputValue }),
    queryKeys: [inputValue],
    defaultIfMissing: [],
    placeHolder: [],
  });

  const carSelected = useLiveQuery<CarFH5FullType | undefined>(async () =>
    !!carID ? getCarFH5FullType(carID) : undefined,
  );

  return (
    <FlexBox sx={{ width: '100%', paddingY: 1, paddingX: 1, justifyContent: 'center' }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', paddingX: 1 }}>
        <SearchOutlinedIcon />
      </FlexBox>
      <Autocomplete
        id="tags-outlined"
        size="small"
        loading={isLoading}
        // options
        options={options || []}
        renderOption={renderOptions}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(option: CarFH5FullType, value: CarFH5FullType | undefined) => {
          return value ? option.id == value.id : false;
        }}
        // group
        groupBy={(car: CarFH5FullType) => car.baseCar.manufacturer.id!!}
        renderGroup={renderGroup}
        // value + onChange
        defaultValue={null}
        value={carSelected}
        onChange={(event: any, newValue: CarFH5FullType | null) => {
          if (newValue == null) {
            setCarID(undefined);
          }
          if (newValue?.id) {
            setCarID(newValue.id);
          }
        }}
        // inputValue + onInputChange
        inputValue={inputValue}
        onInputChange={(event, newInputValue, reason) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} placeholder={'Search car'} sx={{}} />}
        sx={{ width: '100%', overscrollBehavior: 'contain' }}
      />
    </FlexBox>
  );
}
