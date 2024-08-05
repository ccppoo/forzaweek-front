import { useContext, useRef, useState } from 'react';

import Collapse from '@mui/material/Collapse';

import { FlexBox } from '@/components/styled';

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

  const [open, setOpen] = useState<boolean>(false);
  const [commentFolded, setSubCommentFolded] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement>(null);
  const toggleSubComment = () => {
    setOpen((prev) => !prev);
  };

  const name = 'someone';
  const time = '2024-05-29';
  const comment_score = 23;
  const comment_replies = 3;
  const comment =
    "Well you're approaching the activity backwards. Your looking at it as jumping from spot to spot over the water and adding a bike. This guy is taking a bike and adding the acrobatics.";

  const toggleCommentDisplay = () => setSubCommentFolded((val) => !val);

  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      {/* 아바타 + 이름 */}
      <CommentUserProfile toggleCommentDisplay={toggleCommentDisplay} name={name} time={time} />
      <Collapse in={!commentFolded} unmountOnExit>
        <FlexBox sx={{ paddingLeft: '36px', flexDirection: 'column' }}>
          <CommentBody value={comment} />
          <CommentActions commentReplies={comment_replies} openSubComments={toggleSubComment} />
          {/* <SubComments isOpen={open} /> */}
        </FlexBox>
      </Collapse>
    </FlexBox>
  );
}
