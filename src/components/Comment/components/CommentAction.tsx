import { useContext, useRef, useState } from 'react';

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';

import { CommentContext } from '../context';

interface CommentReplyUtilProps {
  commentReplies: number;
  openSubComments: () => void;
}

interface VotableCommentAction {
  upVotes: number;
  downVotes: number;
}

function CommentVoteAction(props: VotableCommentAction) {
  const { upVotes, downVotes } = props;
  const comment_score = upVotes + downVotes;

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
      }}
    >
      <Tooltip arrow title={upVotes} placement="top">
        <IconButton aria-label="score up" size="small">
          <ThumbUpAltOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Typography>{comment_score}</Typography>
      <Tooltip arrow title={downVotes} placement="top">
        <IconButton aria-label="score down" size="small">
          <ThumbDownAltOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </FlexBox>
  );
}

function CommentMoreMenu() {
  return (
    <FlexBox>
      <IconButton aria-label="more">
        <MoreHorizOutlinedIcon fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}

export function CommentActions(props: CommentReplyUtilProps) {
  const { commentReadOptions } = useContext(CommentContext);

  const { commentReplies, openSubComments } = props;

  return (
    <FlexBox
      sx={{
        justifyContent: 'start',
        alignItems: 'center',
        columnGap: 1,
        gridColumn: '2/3',
        gridRow: '2/3',
      }}
    >
      <Button
        startIcon={<SmsOutlinedIcon fontSize="small" />}
        size={'small'}
        onClick={openSubComments}
      >
        Show Reply ({commentReplies})
      </Button>
      <CommentMoreMenu />
    </FlexBox>
  );
}

export function VotableCommentActions(props: CommentReplyUtilProps & VotableCommentAction) {
  const { commentReadOptions } = useContext(CommentContext);

  const { commentReplies, openSubComments, downVotes, upVotes } = props;

  return (
    <FlexBox
      sx={{
        justifyContent: 'start',
        alignItems: 'center',
        columnGap: 1,
        gridColumn: '2/3',
        gridRow: '2/3',
      }}
    >
      <CommentVoteAction downVotes={downVotes} upVotes={upVotes} />
      <Button
        startIcon={<SmsOutlinedIcon fontSize="small" />}
        size={'small'}
        onClick={openSubComments}
      >
        Show Reply ({commentReplies})
      </Button>
      <CommentMoreMenu />
    </FlexBox>
  );
}
export function SubCommentActions() {
  return (
    <FlexBox
      sx={{
        justifyContent: 'start',
        alignItems: 'center',
        columnGap: 1,
        gridColumn: '2/3',
        gridRow: '2/3',
      }}
    >
      <CommentMoreMenu />
    </FlexBox>
  );
}

export function VotableSubCommentActions(props: VotableCommentAction) {
  return (
    <FlexBox
      sx={{
        justifyContent: 'start',
        alignItems: 'center',
        columnGap: 1,
        gridColumn: '2/3',
        gridRow: '2/3',
      }}
    >
      <CommentVoteAction {...props} />
      <CommentMoreMenu />
    </FlexBox>
  );
}
