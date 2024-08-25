import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';

import type { TaggingItemForm } from '@/FormData/tag/tagAdd';
import { taggingItemFormDefault } from '@/FormData/tag/tagAdd';
import { getPersonalTagging, voteTagOfSubject } from '@/api/tag/tagging/vote';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';
import useUserProfile from '@/store/user';

import SearchAndCreateTag from '../TagAdd/SearchAndCreateTag';
import TagCommentFormProvider from '../TagAdd/components/TagAddFormProvider';

interface TaggingIntf {
  topic: string;
  subjectID: string;
}

export default function Tagging(props: TaggingIntf) {
  const { topic, subjectID } = props;
  const selectScope = 'taggable-comment-create';
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

    const taggedBefore = !!data.tags.length;

    console.log(`data_ : ${JSON.stringify(data_)}`);
    return (
      <FlexBox sx={{ flexDirection: 'column', paddingTop: 3 }}>
        <FlexBox sx={{ paddingBottom: 1 }}>
          <Typography variant="subtitle1">Propose tags that could describe</Typography>
        </FlexBox>
        <FlexBox sx={{ flexDirection: 'column' }}>
          <TagCommentFormProvider<TaggingItemForm>
            data={data_}
            id_token={auth.id_token}
            topic={topic}
            subjectID={subjectID}
          >
            {/* 태그 달 수 있는 fold */}
            <SearchAndCreateTag<TaggingItemForm> postType="decal" selectScope={selectScope} />
            <FlexBox sx={{ justifyContent: 'end', paddingY: 1 }}>
              <FlexBox sx={{ columnGap: 1 }}>
                <Button color="warning" variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                  cancel
                </Button>
                <Button
                  color="success"
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: 2 }}
                  type="submit"
                >
                  {taggedBefore ? 'update tags' : 'add tag'}
                </Button>
              </FlexBox>
            </FlexBox>
          </TagCommentFormProvider>
        </FlexBox>
      </FlexBox>
    );
  }
}
