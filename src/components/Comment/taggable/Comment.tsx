import { useContext, useRef, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import { useQuery } from '@tanstack/react-query';

import type { TaggableCommentType } from '@/FormData/comments/types';
import { getComment } from '@/api/comment';
import {
  CommentBody,
  CommentUserProfile,
  TaggableCommentActions,
} from '@/components/Comment/components';
import { CommentContext } from '@/components/Comment/context';
import { TagItemCell } from '@/components/Tag';
import { FlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

interface CommentIntf {
  commentID: string;
}

function CommentTags({ tagIDs }: { tagIDs: string[] }) {
  return (
    <FlexBox>
      {tagIDs.map((tagID) => (
        <TagItemCell tagID={tagID} key={`comment-tag-${tagID}`} textOnly />
      ))}
    </FlexBox>
  );
}

export default function TaggableComment(props: CommentIntf) {
  const { commentReadOptions } = useContext(CommentContext);
  const [auth] = useAuthState();

  const { commentID } = props;
  const SUBJECT_ID = commentReadOptions.subject_id!;

  const [open, setOpen] = useState<boolean>(false);
  const [commentFolded, setSubCommentFolded] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement>(null);
  const toggleSubComment = () => {
    setOpen((prev) => !prev);
  };

  const { data } = useQuery({
    queryKey: ['get comment', auth.id_token, SUBJECT_ID, commentID],
    queryFn: getComment<TaggableCommentType>,
  });

  const toggleCommentDisplay = () => setSubCommentFolded((val) => !val);

  if (data) {
    const comment = data.value;
    const creator = data.creator;
    const comment_created = data.created_at;
    const tags = data.tags;

    return (
      <FlexBox sx={{ flexDirection: 'column' }}>
        {/* 아바타 + 이름 */}
        <CommentUserProfile
          toggleCommentDisplay={toggleCommentDisplay}
          user_id={creator}
          comment_created={comment_created}
        />
        <Collapse in={!commentFolded} unmountOnExit>
          <FlexBox sx={{ paddingLeft: '36px', flexDirection: 'column' }}>
            <CommentBody value={comment} />
            <CommentTags tagIDs={tags} />
            <TaggableCommentActions />
          </FlexBox>
        </Collapse>
      </FlexBox>
    );
  }
}
