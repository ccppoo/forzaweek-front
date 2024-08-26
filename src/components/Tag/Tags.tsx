import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

import { useQuery } from '@tanstack/react-query';

import type { DecalSchemaReadType } from '@/FormData/decal';
import { GetTagByID } from '@/api/tag/tag';
import { voteTagOfSubject } from '@/api/tag/tagging/vote';
import { getAllTagsOfSubject, getTagOfSubject } from '@/api/tag/tags';
import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import useAuthState from '@/store/auth';
import useUserProfile from '@/store/user';

import Tagging from './Tagging';

interface TagsIntf {
  topic: string; // 게시물 종류 - car, decal, tuning, ..
  subjectID: string; // 태그가 달린 게시물 ID
}

interface TagIntf extends TagsIntf {
  tagID: string;
}

interface TagChipIntf {
  label: string;
  voteTag: (type: 'up' | 'down') => void;
  up_score: number;
  down_score: number;
  up_voted: boolean;
  down_voted: boolean;
}
function TagChip(props: TagChipIntf) {
  const {
    label,
    voteTag,
    up_voted,
    down_voted,

    up_score,
    down_score,
  } = props;

  const [tagOpened, setTagOpened] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClose = () => {
    setAnchorEl(null);
    setTagOpened(false);
  };
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setTagOpened((prev) => !prev);
  };

  const clickUpVote = async () => {
    await voteTag('up');
    handleClose();
  };
  const clickDownVote = async () => {
    await voteTag('down');
    handleClose();
  };

  const tagScore = up_score - down_score;
  const tagScoreColor = tagScore < 0 ? 'red' : tagScore > 0 ? 'green' : 'grey';

  // console.log(`up_voted : ${up_voted}, down_voted : ${down_voted}`);

  return (
    <FlexBox
      sx={{
        width: 'fit-content',
        borderRadius: '14px',
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        alignItems: 'center',
        paddingLeft: 0.5,
      }}
    >
      <ButtonBase
        sx={{
          height: 32,
          fontSize: '0.8125rem',
          justifyContent: 'center',
          maxWidth: '100%',
          paddingX: 1,
        }}
        onClick={onClick}
      >
        <Typography>{label}</Typography>
        <FlexBox
          sx={{
            minWidth: 10,
            marginLeft: 1,
            paddingX: 1,
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255,1)',
          }}
        >
          <Typography sx={{ color: tagScoreColor }}>{tagScore}</Typography>
        </FlexBox>
      </ButtonBase>
      <Popover
        open={tagOpened}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <FlexBox>
          <IconButton
            aria-label="score down"
            size="small"
            onClick={clickDownVote}
            // disabled={voteDisabled}
          >
            {down_voted ? (
              <ThumbDownAltIcon fontSize="small" />
            ) : (
              <ThumbDownAltOutlinedIcon fontSize="small" />
            )}
          </IconButton>

          <IconButton
            aria-label="score up"
            size="small"
            onClick={clickUpVote}
            // disabled={voteDisabled}
          >
            {up_voted ? (
              <ThumbUpAltIcon fontSize="small" />
            ) : (
              <ThumbUpAltOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </FlexBox>
      </Popover>
    </FlexBox>
  );
}

function Tag(props: TagIntf) {
  const { topic, subjectID, tagID } = props;
  const [auth] = useAuthState();
  const user = useUserProfile();

  const { data, refetch } = useQuery({
    queryKey: ['get tag of subject id', topic, subjectID, tagID, auth.id_token],
    queryFn: getTagOfSubject,
  });

  const { data: tagData } = useQuery({
    queryKey: ['get tag of subject id', data?.tag_id!],
    queryFn: GetTagByID,
    enabled: !!data?.tag_id,
  });

  async function voteTag(type: 'up' | 'down'): Promise<void> {
    await voteTagOfSubject({ ...props, type, id_token: auth.id_token! });
    await refetch();
  }

  if (data && tagData) {
    // console.log(`data : ${JSON.stringify(data)}`);
    // console.log(`data.up_user : ${data.up_user}`);
    const up_voted = !!user?.userID ? data.up_user.includes(user?.userID) : false;
    const down_voted = !!user?.userID ? data.down_user.includes(user?.userID) : false;
    const label = tagData.name.en || tagData.name.ko;
    return (
      <TagChip
        label={label!}
        voteTag={voteTag}
        down_voted={down_voted}
        up_voted={up_voted}
        up_score={data.up}
        down_score={data.down}
      />
    );
  }
}

export default function Tags(props: TagsIntf) {
  const { topic, subjectID } = props;

  const { data } = useQuery({
    queryKey: ['get tags of subject id', topic, subjectID],
    queryFn: getAllTagsOfSubject,
  });

  if (data) {
    console.log(`data  : ${JSON.stringify(data)}`);
    return (
      <FlexBox sx={{ flexDirection: 'column' }}>
        <FlexBox sx={{ paddingBottom: 1 }}>
          <Typography variant="h5">Tags</Typography>
        </FlexBox>
        <Paper
          sx={{
            display: 'flex',
            padding: 1,
            columnGap: 0.5,
            alignContent: 'flex-start',
            flexWrap: 'wrap',
            rowGap: 1,
          }}
        >
          {data.tags.map((tagID, idx) => {
            return <Tag {...props} tagID={tagID} key={`tagging-tag-${tagID}-${idx}`} />;
          })}
        </Paper>
      </FlexBox>
    );
  }
}
