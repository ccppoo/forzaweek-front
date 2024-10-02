import { ChangeEvent, HTMLAttributes, useEffect, useState } from 'react';
import { Controller, FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form';
import type { FieldPath, PathValue } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Chip, MenuItem, Paper, Typography } from '@mui/material';
import type {
  AutocompleteRenderGroupParams,
  AutocompleteRenderOptionState,
} from '@mui/material/Autocomplete';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

import { tagItem } from '@/FormData/tag/tag';
import type { TagItem } from '@/FormData/tag/tag';
import { SearchTagCategory, SearchTagCategoryID } from '@/api/search/tag';
import { GetTagCategoryByID } from '@/api/tag/category';
import { TagKindItemCell } from '@/components/Tag';
import { FlexBox, FullSizeCenteredFlexBox, VisuallyHiddenInput } from '@/components/styled';
import { Image } from '@/components/styled';
import type { Tag, TagInput } from '@/schema/tag';
import { tagDefault } from '@/schema/tag';
import type { HasTagCategory } from '@/schema/tag/category';
import { TagCategory } from '@/schema/tag/types';

function displayLang(tagItemOption: TagCategory): string {
  type NameKey = 'ko' | 'en' | 'jp';
  const displayOrder: NameKey[] = ['ko', 'en', 'jp'];
  for (const lang of displayOrder) {
    const _name = tagItemOption.name[lang];
    if (_name) return _name;
  }
  return 'unknown';
}
interface AutoCompleteOptionIntf {
  option: TagCategory;
  liProps: React.HTMLAttributes<HTMLLIElement>;
}

function AutoCompleteOption({ option, liProps }: AutoCompleteOptionIntf) {
  // TODO: merged 된 경우 바뀐 선택지로
  // TODO: parent 있는 경우 상위 태그 tag1 > tag .. 이렇게 표시하기
  // TODO: Category 있는 경우 상위 태그 [cat1] tag1 > tag .. 이렇게 표시하기

  // const { data: tagCategory, isLoading } = useQuery({
  //   queryKey: ['search tag cat', option.id],
  //   queryFn: GetTagCategoryByID,
  //   enabled: !!option,
  // });

  const displayName = option?.name.en;
  // const hasCategory = option.category && displayLang(option.category);
  // const hasParent = option.parent && displayLang(option.parent);
  // const isMerged = option.mergedTo && displayLang(option.merged_to);
  const isMerged = !!option?.mergedTo;

  return (
    <li key={`auto-complete-option-${option?.id}`} {...liProps}>
      <FlexBox
        sx={{
          width: '100%',
          paddingLeft: 1,
          paddingY: 0.5,
          height: 40,
          columnGap: 2,
        }}
      >
        <Image src={option.imageURL} sx={{ objectFit: 'contain', width: 'auto' }} />
        <FlexBox sx={{ alignItems: 'center', columnGap: 2 }}>
          {/* {hasCategory && <Typography>{hasCategory}</Typography>} */}
          {/* {hasParent && <Typography>{hasParent}</Typography>} */}
          <FlexBox>
            <Typography sx={{ color: !!isMerged ? 'rgba(0,0,0,0.5)' : undefined }}>
              {displayName}
            </Typography>
            {/* {isMerged && <Typography> {`> ${isMerged}`}</Typography>} */}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </li>
  );
}

function getOptionLabel(option: TagCategory | string) {
  if (typeof option === 'string') {
    return option;
  }

  // if (!option) return 'General';
  // Value selected with enter, right from the input
  return option.name.en!;
}

function renderOptions(
  props: HTMLAttributes<HTMLLIElement>,
  option: TagCategory,
  state: AutocompleteRenderOptionState,
) {
  const { ...optionProps } = props;
  const { selected } = state;
  const key = option.id;
  // console.log(`renderOptions renderOptions renderOptions `);
  // console.log(`option : ${JSON.stringify(option)}`);
  return <AutoCompleteOption option={option} liProps={props} key={`tag-cat-${option.id}`} />;
}

export function SelectTagCategory<T extends HasTagCategory>({
  generalCat,
}: {
  generalCat: TagCategory;
}) {
  const { register, formState, getValues, setValue } = useFormContext<T>();
  // 자동완성에서 선택된 태그 카테고리

  const formPath = `category` as FieldPath<T>;
  const [categoryValue, setCategoryValue] = useState<TagCategory>(generalCat);

  const [inputValue, setInputValue] = useState<string>('');
  const searchParams = useDebounce(inputValue, 600);

  const { data: tagCategoryList, isLoading } = useQuery({
    queryKey: ['search tag cat', searchParams],
    queryFn: SearchTagCategory,
    placeholderData: [],
    enabled: !!inputValue && inputValue.length > 1,
  });

  const matchesName = (names: TagCategory, value: string): boolean => {
    const match = Object.values(names).map((name) => name == value);
    return match.some((val) => !!val);
  };

  const onChangeAutoComplete = (
    event: React.SyntheticEvent,
    newValue: TagCategory | string | null,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    console.log(`newValue : ${typeof newValue}`);
    if (newValue === null) {
      setInputValue('');
      return;
    }
    if (typeof newValue === 'string') {
      // 메뉴에서 선택한게 아니고, 바로 엔터 칠 경우
      // 원래 있던 옵션 + 새로 만들어졌을 가능성 둘 다 있는 거임
      const tg = tagCategoryList!.filter((tagCat) => matchesName(tagCat, newValue))[0];
      if (tg) {
        // 원래 있던 옵션 엔터쳐서 바로 등록할 경우
        setInputValue(tg.id!);
        return;
      }
    } else {
      // 기존에 있는 옵션 선택할 경우
      setCategoryValue(newValue);
      setValue(formPath, newValue.id! as PathValue<T, FieldPath<T>>);
    }

    setInputValue('');
  };

  return (
    <Autocomplete
      // options
      options={tagCategoryList!}
      loading={isLoading}
      renderInput={(params) => (
        <TextField {...params} size="small" label="Search for tag category" />
      )}
      // filterOptions={filterOptions}
      selectOnFocus
      clearOnBlur
      // value + onChange
      value={categoryValue}
      onChange={onChangeAutoComplete}
      // inputValue + onInputChange
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      handleHomeEndKeys
      id="Search for tag"
      getOptionLabel={getOptionLabel}
      renderOption={renderOptions}
      sx={{}}
      fullWidth
      freeSolo
    />
  );
}
