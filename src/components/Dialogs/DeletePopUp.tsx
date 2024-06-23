import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { green, red } from '@mui/material/colors';

import { useQuery } from '@tanstack/react-query';

import { DeleteItem } from '@/api/data/delete';
import { Image } from '@/components/styled';
import useNotifications from '@/store/notifications';

export default function DeleteItemPopUp({
  opened,
  dataType,
  itemID,
  onClose,
}: {
  opened: boolean;
  dataType: string;
  itemID: string;
  onClose: () => void;
}) {
  type CloseReason = 'backdropClick' | 'escapeKeyDown';
  const handleClose = (event: object, reason: CloseReason) => {
    onClose();
    // if (reason && reason === 'backdropClick') return;
  };

  const [waitingDelete, setWaitingDelete] = useState<boolean>(false);
  const [, { push }] = useNotifications();

  const itemName = 'item name';

  const deleteItem = async () => {
    setWaitingDelete(true);
    await DeleteItem({ dataType, documentID: itemID });
    setWaitingDelete(false);
    push({
      options: {
        variant: 'itemDeleteNotification',
      },
      message: `item ${itemName} was deleted`,
    });
    onClose();
  };

  const title = `${dataType} 항목을 삭제합니까?`;

  // TODO: 컴포넌트 부르는 애들이 직접 제공할 것
  const itemShortDetail = '아이템 내용';

  return (
    <Dialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ minWidth: 500 }}>
        <DialogContentText id="alert-dialog-description">{itemShortDetail}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          취소
        </Button>
        <Box sx={{ m: 1, position: 'relative' }}>
          <Button
            onClick={deleteItem}
            autoFocus
            variant="contained"
            color="error"
            disabled={waitingDelete}
          >
            삭제하기
          </Button>
          {waitingDelete && (
            <CircularProgress
              size={24}
              sx={{
                color: red[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
