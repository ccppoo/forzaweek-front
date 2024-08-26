import { useRef, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { FieldArrayPath } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';

import type { TaggingItemForm, TaggingItemFormReadonly } from '@/FormData/tag/tagging';
import { taggingItemFormDefault } from '@/FormData/tag/tagging';
import { getPersonalTagging, voteTagOfSubject } from '@/api/tag/tagging/vote';
import { FlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';
import useUserProfile from '@/store/user';

import SearchAndCreateTag from '../TagAdd/SearchAndCreateTag';
import TagCommentFormProvider from '../TagAdd/components/TagAddFormProvider';

interface TaggingIntf {
  topic: string;
  subjectID: string;
}

function TaggingAction() {
  const { control, formState, getFieldState } = useFormContext<TaggingItemForm>();

  const formPath = 'tags' as FieldArrayPath<TaggingItemForm>;
  const { fields: tags } = useFieldArray({
    control,
    name: formPath,
  });
  formState.dirtyFields.tags; // 이게 있어야 값 읽어오면서 같이 re-render되는 듯?
  const { isDirty: taggingChanged } = getFieldState('tags');
  const taggedBefore = tags.length > 0;
  // console.log(`isDirty : ${taggingChanged}`);
  // console.log(`tags : ${JSON.stringify(tags)}`);

  return (
    <FlexBox sx={{ justifyContent: 'end', paddingY: 1 }}>
      <FlexBox sx={{ columnGap: 1 }}>
        {/* <Button color="warning" variant="outlined" size="small" sx={{ borderRadius: 2 }}>
          cancel
        </Button> */}
        <Button
          color="success"
          variant="contained"
          size="small"
          sx={{ borderRadius: 2 }}
          type="submit"
          disabled={!taggingChanged}
        >
          {taggedBefore ? 'update tags' : 'add tag'}
        </Button>
      </FlexBox>
    </FlexBox>
  );
}

export default function Tagging(props: TaggingIntf) {
  const { topic, subjectID } = props;
  const selectScope = 'tagging-to-post-decal';
  const [auth] = useAuthState();

  // 사용자가 이전에 달았던 태그 수정하는 경우
  const { data } = useQuery({
    queryKey: ['tagging', topic, subjectID, auth.id_token!],
    queryFn: getPersonalTagging,
    enabled: !!auth.id_token,
  });

  if (!auth.id_token) {
    // 로그인 안되었을 경우 창 보이지 않음
    return;
  }

  if (auth.id_token && data) {
    let data_ = { ...taggingItemFormDefault, ...data };
    // console.log(`personal tagging : ${JSON.stringify(data_)}`);
    return (
      <FlexBox sx={{ flexDirection: 'column', paddingTop: 3 }}>
        <FlexBox sx={{ paddingBottom: 1 }}>
          <Typography variant="subtitle1">Propose tags that could describe</Typography>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <TagCommentFormProvider
            data={data_}
            id_token={auth.id_token}
            topic={topic}
            subjectID={subjectID}
          >
            {/* 태그 달 수 있는 fold */}
            <SearchAndCreateTag postType="decal" selectScope={selectScope} />
            {/* 태깅 업데이트, 등록 버튼 */}
            <TaggingAction />
          </TagCommentFormProvider>
        </FlexBox>
      </FlexBox>
    );
  }
}
