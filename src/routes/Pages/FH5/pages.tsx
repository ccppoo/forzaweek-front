import { Route, Routes } from 'react-router-dom';

import type { RoutesBase } from '@/routes/types';

import { routesFH5Car } from './car';
import { routesFH5Decal } from './decal';
import { routesFH5RaceRoute } from './raceRoute';
import { routesFH5Tuning } from './tuning';
import { routesFH5VynilGroup } from './vynilGroup';

function GenerateRoutes<RoutesItems extends RoutesBase<string | number | symbol>>({
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

export default function FH5Routes() {
  return (
    <Route path="FH5">
      <Route element={<GenerateRoutes prefix="car" routes={routesFH5Car} />} />
      {/* <Route path='car'element={<GenerateRoutes prefix="car" routes={routesFH5Car} />} /> */}
      <GenerateRoutes prefix="car" routes={routesFH5Car} />
      <GenerateRoutes prefix="/decal" routes={routesFH5Decal} />
      <GenerateRoutes prefix="/tuning" routes={routesFH5Tuning} />
      <GenerateRoutes prefix="/raceroute" routes={routesFH5RaceRoute} />
    </Route>
  );
}

export const tlqkf = [
  <GenerateRoutes prefix="car" routes={routesFH5Car} />,
  <GenerateRoutes prefix="/decal" routes={routesFH5Decal} />,
  <GenerateRoutes prefix="/tuning" routes={routesFH5Tuning} />,
  <GenerateRoutes prefix="/raceroute" routes={routesFH5RaceRoute} />,
];
