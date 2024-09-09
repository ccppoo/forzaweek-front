import { Route, Routes } from 'react-router-dom';

import { RotuesRoot } from '@/routes/types';
import type { RoutesBase } from '@/routes/types';
import { RoutesBaseDev } from '@/routes/types';

export function GenerateRoutes<RoutesItems extends RoutesBase<string | number | symbol>>({
  prefix,
  routes,
}: {
  prefix: string;
  routes: RoutesItems;
}) {
  return (
    <Route path={prefix}>
      {Object.values(routes).map(({ path, component: Component }) => {
        return <Route key={path} path={path} element={<Component />} />;
      })}
    </Route>
  );
}

export default function GenerateRouteRoot({
  rootPrefix,
  routesRoot,
}: {
  rootPrefix: string;
  routesRoot: RotuesRoot;
}) {
  console.assert(rootPrefix == routesRoot.rootPrefix); // incase of human error
  return (
    <Route path={routesRoot.rootPrefix}>
      {routesRoot.routeItems.map(({ prefix, routes }) => (
        <GenerateRoutes prefix={prefix} routes={routes} key={`sub-route-${prefix}`} />
      ))}
    </Route>
  );
}

export function generateFullPathRoutes(routeRoots: RotuesRoot[]): RoutesBaseDev[] {
  const aa = routeRoots.flatMap(({ rootPrefix, routeItems }) => {
    return routeItems.flatMap(({ prefix, routes }) => {
      return Object.values(routes).map(({ path, component, ...res }) => {
        const realPath = [rootPrefix, prefix, path].filter((x) => !!x).join('/');
        return {
          path: realPath,
          ...res,
        };
      });
    });
  });

  return aa;
}
