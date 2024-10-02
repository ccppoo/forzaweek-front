import { useCallback, useContext, useRef, useState } from 'react';

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

import { useQuery } from '@tanstack/react-query';

import type { VotedUserType } from '@/FormData/comments/types';
import { DoVotes, GetVotes } from '@/api/reaction/vote';
import { FlexBox } from '@/components/styled';
import useAuthState from '@/store/auth';
import useUserProfile from '@/store/user';

// import { CommentContext } from '../context';

interface CommentReplyUtilProps {
  commentReplies: number;
  openSubComments: () => void;
}

interface DeaclImageDependent {
  decalID: string;
  decalImageID: string;
}

interface VotableActions2 {
  upVotes: number;
  downVotes: number;
  voted: VotedUserType;
  clickVote: (target: 'up' | 'down') => void;
}

interface VotableActions {
  voteEndpointPath: string;
}

interface VoteButtonIntf {
  votes: number;
  onClickVote: () => Promise<void>;
  voted: boolean;
  disabled: boolean;
  UP_DOWN: 'up' | 'down';
}

function VoteButton(props: VoteButtonIntf) {
  const { votes, onClickVote, voted, disabled, UP_DOWN } = props;

  return (
    <Tooltip arrow title={votes} placement="top">
      <span>
        <IconButton aria-label="score up" size="small" onClick={onClickVote} disabled={disabled}>
          {voted ? (
            UP_DOWN == 'up' ? (
              <ThumbUpAltIcon fontSize="small" />
            ) : (
              <ThumbDownAltIcon fontSize="small" />
            )
          ) : UP_DOWN == 'up' ? (
            <ThumbUpAltOutlinedIcon fontSize="small" />
          ) : (
            <ThumbDownAltOutlinedIcon fontSize="small" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
}

function VoteActions(props: VotableActions) {
  const [auth] = useAuthState();
  const userProfile = useUserProfile();
  const { voteEndpointPath } = props;

  const voteDisabled = !auth.id_token;

  const { data, refetch } = useQuery({
    queryFn: GetVotes,
    queryKey: ['get decal', voteEndpointPath],
  });

  const _clickVote = async (vote: 'up' | 'down') => {
    if (!auth.id_token) {
      return;
    }
    const resp = await DoVotes({
      authToken: auth.id_token,
      voteEndpointPath: voteEndpointPath,
      vote,
    });
    if (resp.status == 200) {
      await refetch();
    }
  };

  const clickUpVote = useCallback(async () => _clickVote('up'), []);
  const clickDownVote = useCallback(async () => _clickVote('down'), []);

  if (data) {
    const { upVotes, downVotes, voted } = data;
    const comment_score = upVotes - downVotes;

    const down_voted = userProfile?.userID ? voted.down.includes(userProfile?.userID) : false;
    const up_voted = userProfile?.userID ? voted.up.includes(userProfile?.userID) : false;

    return (
      <FlexBox
        sx={{
          alignItems: 'center',
        }}
      >
        <VoteButton
          votes={upVotes}
          voted={up_voted}
          onClickVote={clickUpVote}
          disabled={voteDisabled}
          UP_DOWN="up"
        />
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
        <VoteButton
          votes={downVotes}
          voted={down_voted}
          onClickVote={clickDownVote}
          disabled={voteDisabled}
          UP_DOWN="down"
        />
      </FlexBox>
    );
  }
}

function MoreMenu() {
  return (
    <FlexBox>
      <IconButton aria-label="more">
        <MoreHorizOutlinedIcon fontSize="small" />
      </IconButton>
    </FlexBox>
  );
}

export function DecalImageUploadActions(props: DeaclImageDependent) {
  const { decalID, decalImageID } = props;

  const voteEndpointPath = `FH5/decal/${decalID}/image/${decalImageID}/vote`;

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
      <VoteActions voteEndpointPath={voteEndpointPath} />
      <MoreMenu />
    </FlexBox>
  );
}
