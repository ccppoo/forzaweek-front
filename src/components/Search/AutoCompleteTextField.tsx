import { useEffect, useMemo, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useLiveQuery } from 'dexie-react-hooks';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { db } from '@/db';
import { getAllCountry } from '@/db/query/real/country';
import { getCountriesByID } from '@/db/query/real/country';
import { getManufacturersById } from '@/db/query/real/manufacturer';
// import { Manufacturer, Nation, Track } from '@/db/schema';
import { CountryInput, CountryType } from '@/schema/real/types';
import { ManufacturerFullInput, ManufacturerFullType, ManufacturerType } from '@/schema/real/types';
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
  const selectedOptions = options[optionName] as string[];

  const selectedValues = useMemo(() => selectedOptions, [selectedOptions]);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

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
          defaultValue={[...selectedOptions]}
          filterSelectedOptions
          onChange={(event: any, newValue: string[]) => {
            setSearchOption(newValue);
          }}
          value={selectedValues}
          renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip variant="outlined" label={option} {...getTagProps({ index })} size="small" />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={selectedOptions.length == 0 ? optionName : undefined}
              sx={{}}
            />
          )}
          sx={{ width: '100%', overscrollBehavior: 'contain' }}
        />
      </FlexBox>
    </FlexBox>
  );
}

export function AutocompleteNationTextField({
  searchScope,
  optionName,
  values,
  groupOptions,
  limitTags,
}: {
  searchScope: string;
  optionName: CarSearchOption;
  values: CountryType[];
  groupOptions?: boolean;
  limitTags?: number;
}) {
  const [
    options,
    _,
    __,
    {
      setOptions: { setNationOption },
    },
  ] = useCarSearchFilters(searchScope);
  // 쿼리할 때 필터링할 수 있는 값으로 ID 넘김 (document ID)
  const setSearchOption = (nations: CountryType[]) =>
    setNationOption(
      nations
        .toSorted((n1, n2) => (n1.name.en!! > n2.name.en!! ? 1 : -1))
        .map((country) => country.id!!),
    );
  // const selectedOptions = useMemo(() => getCountriesByID(options[optionName]), [options[optionName]]);
  const selectedOptions = options[optionName];

  // options[optionName] as string[];
  // useLiveQuery

  // const selectedValues = useMemo(() => getCountriesByID(selectedOptions), [selectedOptions]);
  const selectedValues = useLiveQuery<CountryType[]>(async () => getCountriesByID(selectedOptions));
  // const countryOptions = useLiveQuery(getAllCountry);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  // console.log(`selectedOptions : ${JSON.stringify(selectedOptions)}`);

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
          groupBy={undefined}
          getOptionLabel={(nation) => nation.name.en!!}
          filterSelectedOptions
          onChange={(event: any, newValue: CountryType[]) => {
            setSearchOption(newValue);
          }}
          // defaultValue={[...selectedOptions]}
          value={selectedValues}
          renderOption={(props, option, { selected, index }) => {
            const { ...optionProps } = props;

            const background = index % 2 == 1 ? '#f5f5f5' : undefined;
            return (
              <li key={`auto-complete-option-${option.id}`} {...optionProps}>
                <Box
                  sx={{
                    display: 'grid',
                    width: '100%',
                    paddingLeft: 1,
                    paddingY: 0.5,
                    gridTemplateColumns: '60px auto',
                    gridTemplateRows: '40px',
                    backgroundColor: background,
                  }}
                >
                  <Image src={option.imageURL} sx={{ objectFit: 'contain' }} />
                  <FlexBox sx={{ alignItems: 'center', paddingLeft: 2 }}>
                    <Typography>{option.name.en}</Typography>
                  </FlexBox>
                </Box>
              </li>
            );
          }}
          renderTags={(value: readonly CountryType[], getTagProps) => {
            console.log(`value : ${JSON.stringify(value)}`);

            return value.map((country: CountryType, index: number) => (
              <Chip
                variant="outlined"
                label={country.name.en}
                {...getTagProps({ index })}
                size="small"
              />
            ));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={selectedOptions.length == 0 ? optionName : undefined}
              sx={{}}
            />
          )}
          sx={{ width: '100%', overscrollBehavior: 'contain' }}
        />
      </FlexBox>
    </FlexBox>
  );
}

export function AutocompleteManufacturerTextField({
  searchScope,
  optionName,
  values,
  groupOptions,
  limitTags,
}: {
  searchScope: string;
  optionName: CarSearchOption;
  values: ManufacturerType[];
  groupOptions?: boolean;
  limitTags?: number;
}) {
  const [
    options,
    _,
    __,
    {
      setOptions: { setManufacturerOption },
    },
  ] = useCarSearchFilters(searchScope);
  const selectedOptions = options[optionName] as string[]; // country ID string[]
  // const selectedValues = useMemo(() => selectedOptions, [selectedOptions]);
  const selectedValues = useLiveQuery<ManufacturerType[]>(async () =>
    getManufacturersById(selectedOptions),
  );

  const setSearchOption = (manus: ManufacturerType[]) =>
    setManufacturerOption(
      manus.toSorted((n1, n2) => (n1.name.en!! > n2.name.en!! ? 1 : -1)).map((man) => man.id!!),
    );

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

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
          // groupBy={groupOptions ? (option) => option[0] : undefined}
          getOptionLabel={(option) => option.name.en!!}
          // defaultValue={[...selectedOptions]}
          filterSelectedOptions
          onChange={(event: any, newValue: ManufacturerType[]) => {
            setSearchOption(newValue);
          }}
          isOptionEqualToValue={(option, value) => option.id == value.id}
          value={selectedValues}
          renderOption={(props, option, { selected, index }) => {
            const { ...optionProps } = props;

            const background = index % 2 == 1 ? '#f5f5f5' : undefined;
            return (
              <li key={`auto-complete-option-${option.id}`} {...optionProps}>
                <Box
                  sx={{
                    display: 'grid',
                    width: '100%',
                    paddingLeft: 1,
                    paddingY: 0.5,
                    gridTemplateColumns: '60px auto',
                    gridTemplateRows: '40px',
                    backgroundColor: background,
                  }}
                >
                  <Image src={option.imageURL} sx={{ objectFit: 'contain' }} />
                  <FlexBox sx={{ alignItems: 'center', paddingLeft: 2 }}>
                    <Typography>{option.name.en!!}</Typography>
                  </FlexBox>
                </Box>
              </li>
            );
          }}
          renderTags={(value: readonly ManufacturerType[], getTagProps) =>
            value.map((option: ManufacturerType, index: number) => (
              <Chip
                variant="outlined"
                label={option.name.en!!}
                {...getTagProps({ index })}
                size="small"
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={selectedOptions.length == 0 ? optionName : undefined}
              sx={{}}
            />
          )}
          sx={{ width: '100%', overscrollBehavior: 'contain' }}
        />
      </FlexBox>
    </FlexBox>
  );
}
