import { useContext, useRef, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { FlexBox, FullSizeCenteredFlexBox } from '@/components/styled';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0].toUpperCase()}`,
  };
}

interface CommentUserProfileIntf {
  name: string;
  time: string;
  isSubComment?: boolean;
  toggleCommentDisplay?: () => void;
}

export default function CommentUserProfile(props: CommentUserProfileIntf) {
  const { toggleCommentDisplay, isSubComment, name, time } = props;

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '35px auto',
        gridTemplateRows: '35px',
        paddingX: 0,
      }}
      onClick={toggleCommentDisplay}
    >
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Avatar {...stringAvatar(name)} sx={{ width: 25, height: 25 }} />
      </FlexBox>
      <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1">{time}</Typography>
      </FlexBox>
    </Box>
  );
}
