import { useEffect, useMemo, useState } from 'react';

import { ListItem, ListItemProps } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Chip, { ChipProps } from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useLiveQuery } from 'dexie-react-hooks';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { db } from '@/db';
import { getAllCountry, getCountry } from '@/db/query/real/country';
import { getCountriesByID } from '@/db/query/real/country';
import { getManufacturerById, getManufacturersById } from '@/db/query/real/manufacturer';
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
  const selectedOptions = (options[optionName] as string[]) || [];

  const selectedValues = useMemo(() => selectedOptions, [selectedOptions]);
  const [textInputValue, setTextInputValue] = useState<string>('');

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
          // value + onChange
          value={selectedValues}
          onChange={(event: any, newValue: string[]) => {
            setSearchOption(newValue);
          }}
          // inputValue + onInputChange
          inputValue={textInputValue}
          onInputChange={(event, value) => setTextInputValue(value)}
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

function AutoCompleteCountryTag({ countryID, props }: { countryID: string; props: ChipProps }) {
  const country = useLiveQuery<CountryType | undefined>(async () => await getCountry(countryID));

  return (
    <Chip
      variant="outlined"
      label={country?.name.en}
      {...props}
      // {...getTagProps({ index })}
      size="small"
    />
  );
}

function AutoCompleteCountryOption({
  countryID,
  background,
  liProps,
}: {
  countryID: string;
  background: string | undefined;
  liProps: ListItemProps;
}) {
  const country = useLiveQuery<CountryType | undefined>(async () => await getCountry(countryID));
  if (!country) return;

  return (
    <ListItem {...liProps}>
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
        <Image src={country?.imageURL} sx={{ objectFit: 'contain' }} />
        <FlexBox sx={{ alignItems: 'center', paddingLeft: 2 }}>
          <Typography>{country?.name.en}</Typography>
        </FlexBox>
      </Box>
    </ListItem>
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
  values: string[];
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
  const setSearchOption = (countries: string[]) => setNationOption(countries);
  const selectedOptions = options[optionName] || [];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const [textInputValue, setTextInputValue] = useState<string>('');
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
          // getOptionLabel={(nation) => nation.name.en!!}
          filterSelectedOptions
          // value + onChange
          value={selectedOptions}
          onChange={(event: any, newValue: string[]) => {
            setSearchOption(newValue);
          }}
          renderOption={(props, option, { selected, index }) => {
            const background = index % 2 == 1 ? '#f5f5f5' : undefined;
            const key = `autocompolete-country-${option}`;
            return (
              <AutoCompleteCountryOption
                countryID={option}
                background={background}
                key={key}
                liProps={props}
              />
            );
          }}
          renderTags={(value: readonly string[], getTagProps) => {
            console.log(`value : ${JSON.stringify(value)}`);
            return value.map((countryID: string, index: number) => (
              <AutoCompleteCountryTag
                countryID={countryID}
                props={{ ...getTagProps({ index }) }}
                key={`selected-country-${countryID}`}
              />
            ));
          }}
          // inputValue + onInputChange
          inputValue={textInputValue}
          onInputChange={(event, value) => setTextInputValue(value)}
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

function AutoCompleteManufacturerTag({
  manufacturerID,
  props,
}: {
  manufacturerID: string;
  props: ChipProps;
}) {
  const manufacturer = useLiveQuery<ManufacturerType | undefined>(
    async () => await getManufacturerById(manufacturerID),
  );

  return <Chip variant="outlined" label={manufacturer?.name.en} {...props} size="small" />;
}

function AutoCompleteManufacturerOption({
  manufacturerID,
  background,
  liProps,
}: {
  manufacturerID: string;
  background: string | undefined;
  liProps: ListItemProps;
}) {
  const manufacturer = useLiveQuery<ManufacturerType | undefined>(
    async () => await getManufacturerById(manufacturerID),
  );
  if (!manufacturer) return;

  return (
    <ListItem {...liProps}>
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
        <Image src={manufacturer.imageURL} sx={{ objectFit: 'contain' }} />
        <FlexBox sx={{ alignItems: 'center', paddingLeft: 2 }}>
          <Typography>{manufacturer.name.en!!}</Typography>
        </FlexBox>
      </Box>
    </ListItem>
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
  values: string[];
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
  const selectedOptions = (options[optionName] as string[]) || []; // country ID string[]
  const selectedValues = useLiveQuery<ManufacturerType[]>(
    async () => await getManufacturersById(selectedOptions),
  );

  const setSearchOption = (manus: string[]) => setManufacturerOption(manus);
  const [textInputValue, setTextInputValue] = useState<string>('');

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
          value={selectedOptions}
          onChange={(event: any, newValue: string[]) => {
            setSearchOption(newValue);
          }}
          filterSelectedOptions
          renderOption={(props, option, { selected, index }) => {
            const background = index % 2 == 1 ? '#f5f5f5' : undefined;
            const key = `autocompolete-country-${option}`;
            return (
              <AutoCompleteManufacturerOption
                manufacturerID={option}
                background={background}
                key={key}
                liProps={props}
              />
            );
          }}
          renderTags={(value: readonly string[], getTagProps) => {
            // console.log(`value : ${JSON.stringify(value)}`);
            return value.map((manufacturerID: string, index: number) => (
              <AutoCompleteManufacturerTag
                manufacturerID={manufacturerID}
                props={{ ...getTagProps({ index }) }}
                key={`selected-country-${manufacturerID}`}
              />
            ));
          }}
          // inputValue + onInputChange
          inputValue={textInputValue}
          onInputChange={(event, value) => setTextInputValue(value)}
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
