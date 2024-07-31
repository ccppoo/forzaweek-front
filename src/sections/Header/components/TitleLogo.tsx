import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { FlexBox } from '@/components/styled';
import { Image } from '@/components/styled';
import { title } from '@/config';
import useNotifications from '@/store/notifications';

function getRandomJoke() {
  return 'test random joke';
}
export default function TitleLogoHeader() {
  const [, notificationsActions] = useNotifications();

  const MainTitleWidth = 100;
  function showNotification() {
    notificationsActions.push({
      options: {
        // Show fully customized notification
        // Usually, to show a notification, you'll use something like this:
        // notificationsActions.push({ message: ... })
        // `message` accepts string as well as ReactNode
        // If you want to show a fully customized notification, you can define
        // your own `variant`s, see @/sections/Notifications/Notifications.tsx
        variant: 'customNotification',
      },
      message: getRandomJoke(),
    });
  }

  return (
    <FlexBox sx={{ alignItems: 'center', width: MainTitleWidth }}>
      <Button onClick={showNotification} color="info">
        {title}
      </Button>
    </FlexBox>
  );
}
