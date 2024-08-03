import { useContext, useRef, useState } from 'react';

import Button from '@mui/material/Button';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';

import { CommentContext } from '@/components/Comment/context';
import type { CommentSortOption } from '@/components/Comment/types';
import { FlexBox } from '@/components/styled';

export default function CommentOptionSort() {
  // Comment sort option and search
  const { commentReadOptions, setCommentReadOptions } = useContext(CommentContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const sortOption = commentReadOptions.order;
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectCommentSortOption = (sortOption: CommentSortOption) => {
    setCommentReadOptions('order', sortOption);
  };
  return (
    <FlexBox sx={{ alignItems: 'center' }}>
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
          <MenuItem onClick={() => selectCommentSortOption('Date')}>
            <ListItemText>{'Date'}</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => selectCommentSortOption('Score')}>
            <ListItemText>{'Score'}</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => selectCommentSortOption('Replies')}>
            <ListItemText>{'Replies'}</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </FlexBox>
  );
}
