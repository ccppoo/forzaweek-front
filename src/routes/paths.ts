import { routeRootAuths } from './Pages/Auth';
import { routeRootData } from './Pages/Data';
import { routeRootFH5 } from './Pages/FH5';
import { routeRootPosts } from './Pages/Posts';
import { routeRootRoot } from './Pages/Root';
import { routeRootTags } from './Pages/Tags';
import { routeRootUser } from './Pages/User';
import { generateFullPathRoutes } from './utils';

export const routesForDev = generateFullPathRoutes([
  routeRootAuths,
  routeRootFH5,
  routeRootPosts,
  routeRootData,
  routeRootRoot,
  routeRootTags,
  routeRootUser,
]);
