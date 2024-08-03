import { useContext, useState } from 'react';

import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';

import { SubCommentActions } from './CommentAction';
import CommentCreateTextArea from './CommentCreateTextArea';
import CommentUserProfile from './CommentUserProfile';
import CommentValue from './CommentValue';

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
        <CommentValue value={comment} />
        <SubCommentActions />
      </Collapse>
    </FlexBox>
  );
}
interface SubCommentsIntf {
  isOpen: boolean;
}

export default function SubComments(props: SubCommentsIntf) {
  const { isOpen } = props;
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
        {replyListItems.map((rply, idx) => {
          return <SubComment key={`reply-${idx}`} />;
        })}
        {/* <AddReply /> */}
      </FlexBox>
      <CommentCreateTextArea placeHolder="reply" />
    </Collapse>
  );
}
