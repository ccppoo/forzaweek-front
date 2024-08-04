import { useContext, useState } from 'react';

import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import type { VotableComment } from '@/FormData/comments/base';
import { FlexBox } from '@/components/styled';

import { SubCommentActions } from './CommentAction';
import CommentBody from './CommentBody';
import CommentCreateTextArea from './CommentCreateTextArea';
import CommentUserProfile from './CommentUserProfile';

interface SubCommentsIntf {
  isOpen: boolean;
  comments: VotableComment[];
}

interface VotableSubCommentsIntf {
  isOpen: boolean;
  subComments: VotableComment[];
}

interface VotableSubCommentIntf {
  comment: VotableComment;
}

function SubComment() {
  const name = 'someone';
  const time = '2024-05-29';
  const comment = 'Mario Kart Wii be like';
  const [commentFolded, setCommentFolded] = useState<boolean>(false);
  const toggleCommentDisplay = () => setCommentFolded((val) => !val);

  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <CommentUserProfile
        name={name}
        time={time}
        isSubComment
        toggleCommentDisplay={toggleCommentDisplay}
      />
      <Collapse in={!commentFolded} unmountOnExit sx={{ paddingLeft: '36px' }}>
        <CommentBody value={comment} />
        <SubCommentActions />
      </Collapse>
    </FlexBox>
  );
}

function VotableSubComment(props: VotableSubCommentIntf) {
  const { comment } = props;
  const creator_id = comment.creator;

  const created = comment.created_at;
  // const comment = 'Mario Kart Wii be like';
  const value = comment.value;
  const [commentFolded, setCommentFolded] = useState<boolean>(false);
  const toggleCommentDisplay = () => setCommentFolded((val) => !val);

  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      <CommentUserProfile
        user_id={creator_id}
        comment_created={created}
        toggleCommentDisplay={toggleCommentDisplay}
      />
      <Collapse in={!commentFolded} unmountOnExit sx={{ paddingLeft: '36px' }}>
        <CommentBody value={value} />
        <SubCommentActions />
      </Collapse>
    </FlexBox>
  );
}

export default function SubComments(props: SubCommentsIntf) {
  const { isOpen, comments } = props;
  // const replyListItems = [{}, {}, {}];
  const replyListItems = [{}];

  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ flexDirection: 'column' }}>
      <FlexBox
        sx={{
          flexDirection: 'column',
        }}
      >
        {/* 댓글 */}
        {comments.map((rply, idx) => {
          return <SubComment key={`reply-${idx}`} />;
        })}
        {/* <AddReply /> */}
      </FlexBox>
      <CommentCreateTextArea placeHolder="reply" />
    </Collapse>
  );
}

export function VotableSubComments(props: VotableSubCommentsIntf) {
  const { isOpen, subComments } = props;
  // const replyListItems = [{}, {}, {}];
  const replyListItems = [{}];

  return (
    <Collapse in={isOpen} timeout="auto" unmountOnExit sx={{ flexDirection: 'column' }}>
      <FlexBox
        sx={{
          flexDirection: 'column',
        }}
      >
        {/* 댓글 */}
        {subComments.map((cmt, idx) => {
          return <VotableSubComment comment={cmt} key={`reply-${idx}`} />;
        })}
      </FlexBox>
      <CommentCreateTextArea placeHolder="reply" />
    </Collapse>
  );
}
