import { useContext, useRef, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import { useQuery } from '@tanstack/react-query';

import type { VotableMainCommentType } from '@/FormData/comments/types';
import { getComment } from '@/api/comment';
import { castCommentVote } from '@/api/comment/vote';
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

  const _clickVote = async (vote: 'up' | 'down') => {
    if (!auth.id_token) {
      return;
    }
    const resp = await castCommentVote({
      token: auth.id_token,
      comment_id: commentID,
      subject_id: SUBJECT_ID,
      subComment_id: undefined,
      vote,
    });
    if (resp.status == 200) {
      await refetch();
    }
  };

  const { data, refetch } = useQuery({
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
    const voted = data.voted;

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
              subject_id={SUBJECT_ID}
              comment_id={commentID}
              voted={voted}
              clickVote={_clickVote}
            />
            <VotableSubComments isOpen={open} commentID={commentID} subCommentIDs={subcomments} />
          </FlexBox>
        </Collapse>
      </FlexBox>
    );
  }
}
