import {
  HTMLAttributes,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import type {
  AutocompleteOwnerState,
  AutocompleteRenderGroupParams,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { darken, lighten, styled } from '@mui/system';

import { useLiveQuery } from 'dexie-react-hooks';

import { FlexBox } from '@/components/styled';
import { getCarFH5, getCarFH5FullType, searchCarByName } from '@/db/query/fh5/car';
import { getManufacturerById } from '@/db/query/real/manufacturer';
import useAsyncLiveQuery from '@/db/useAsyncLiveQuery';
import { CarFH5FullInput, CarFH5FullType } from '@/schema/fh5/types';
import {
  ManufacturerFullInput,
  ManufacturerFullType,
  ManufacturerInput,
  ManufacturerType,
} from '@/schema/real/types';
import useCarAndTagFilter from '@/store/carAndTagFilter';
import type { CarInfoSimple } from '@/types/car';

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

export default function AutocompleteCarSearchBar({ searchScope }: { searchScope: string }) {
  // 직접 검색해서 찾을 수 있는 검색 바
  // TODO: Selection -> DB에서 자동차 ID로 저장 + 하나 선택했으면 Search Filter 업데이트하기

  const {
    filter: { car: selectedCarID },
    actions: {
      car: { setCar, removeCar },
    },
  } = useCarAndTagFilter(searchScope);
  // const [selection, setSelection] = useState<CarInfoSimple | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>('');
  const submitToCarTagFilter = async (carID: string) => {
    setCar(carID);
  };
  const { data: options2, isLoading } = useAsyncLiveQuery<CarFH5FullType[]>({
    // queryFn: async () => searchCar({ query: inputValue }),
    queryFn: async () => searchCarByName({ query: inputValue }),
    queryKeys: [inputValue],
    defaultIfMissing: [],
    // enabled: inputValue.length > 0,
    placeHolder: [],
  });
  const carSelected = useLiveQuery<CarFH5FullType | undefined>(async () =>
    !!selectedCarID ? getCarFH5FullType(selectedCarID) : undefined,
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

  // const filterOptions = (options: CarInfoSimple[], params: { inputValue: string }) => {
  //   // const filtered = filterOptions(options, params);
  //   const { inputValue } = params;
  //   // 보기 옵션에서 새로 추가하는 옵션 동적으로 만드는 경우
  //   const isTagExisting = options.some((option) => matchesName(option.name, inputValue));
  //   if (inputValue !== '' && !isTagExisting) {
  //     options.push({
  //       name: {
  //         unknown: inputValue,
  //       },
  //       id: inputValue,
  //       inputValue: `add ${inputValue}`,
  //     });
  //   }
  //   const completedTagIDs = tagIDs.map((id) => id);
  //   const filteredOptions = options.filter(({ id, merged_to }) => {
  //     if (merged_to) {
  //       console.log(`merged_to : ${merged_to.id}, ${JSON.stringify(merged_to.name)}`);
  //     }
  //     const alreadyExists = !!merged_to
  //       ? completedTagIDs.includes(id) || completedTagIDs.includes(merged_to.id)
  //       : completedTagIDs.includes(id);
  //     return !alreadyExists;
  //   });
  //   return filteredOptions;
  // };

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
        key={key}
        sx={{
          borderRadius: '8px',
          margin: '5px',
        }}
        component="li"
        {...optionProps}
      >
        {getOptionLabel(option)}
      </Box>
    );
  };

  return (
    <FlexBox sx={{ width: '100%', paddingY: 1, justifyContent: 'center' }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', paddingX: 1 }}>
        <SearchOutlinedIcon />
      </FlexBox>
      <Autocomplete
        id="tags-outlined"
        size="small"
        loading={isLoading}
        options={options2 || []}
        groupBy={(car: CarFH5FullType) => car.baseCar.manufacturer.id!!}
        renderGroup={renderGroup}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(option: CarFH5FullType, value: CarFH5FullType | undefined) => {
          return value ? option.id == value.id : false;
        }}
        defaultValue={null}
        // value + onChange
        value={carSelected}
        onChange={(event: any, newValue: CarFH5FullType | null) => {
          newValue || removeCar();
          // setSelection(newValue || undefined);
          if (newValue?.id) {
            submitToCarTagFilter(newValue.id);
          }
        }}
        // inputValue + onInputChange
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderOption={renderOptions}
        renderInput={(params) => <TextField {...params} placeholder={'Search car'} sx={{}} />}
        sx={{ width: '60%', overscrollBehavior: 'contain' }}
      />
    </FlexBox>
  );
}
