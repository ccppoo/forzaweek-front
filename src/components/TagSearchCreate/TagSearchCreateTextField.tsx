import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Button, Checkbox, Chip, List, MenuItem, Paper, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

import type { TagType } from '@/FormData/tag';
import { tagEditSchemaDefault } from '@/FormData/tag/tag';
import type { TagEditSchema } from '@/FormData/tag/types';
import { SearchTag } from '@/api/search/tag';
import { FlexBox, Image } from '@/components/styled';
import { tagKindGeneralID } from '@/config/api';

// import TagCreateDialog from './TagCreateDialog';
// import TagInstantCreateFormProvider from './TagInstantCreateForm';

function AsyncTagSearchSelect({
  openNewTagModal,
  addCompletedTag,
}: {
  openNewTagModal: (newTagName: string) => void;
  addCompletedTag: (tag: TagType.TagSchemaTypeExtended) => void;
}) {
  // options -> 여기서 useQuery로 가져오기
  const filterOptions = createFilterOptions<TagType.TagSchemaTypeExtended>({});
  const [tagOptions, setTagOptions] = useState<TagType.TagSchemaTypeExtended[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const searchParams = useDebounce(inputValue, 600);
  const { data: tagList, isLoading } = useQuery({
    queryKey: ['search_tag', searchParams],
    queryFn: SearchTag,
    placeholderData: [],
    enabled: !!inputValue,
  });

  const onChangeAutoComplete = (
    event: React.SyntheticEvent,
    newValue: TagType.TagSchemaTypeExtended | string | null,
  ) => {
    if (newValue === null) {
      setInputValue('');
      return;
    }
    if (typeof newValue === 'string') {
      // 메뉴에서 선택한게 아니고, 바로 엔터 칠 경우
      // 원래 있던 옵션 + 새로 만들어졌을 가능성 둘 다 있는 거임
      const tg = tagList!.filter(({ name_en }) => name_en == newValue)[0];
      if (tg) {
        // 원래 있던 옵션 엔터쳐서 바로 등록할 경우
        addCompletedTag(tg);
        return;
      }
      // 새로 만든 옵션 바로 Enter한 경우
      // -> 동적으로 생성하고 append하기
      else {
        openNewTagModal(newValue);
      }
    } else if (newValue && newValue.inputValue) {
      // 새로운 태그 동적으로 추가하면서 메뉴에서 선택할 경우
      openNewTagModal(newValue.inputValue);
    } else {
      // 기존에 있는 옵션 선택할 경우

      addCompletedTag(newValue);
    }

    setInputValue('');
  };

  // console.log(`tagList : ${JSON.stringify(tagList)}`);

  return (
    <Autocomplete
      options={tagList!}
      loading={isLoading}
      onChange={onChangeAutoComplete}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => <TextField {...params} size="small" label="Search for tag" />}
      value={value}
      filterOptions={(options, params) => {
        // const filtered = filterOptions(options, params);
        const { inputValue } = params;
        // 보기 옵션에서 새로 추가하는 옵션 동적으로 만드는 경우
        const isExisting = options.some((option) => inputValue === option.name_en);
        if (inputValue !== '' && !isExisting) {
          options.push({
            inputValue,
            name_en: `Add "${inputValue}"`,
            name: [],
            kind: tagKindGeneralID,
            description: [],
          });
        }
        return options;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="Search for tag"
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name_en;
      }}
      renderOption={(props, option) => (
        <li key={`auto-complete-option-${option.id}`} {...props}>
          <FlexBox
            sx={{
              width: '100%',
              paddingLeft: 1,
              paddingY: 0.5,
              height: 40,
              columnGap: 2,
            }}
          >
            {option.imageURL && (
              <Image src={option.imageURL} sx={{ objectFit: 'contain', width: 'auto' }} />
            )}

            <FlexBox sx={{ alignItems: 'center' }}>
              <Typography>{option.name_en}</Typography>
            </FlexBox>
          </FlexBox>
        </li>
      )}
      sx={{}}
      fullWidth
      freeSolo
    />
  );
}

export default function TagSearchCreateTextFeild() {
  //  이 FormContext는 등록한 태그 전부 있는 formContext
  const { control, watch } = useFormContext();

  const { append, fields } = useFieldArray({ control, name: 'tags' });

  // TODO: 여기서 새로운 태그 추가될 경우(id 없는), 그대로 보내서 category는 general로 백엔드가 새로 만들기
  // comment create -> 바로 만들고 나중에 태그 관리하는 페이지에서 wiki page에 편집할 수 있게 만들기
  const addCompletedTag = (tag: TagType.TagSchemaTypeExtended) => {
    append(tag.id);
  };

  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [tempNewTagName, setTempNewTagName] = useState<string>('');
  const [newTagModalOpened, setNewTagModalOpened] = useState<boolean>(false);
  const openNewTagModal = (newTagName: string) => {
    console.log(newTagName);
    // setTempNewTagName(newTagName);
    // setNewTagModalOpened(true);
  };

  // const selectedTags: string[] = watch('tags').map((tag: TagType.TagWrite) => tag.name_en);
  // console.log(`selectedTags :${selectedTags.map((tag) => tag.name_en)}`);
  // 태그를 TextField에서는 직접 거르지 않고 입력만 해서 외부에서 필터링 해야함

  const createNewTag = (value: string, kind: string = 'general') => {
    const newTag = {
      name: {
        value: value,
        lang: 'en',
      },
      name_en: value,
      description: [],
      kind: kind,
    };
    return newTag;
  };

  // 새 태그 등록하고 서버에 보낸 뒤 ID 받아와서 태그 목록에 등록함
  const registerNewTag = (newTag: string | undefined) => {
    setNewTagModalOpened(false);
    // tag form 받기
    // 서버로 보내기
    // 서버에서 ID 받고, 글 작성중인 태그 목록에 추가하기
    return;
  };
  // if (tagList) {
  //   const TAG_OPTIONS = tagList.filter(
  //     ({ name_en }) => !selectedTags.includes(name_en),
  //   ) as TagType.TagSchemaTypeExtended[];

  return (
    <Paper
      sx={{
        height: 60,
        width: '100%',
        padding: 1,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <FlexBox sx={{ paddingLeft: 1, paddingRight: 2 }}>
        <SearchOutlinedIcon />
      </FlexBox>
      {/* 밑은 태그 검색/추가 하는 component, 얘네들은 태그ID만 보내주면 됨 */}
      <AsyncTagSearchSelect addCompletedTag={addCompletedTag} openNewTagModal={openNewTagModal} />
      {/* 태그 새로 추가할 경우 form으로 보낼 때  */}
      {/* <TagCreateDialog
        newTagInitName={tempNewTagName}
        opened={newTagModalOpened}
        onClose={registerNewTag}
      /> */}
    </Paper>
  );
}
// }
