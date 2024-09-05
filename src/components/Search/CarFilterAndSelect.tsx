import { useState } from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import { useLiveQuery } from 'dexie-react-hooks';

// import * as query from '@/db/query2';
import { FlexBox } from '@/components/styled';
import {
  BOOST,
  COUNTRY,
  DIVISIONS,
  PRODUCTION_YEAR,
  PRODUCTION_YEARs,
  RARITY,
} from '@/data/values';
import { getAllCountry } from '@/db/query/real/country';
import { getAllManufacturers } from '@/db/query/real/manufacturer';
import useCarSearchFilters, { CarSearchOption } from '@/store/carSearchFilters';

import AutocompleteTextField, {
  AutocompleteManufacturerTextField,
  AutocompleteNationTextField,
} from './AutoCompleteTextField';
import FinalSelect from './FinalSelect';

interface CarSearchAndSelectInterface {
  scope: string;
  doFinalSelect?: boolean;
}

export default function CarFilterAndSelect(props: CarSearchAndSelectInterface) {
  const { scope, doFinalSelect } = props;
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const [options, _, __, { clearAllOptions }] = useCarSearchFilters(scope);

  const nations = useLiveQuery(getAllCountry);
  const manufacturers = useLiveQuery(getAllManufacturers);

  return (
    <FlexBox sx={{ flexDirection: 'column', width: '100%' }}>
      {/* 차 선택 */}
      <FlexBox
        sx={{
          border: '1px black solid',
          borderRadius: 1,
          height: 340,
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
          <AutocompleteNationTextField
            searchScope={scope}
            optionName="country"
            values={nations || []}
            groupOptions
          />
          <AutocompleteManufacturerTextField
            searchScope={scope}
            optionName="manufacturer"
            values={manufacturers || []}
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
          <FlexBox sx={{ justifyContent: 'end' }}>
            <Button color="warning" variant="outlined" size="small" onClick={clearAllOptions}>
              Clear all filters
            </Button>
          </FlexBox>
        </FlexBox>
        {doFinalSelect && <Divider orientation="vertical" />}
        {/* 차 최종 선택 */}
        {doFinalSelect && <FinalSelect scope={scope} />}
      </FlexBox>
    </FlexBox>
  );
}
