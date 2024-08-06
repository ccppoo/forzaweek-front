import { useContext, useState } from 'react';

import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';

import type { VotableSubCommentType } from '@/FormData/comments/types';
import { getSubComment } from '@/api/comment';
import { castCommentVote } from '@/api/comment/vote';
import { FlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';

import { CommentContext } from '../context';
import { VotableSubCommentActions } from './CommentAction';
import CommentBody from './CommentBody';
import CommentCreateTextArea from './CommentCreateTextArea';
import CommentUserProfile from './CommentUserProfile';

interface VotableSubCommentsIntf {
  isOpen: boolean;
  commentID: string;
  subCommentIDs: string[];
}

interface VotableSubCommentIntf {
  commentID: string;
  subCommentID: string;
}
export function VotableSubComments(props: VotableSubCommentsIntf) {
  const { isOpen, commentID, subCommentIDs } = props;

  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ flexDirection: 'column' }}>
      <FlexBox
        sx={{
          flexDirection: 'column',
        }}
      >
        {subCommentIDs.map((scmtID, idx) => {
          return (
            <VotableSubComment
              commentID={commentID}
              subCommentID={scmtID}
              key={`reply-${scmtID}`}
            />
          );
        })}
      </FlexBox>
      <CommentCreateTextArea placeHolder="reply" />
    </Collapse>
  );
}

function VotableSubComment(props: VotableSubCommentIntf) {
  const { commentReadOptions } = useContext(CommentContext);
  const SUBJECT_ID = commentReadOptions.subject_id!;
  const { commentID, subCommentID } = props;
  const [auth] = useAuthState();

  const _clickVote = async (vote: 'up' | 'down') => {
    // console.log(`sub comment clicked ${vote}`);

    if (!auth.id_token) {
      return;
    }
    const resp = await castCommentVote({
      token: auth.id_token,
      subject_id: SUBJECT_ID,
      comment_id: commentID,
      subComment_id: subCommentID,
      vote,
    });
    if (resp.status == 200) {
      await refetch();
    }
  };

  const [commentFolded, setCommentFolded] = useState<boolean>(false);
  const toggleCommentDisplay = () => setCommentFolded((val) => !val);

  const { data, refetch } = useQuery({
    queryKey: ['get sub comment', auth.id_token, SUBJECT_ID, commentID, subCommentID],
    queryFn: getSubComment<VotableSubCommentType>,
  });
  // TODO: Place holder - https://mui.com/material-ui/react-skeleton/
  if (data) {
    const creator_id = data.creator;
    const created = data.created_at;
    const upVotes = data.up_votes;
    const downVotes = data.down_votes;
    const value = data.value;
    const voted = data.voted;
    return (
      <FlexBox sx={{ flexDirection: 'column' }}>
        <CommentUserProfile
          user_id={creator_id}
          comment_created={created}
          toggleCommentDisplay={toggleCommentDisplay}
        />
        <Collapse in={!commentFolded} sx={{ paddingLeft: '36px' }}>
          <CommentBody value={value} />
          <VotableSubCommentActions
            downVotes={downVotes}
            upVotes={upVotes}
            subject_id={commentID}
            comment_id={subCommentID}
            voted={voted}
            clickVote={_clickVote}
          />
        </Collapse>
      </FlexBox>
    );
  }
}
