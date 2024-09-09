import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { FlexBox } from '@/components/styled';
import { routesForDev } from '@/routes';
import useTheme from '@/store/theme';

function LinkButton({ name, path }: { name: string; path: string }) {
  const navigate = useNavigate();

  const onclick = () => {
    navigate(path);
  };

  return (
    <FlexBox>
      <Button variant="contained" onClick={() => onclick()}>
        {name}
      </Button>
    </FlexBox>
  );
}

function DevHeader() {
  const [theme, themeActions] = useTheme();
  console.log('asdasd');
  console.log(`routesForDev : ${routesForDev}`);
  return (
    <Box sx={{ width: '100%', position: '' }} data-pw={`theme-${theme}`}>
      <AppBar color="transparent" elevation={1} position="sticky" sx={{ top: 0, paddingX: 0 }}>
        <Toolbar sx={{ padding: 0 }}>
          <Container sx={{ display: 'flex', justifyContent: 'center', columnGap: 1 }}>
            {Object.values(routesForDev).map(({ title, path, devHide, devUrl }) => {
              if (!devHide) return <LinkButton name={title!} path={devUrl || path!} />;
            })}

            {/* <FlexBox></FlexBox> */}
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default DevHeader;
