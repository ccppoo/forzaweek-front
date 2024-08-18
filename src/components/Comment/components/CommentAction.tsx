import { useContext, useRef, useState } from 'react';

import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import type { VotedUserType } from '@/FormData/comments/types';
import { FlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';
import useUserProfile from '@/store/user';

import { CommentContext } from '../context';

interface CommentReplyUtilProps {
  commentReplies: number;
  openSubComments: () => void;
}

interface VotableCommentAction {
  upVotes: number;
  downVotes: number;
  comment_id: string;
  subject_id: string;
  voted: VotedUserType;
  clickVote: (target: 'up' | 'down') => void;
}

function CommentVoteAction(props: VotableCommentAction) {
  const { commentReadOptions } = useContext(CommentContext);
  const [auth] = useAuthState();
  const userProfile = useUserProfile();
  const { upVotes, downVotes, comment_id, subject_id, voted, clickVote } = props;
  const comment_score = upVotes - downVotes;

  const voteDisabled = !auth.id_token;

  const down_voted = userProfile?.userID ? voted.down.includes(userProfile?.userID) : false;
  const up_voted = userProfile?.userID ? voted.up.includes(userProfile?.userID) : false;

  const clickUpVote = async () => clickVote('up');
  const clickDownVote = async () => clickVote('down');

  return (
    <FlexBox
      sx={{
        alignItems: 'center',
      }}
    >
      <Tooltip arrow title={upVotes} placement="top">
        <span>
          <IconButton
            aria-label="score up"
            size="small"
            onClick={clickUpVote}
            disabled={voteDisabled}
          >
            {up_voted ? (
              <ThumbUpAltIcon fontSize="small" />
            ) : (
              <ThumbUpAltOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </span>
      </Tooltip>
      <FlexBox
        sx={{
          cursor: 'default',
          paddingX: 1,
          minWidth: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography>{comment_score}</Typography>
      </FlexBox>
      <Tooltip arrow title={downVotes} placement="top">
        <span>
          <IconButton
            aria-label="score down"
            size="small"
            onClick={clickDownVote}
            disabled={voteDisabled}
          >
            {down_voted ? (
              <ThumbDownAltIcon fontSize="small" />
            ) : (
              <ThumbDownAltOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </span>
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

export function CommentActions() {
  const { commentReadOptions } = useContext(CommentContext);

  // const { commentReplies, openSubComments } = props;

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
      {/* <Button
        startIcon={<SmsOutlinedIcon fontSize="small" />}
        size={'small'}
        onClick={openSubComments}
      >
        Show Reply ({commentReplies})
      </Button> */}
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

export function TaggableCommentActions() {
  const { commentReadOptions } = useContext(CommentContext);

  // const { commentReplies, openSubComments, downVotes, upVotes } = props;

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
      {/* <CommentVoteAction downVotes={downVotes} upVotes={upVotes} /> */}

      <CommentMoreMenu />
    </FlexBox>
  );
}

export function VotableCommentActions(props: CommentReplyUtilProps & VotableCommentAction) {
  const { commentReadOptions } = useContext(CommentContext);
  // downVotes, upVotes, comment_id, subject_id, voted, clickVote
  const { commentReplies, openSubComments, ...voteActionProps } = props;

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
      <CommentVoteAction {...voteActionProps} />
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
