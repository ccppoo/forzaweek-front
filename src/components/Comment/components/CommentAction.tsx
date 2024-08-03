import { useContext, useRef, useState } from 'react';

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';

import { CommentContext } from '../context';

interface CommentReplyUtilProps {
  commentReplies: number;
  openSubComments: () => void;
}

function CommentVoteAction() {
  const comment_score = 23;

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
      }}
    >
      <IconButton aria-label="score up" size="small">
        <ThumbUpAltOutlinedIcon fontSize="small" />
      </IconButton>
      <Typography>{comment_score}</Typography>
      <IconButton aria-label="score down" size="small">
        <ThumbDownAltOutlinedIcon fontSize="small" />
      </IconButton>
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
      <CommentVoteAction />
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
      <CommentVoteAction />
      <CommentMoreMenu />
    </FlexBox>
  );
}
