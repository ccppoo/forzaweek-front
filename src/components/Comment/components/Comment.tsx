import { useContext, useRef, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import { useQuery } from '@tanstack/react-query';

import type { TaggableCommentType } from '@/FormData/comments/types';
import { getComment } from '@/api/comment';
import {
  // CommentBody,
  // CommentUserProfile,
  TaggableCommentActions,
} from '@/components/Comment/components';
import { FlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

import { CommentContext } from '../context';
import { CommentActions } from './CommentAction';
import CommentBody from './CommentBody';
import CommentUserProfile from './CommentUserProfile';

// import SubComments from './SubComments';

interface CommentIntf {
  commentID: string;
  isSubcomment?: boolean;
}

export default function Comment(props: CommentIntf) {
  const { commentReadOptions } = useContext(CommentContext);

  const { commentID, isSubcomment } = props;

  // commentReadOptions.subject_id -> 이 댓글이 속한 Comments ID
  // useQuery :: get Comment by ID, page + limit + order
  const [auth] = useAuthState();
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

  const name = 'someone';
  const time = '2024-05-29';
  const comment_score = 23;
  const comment_replies = 3;
  const comment =
    "Well you're approaching the activity backwards. Your looking at it as jumping from spot to spot over the water and adding a bike. This guy is taking a bike and adding the acrobatics.";

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
            <TaggableCommentActions />
            {/* <CommentActions commentReplies={comment_replies} openSubComments={toggleSubComment} /> */}
            {/* <SubComments isOpen={open} /> */}
          </FlexBox>
        </Collapse>
      </FlexBox>
    );
  }
}
