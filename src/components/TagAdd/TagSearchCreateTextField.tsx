import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Box, Button, Checkbox, Chip, List, MenuItem, Paper, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// import  type {FilterOptionsState} from '@mui/material/Autocomplete/';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';

import type { TagItemPopulated, TagName } from '@/FormData/tag/search/types';
import { SearchTag } from '@/api/search/tag';
import { FlexBox, Image } from '@/components/styled';

function displayLang(tagItemOption: TagItemPopulated): string {
  //  const langs =  Object.keys(tagItemOption.name)
  type NameKey = 'ko' | 'en' | 'jp' | 'unknown';
  const displayOrder: NameKey[] = ['ko', 'en', 'jp', 'unknown'];
  for (const lang of displayOrder) {
    const _name = tagItemOption.name[lang];
    if (_name) return _name;
  }
  return tagItemOption.name.unknown!;
}
function OptionCategory() {}

interface AutoCompleteOptionIntf {
  option: TagItemPopulated;
  liProps: React.HTMLAttributes<HTMLLIElement>;
}

function AutoCompleteOption({ option, liProps }: AutoCompleteOptionIntf) {
  // TODO: merged 된 경우 바뀐 선택지로
  // TODO: parent 있는 경우 상위 태그 tag1 > tag .. 이렇게 표시하기
  // TODO: Category 있는 경우 상위 태그 [cat1] tag1 > tag .. 이렇게 표시하기

  const displayName = option.inputValue || displayLang(option);
  const hasCategory = option.category && displayLang(option.category);
  const hasParent = option.parent && displayLang(option.parent);
  const isMerged = option.merged_to && displayLang(option.merged_to);

  return (
    <li key={`auto-complete-option-${option.id}`} {...liProps}>
      <FlexBox
        sx={{
          width: '100%',
          paddingLeft: 1,
          paddingY: 0.5,
          height: 40,
          columnGap: 2,
        }}
      >
        {option.image_url && (
          <Image src={option.image_url} sx={{ objectFit: 'contain', width: 'auto' }} />
        )}
        <FlexBox sx={{ alignItems: 'center', columnGap: 2 }}>
          {hasCategory && <Typography>{hasCategory}</Typography>}
          {hasParent && <Typography>{hasParent}</Typography>}
          <FlexBox>
            <Typography sx={{ color: !!isMerged ? 'rgba(0,0,0,0.5)' : undefined }}>
              {displayName}
            </Typography>
            {isMerged && <Typography> {`> ${isMerged}`}</Typography>}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </li>
  );
}

function AsyncTagSearchSelect({
  addCompletedTag,
  completedTags,
}: {
  addCompletedTag: (tag: TagItemPopulated) => void;
  completedTags: TagItemPopulated[];
}) {
  // options -> 여기서 useQuery로 가져오기
  // const filterOptions = createFilterOptions<TagItemPopulated>({});
  const [tagOptions, setTagOptions] = useState<TagItemPopulated[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const searchParams = useDebounce(inputValue, 600);
  const { data: tagList, isLoading } = useQuery({
    queryKey: ['search_tag', searchParams],
    queryFn: SearchTag,
    placeholderData: [],
    enabled: !!inputValue && inputValue.length > 2,
  });

  const onChangeAutoComplete = (
    event: React.SyntheticEvent,
    newValue: TagItemPopulated | string | null,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (newValue === null) {
      setInputValue('');
      return;
    }
    if (typeof newValue === 'string') {
      // 메뉴에서 선택한게 아니고, 바로 엔터 칠 경우
      // 원래 있던 옵션 + 새로 만들어졌을 가능성 둘 다 있는 거임
      const tg = tagList!.filter(({ name }) => matchesName(name, newValue))[0];
      if (tg) {
        // 원래 있던 옵션 엔터쳐서 바로 등록할 경우
        addCompletedTag(tg);
        return;
      }
      // 새로 만든 옵션 바로 Enter한 경우
      // -> 동적으로 생성하고 append하기
      else {
        const tgg = {
          name: {
            unknown: newValue,
          },
          id: newValue,
          inputValue: `add ${newValue}`,
        };
        addCompletedTag(tgg);
      }
    }
    // else if (newValue && newValue.inputValue) {
    //   // 새로운 태그 동적으로 추가하면서 메뉴에서 선택할 경우
    //   console.log(`openNewTagModal fixme!!`)
    //   // openNewTagModal(newValue.inputValue);
    // }
    else {
      // 기존에 있는 옵션 선택할 경우

      addCompletedTag(newValue);
    }

    setInputValue('');
  };
  const matchesName = (names: TagName, value: string): boolean => {
    const match = Object.values(names).map((name) => name == value);
    return match.some((val) => !!val);
  };
  // console.log(`tagList : ${JSON.stringify(tagList)}`);

  // TODO: FIXME: tag 정보 바뀜에 따라서 filter하고 display하는 방법 바뀜

  const getOptionLabel = (option: string | TagItemPopulated) => {
    // Value selected with enter, right from the input
    if (typeof option === 'string') {
      return option;
    }
    // Add "xxx" option created dynamically
    if (option.inputValue) {
      return option.inputValue;
    }
    return displayLang(option);
  };

  const filterOptions = (options: TagItemPopulated[], params: { inputValue: string }) => {
    // const filtered = filterOptions(options, params);
    const { inputValue } = params;
    // 보기 옵션에서 새로 추가하는 옵션 동적으로 만드는 경우
    const isTagExisting = options.some((option) => matchesName(option.name, inputValue));
    if (inputValue !== '' && !isTagExisting) {
      options.push({
        name: {
          unknown: inputValue,
        },
        id: inputValue,
        inputValue: `add ${inputValue}`,
      });
    }
    const completedTagIDs = completedTags.map(({ id }) => id);
    const filteredOptions = options.filter(({ id, merged_to }) => {
      if (merged_to) {
        console.log(`merged_to : ${merged_to.id}, ${JSON.stringify(merged_to.name)}`);
      }
      const alreadyExists = !!merged_to
        ? completedTagIDs.includes(id) || completedTagIDs.includes(merged_to.id)
        : completedTagIDs.includes(id);
      return !alreadyExists;
    });
    return filteredOptions;
  };

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
      filterOptions={filterOptions}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="Search for tag"
      getOptionLabel={getOptionLabel}
      renderOption={(props, option) => (
        <AutoCompleteOption
          option={option}
          liProps={props}
          key={`auto-complete-option-${option.id}`}
        />
      )}
      sx={{}}
      fullWidth
      freeSolo
    />
  );
}

interface TagSearchCreateTextFieldIntf {
  addTag: (tag: TagItemPopulated) => void;
  tagsAdded: TagItemPopulated[];
}

export default function TagSearchCreateTextFeild(props: TagSearchCreateTextFieldIntf) {
  const { addTag, tagsAdded } = props;

  // TODO: 여기서 새로운 태그 추가될 경우(id 없는), 그대로 보내서 category는 general로 백엔드가 새로 만들기
  // comment create -> 바로 만들고 나중에 태그 관리하는 페이지에서 wiki page에 편집할 수 있게 만들기
  const addCompletedTag = (tag: TagItemPopulated) => {
    console.log(`add completed tag : ${JSON.stringify(tag)}`);
    // 이미 존재하는 태그 추가하는 경우
    addTag(tag);
  };

  console.log(`tagsAdded : ${JSON.stringify(tagsAdded)}`);

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
      <AsyncTagSearchSelect addCompletedTag={addCompletedTag} completedTags={tagsAdded} />
    </Paper>
  );
}
