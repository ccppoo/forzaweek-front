import { useContext, useRef, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import { useQuery } from '@tanstack/react-query';

import type { VotableMainCommentType } from '@/FormData/comments/types';
import { getComment } from '@/api/comment';
import {
  CommentBody,
  CommentUserProfile,
  VotableCommentActions,
  VotableSubComments,
} from '@/components/Comment/components';
import { CommentContext } from '@/components/Comment/context';
import { FlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

interface CommentIntf {
  commentID: string;
}

export default function VotableComment(props: CommentIntf) {
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

  // commentReadOptions.subject_id -> 이 댓글이 속한 Comments ID
  // useQuery :: get Comment by ID, page + limit + order
  const { data } = useQuery({
    queryKey: ['get comment', auth.id_token, SUBJECT_ID, commentID],
    queryFn: getComment<VotableMainCommentType>,
  });

  const toggleCommentDisplay = () => setSubCommentFolded((val) => !val);

  if (data) {
    const comment = data.value;
    const comment_replies = data.subComments.length;
    const up_votes = data.up_votes;
    const down_votes = data.down_votes;
    const subcomments = data.subComments;
    const creator = data.creator;
    const comment_created = data.created_at;

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
            <VotableCommentActions
              commentReplies={comment_replies}
              openSubComments={toggleSubComment}
              upVotes={up_votes}
              downVotes={down_votes}
            />
            <VotableSubComments isOpen={open} commentID={commentID} subCommentIDs={subcomments} />
          </FlexBox>
        </Collapse>
      </FlexBox>
    );
  }
}
