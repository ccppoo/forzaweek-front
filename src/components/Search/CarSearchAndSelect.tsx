import { useState } from 'react';

import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

import * as image from '@/image';
import { getCars } from '@/api/car';
import { FlexBox } from '@/components/styled';
import {
  BOOST,
  COUNTRY,
  DIVISIONS,
  MANUFACTURER,
  PRODUCTION_YEAR,
  PRODUCTION_YEARs,
  RARITY,
} from '@/data/values';

import AutocompleteTextField from './AutoCompleteTextField';
import AutocompleteCarSearchBar from './AutocompleteCarSearchBar';
import FinalSelect from './FinalSelect';
import CarSearchRecent from './Recent';

interface CarSearchAndSelectInterface {
  scope: string;
  doFinalSelect?: boolean;
}

export default function CarSearchAndSelect(props: CarSearchAndSelectInterface) {
  const { scope, doFinalSelect } = props;
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
    <FlexBox sx={{ flexDirection: 'column', width: '100%' }}>
      {/* 최근 검색 */}
      <CarSearchRecent />
      {/* 검색 창 */}
      <FlexBox sx={{}}>
        <AutocompleteCarSearchBar searchScope={scope} />
      </FlexBox>
      {/* 차 선택 */}
      <FlexBox
        sx={{
          border: '1px black solid',
          borderRadius: 1,
          height: 320,
        }}
      >
        {/* 필터 조건 */}
        <FlexBox
          sx={{
            display: 'flex',
            width: doFinalSelect ? '60%' : '100%',
            flexDirection: 'column',
            rowGap: 1,
            paddingTop: 1,
            paddingLeft: 1,
            paddingRight: doFinalSelect ? 0 : 1,
          }}
        >
          <AutocompleteTextField
            searchScope={scope}
            optionName="country"
            values={COUNTRY}
            groupOptions
          />
          <AutocompleteTextField
            searchScope={scope}
            optionName="manufacturer"
            values={MANUFACTURER}
            groupOptions
            limitTags={3}
          />
          <AutocompleteTextField
            searchScope={scope}
            optionName="division"
            values={DIVISIONS}
            groupOptions
            limitTags={4}
          />
          <AutocompleteTextField
            searchScope={scope}
            optionName="productionYear"
            values={PRODUCTION_YEARs}
            limitTags={4}
          />
          <AutocompleteTextField
            searchScope={scope}
            optionName="rarity"
            values={RARITY}
            limitTags={4}
          />
          <AutocompleteTextField
            searchScope={scope}
            optionName="boost"
            values={BOOST}
            limitTags={3}
          />
        </FlexBox>
        {/* 차 최종 선택 */}
        {doFinalSelect && <FinalSelect searchScope={scope} />}
      </FlexBox>
    </FlexBox>
  );
}
