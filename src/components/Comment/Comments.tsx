import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import Check from '@mui/icons-material/Check';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import { minWidth } from '@mui/system';

import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';

import * as image from '@/image';
import { MinHeightTextarea } from '@/components/TextArea';
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

interface CommentReplyUtilProps {
  commentReplies?: number | undefined;
  openReply?: () => void;
}

function CommentReplyUtil(props: CommentReplyUtilProps) {
  const comment_score = 23;
  const { commentReplies, openReply } = props;
  return (
    <>
      <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>{/* empty */}</FlexBox>
      <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
        <IconButton aria-label="score up" size="small">
          <ThumbUpAltOutlinedIcon fontSize="small" />
        </IconButton>
        <Typography>{comment_score}</Typography>
        <IconButton aria-label="score down" size="small">
          <ThumbDownAltOutlinedIcon fontSize="small" />
        </IconButton>
        {commentReplies && (
          <Button
            startIcon={<SmsOutlinedIcon fontSize="small" />}
            size={'small'}
            onClick={openReply}
          >
            Reply ({commentReplies})
          </Button>
        )}
        <IconButton aria-label="more">
          <MoreHorizOutlinedIcon fontSize="small" />
        </IconButton>
      </FlexBox>
    </>
  );
}

function ReplyList({ replyListItems, isOpen }: { replyListItems: any[]; isOpen: boolean }) {
  return (
    <>
      <FlexBox>{/* empty */}</FlexBox>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* 댓글 */}
          {replyListItems.map((rply, idx) => {
            return <Reply key={`reply-${idx}`} />;
          })}
        </List>
        <AddReply />
      </Collapse>
    </>
  );
}

function Reply() {
  const name = 'someone';
  const time = '2024-05-29';
  const comment = 'Mario Kart Wii be like';

  return (
    <>
      <FlexBox>{/* empty */}</FlexBox>
      <Box sx={{ display: 'grid', gridTemplateColumns: '35px auto', gridTemplateRows: '35px' }}>
        <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar {...stringAvatar(name)} sx={{ width: 25, height: 25 }} />
        </FlexBox>
        <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1">{time}</Typography>
        </FlexBox>
        <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>{/* empty */}</FlexBox>
        <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
          <Typography variant="body1">{comment}</Typography>
        </FlexBox>
        <CommentReplyUtil />
      </Box>
    </>
  );
}

function AddReply() {
  // 대댓글 작성칸

  return (
    <>
      <FlexBox>{/* empty */}</FlexBox>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '35px auto',
          width: '100%',
          gridTemplateRows: null,
        }}
      >
        <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>{/* empty */}</FlexBox>
        <FlexBox
          sx={{
            border: '1px black solid',
            paddingY: 0.2,
            paddingX: 0.1,
            borderRadius: 2,
            width: '100%',
            flexDirection: 'column',
          }}
        >
          <MinHeightTextarea width={'100%'} placeholder="reply" />
          {/* cancel, comment(submit) button */}
          <FlexBox sx={{ justifyContent: 'end', paddingY: 0.3 }}>
            <FlexBox sx={{ columnGap: 1 }}>
              <Button color="warning" variant="outlined" size="small" sx={{ borderRadius: 3 }}>
                cancel
              </Button>
              <Button color="success" variant="outlined" size="small" sx={{ borderRadius: 3 }}>
                reply
              </Button>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </Box>
    </>
  );
}

function Comment() {
  const [open, setOpen] = useState<boolean>(false);
  const [commentFolded, setCommentFolded] = useState<boolean>(false);
  const containerRef = useRef<HTMLElement>(null);
  const foldComment = () => {
    setOpen(!open);
  };

  const name = 'someone';
  const time = '2024-05-29';
  const comment_score = 23;
  const comment_replies = 3;
  const comment =
    "Well you're approaching the activity backwards. Your looking at it as jumping from spot to spot over the water and adding a bike. This guy is taking a bike and adding the acrobatics.";

  const reply = [{}, {}, {}];
  return (
    <FlexBox sx={{ flexDirection: 'column' }}>
      {/* 아바타 + 이름 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '35px auto',
          gridTemplateRows: '35px',
          paddingX: 0,
        }}
        onClick={() => setCommentFolded((val) => !val)}
      >
        <FlexBox sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar {...stringAvatar(name)} sx={{ width: 25, height: 25 }} />
        </FlexBox>
        <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1">{time}</Typography>
        </FlexBox>
      </Box>
      <Collapse in={!commentFolded} unmountOnExit>
        <Box sx={{ display: 'grid', gridTemplateColumns: '35px auto', gridTemplateRows: 'auto' }}>
          {/* 댓글 본문 + 메뉴 */}
          <FlexBox ref={containerRef}>{/* empty */}</FlexBox>
          <FlexBox sx={{ alignItems: 'center', columnGap: 1 }}>
            <Typography variant="body1">{comment}</Typography>
          </FlexBox>
          {/* 댓글 메뉴 */}
          <CommentReplyUtil commentReplies={comment_replies} openReply={() => setOpen(!open)} />
          <ReplyList replyListItems={reply} isOpen={open} />
        </Box>
      </Collapse>
    </FlexBox>
  );
}

const comments = [{}, {}, {}];

interface CommentsIntf {
  page: string;
  id: string;
}

export default function Comments() {
  type CommentSortOption = 'Date' | 'Score' | 'Replies';
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sortOption, setSortOption] = useState<CommentSortOption>('Date');
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const sortCommentSelect = (sortOption: CommentSortOption) => {
    setSortOption(sortOption);
    setAnchorEl(null);
  };

  const commentSortOrder = {};

  return (
    <FlexBox sx={{ width: '100%', flexDirection: 'column', rowGap: 2 }}>
      {/* Add Comment */}
      <FlexBox
        sx={{
          border: '1px black solid',
          paddingY: 0.2,
          paddingX: 0.1,
          borderRadius: 2,
          width: '100%',
          flexDirection: 'column',
        }}
      >
        <MinHeightTextarea width={'100%'} placeholder="comment" />
        {/* cancel, comment(submit) button */}
        <FlexBox sx={{ justifyContent: 'end', paddingY: 0.3 }}>
          <FlexBox sx={{ columnGap: 1 }}>
            <Button color="warning" variant="outlined" size="small" sx={{ borderRadius: 3 }}>
              cancel
            </Button>
            <Button color="success" variant="outlined" size="small" sx={{ borderRadius: 3 }}>
              reply
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
      {/* Comment sort option and search */}
      <FlexBox sx={{ justifyContent: 'start', alignItems: 'center', columnGap: 0 }}>
        {/* Comment sort option and search */}
        <Typography variant="subtitle1">Sort by : </Typography>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          sx={{ paddingX: 0 }}
          color="info"
          size="small"
          style={{
            fontSize: 16,
          }}
        >
          {sortOption}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <MenuList dense>
            <MenuItem onClick={() => sortCommentSelect('Date')}>
              <ListItemText>{'Date'}</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => sortCommentSelect('Score')}>
              <ListItemText>{'Score'}</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => sortCommentSelect('Replies')}>
              <ListItemText>{'Replies'}</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </FlexBox>
      {/* show comments */}
      {comments.map((cmt, i) => {
        return <Comment key={`comment-${i}`} />;
      })}
      {/* comment Pagination */}
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Pagination count={10} page={page} onChange={handleChange} />
      </FlexBox>
    </FlexBox>
  );
}
