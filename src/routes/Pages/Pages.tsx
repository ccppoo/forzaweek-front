import { Route, Routes } from 'react-router-dom';

import Box from '@mui/material/Box';

import type { RotuesRoot, RoutesEssential } from '@/routes/types';

import { routeAuths, routeRootAuths } from './Auth';
import { routeRootData } from './Data';
import { routeRootFH5, routesFH5 } from './FH5';
import { routeRootPosts } from './Posts';
import { routeRootRoot } from './Root';
import { routeRootTags } from './Tags';
import { routeRootUser } from './User';
import { getPageHeight } from './utils';

function populateRoute(basePath: string, routesRoot: RotuesRoot) {
  return (
    <Route path={routesRoot.rootPrefix}>
      {routesRoot.routeItems.flatMap(({ prefix, routes }) => {
        const routeKey = `route-${basePath}-${prefix}`;
        if (!prefix) {
          return Object.values(routes).map(({ path, component: Component }) => {
            return <Route path={path} element={<Component />} key={`${routeKey}-${path}`} />;
          });
        }
        return (
          <Route path={prefix} key={routeKey}>
            {Object.values(routes).map(({ path, component: Component }) => {
              return <Route path={path} element={<Component />} key={`${routeKey}-${path}`} />;
            })}
          </Route>
        );
      })}
    </Route>
  );
}

export default function Pages() {
  const FH5 = populateRoute('FH5', routeRootFH5);
  const Auth = populateRoute('auth', routeRootAuths);
  const Posts = populateRoute('post', routeRootPosts);
  const Tags = populateRoute('tag', routeRootTags);
  const Users = populateRoute('user', routeRootUser);
  const Data = populateRoute('data', routeRootData);
  const RootPages = populateRoute('', routeRootRoot);

  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>
        {FH5}
        {Auth}
        {Posts}
        {Tags}
        {Users}
        {Data}
        {RootPages}
      </Routes>
    </Box>
  );
}
