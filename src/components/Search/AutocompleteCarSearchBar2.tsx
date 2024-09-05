import { useState } from 'react';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useLiveQuery } from 'dexie-react-hooks';

import { FlexBox } from '@/components/styled';
import { getAllCarEssential } from '@/db/query2';
import type { CarInfoEssential } from '@/types/car';

/**
 * NOTE: 이 자동완성은 튜닝, 데칼 글 작성할 때 차 선택하는 컴포넌트
 */

interface AutocompleteCarSearchBar2Intf {
  searchScope: string;
  onSelect: (car: CarInfoEssential) => void;
}

export default function AutocompleteCarSearchBar2(props: AutocompleteCarSearchBar2Intf) {
  // 직접 검색해서 찾을 수 있는 검색 바
  // TODO: Selection -> DB에서 자동차 ID로 저장 + 하나 선택했으면 Search Filter 업데이트하기

  const { searchScope, onSelect } = props;

  const options = useLiveQuery(getAllCarEssential) || [];
  const [carValue, setCarValue] = useState<CarInfoEssential | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <FlexBox sx={{ width: '100%', paddingY: 1, paddingX: 3, justifyContent: 'center' }}>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center', paddingX: 1 }}>
        <SearchOutlinedIcon />
      </FlexBox>
      <Autocomplete
        id="tags-outlined"
        size="small"
        options={options}
        filterOptions={(options, state) => {
          const displayOptions = options.filter((option) => {
            const search = state.inputValue.toLowerCase().trim();
            return [
              option.name_en.toLowerCase().trim().includes(search),
              option.manufacturer.name_en.toLowerCase().trim().includes(search),
              option.short_name_en.toLowerCase().trim().includes(search),
            ].some((x) => x);
          });
          return displayOptions;
        }}
        groupBy={(option: CarInfoEssential) => option.manufacturer.name_en}
        getOptionLabel={(option: CarInfoEssential) => option.name_en}
        defaultValue={null}
        autoSelect
        value={carValue}
        onChange={(event, newValue: CarInfoEssential | string | null) => {
          if (newValue === null) {
            // 지우는 경우 무시
            setInputValue('');
            return;
          }
          if (typeof newValue === 'string') {
            // 메뉴에 있는거만 선택 강제
            setInputValue('');
            return;
          }
          // 기존에 있는 옵션 선택할 경우
          onSelect(newValue);
          setInputValue('');
          setCarValue(undefined);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue, reason) => {
          // console.log(`4`);
          setInputValue(newInputValue);
          // console.log(`reason : ${reason}`);
          if (reason == 'reset') {
            setInputValue('');
            setCarValue(undefined);
          }
        }}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} placeholder={'Search car'} sx={{}} />}
        sx={{ width: '100%' }}
      />
    </FlexBox>
  );
}
