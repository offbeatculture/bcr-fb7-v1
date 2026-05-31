import { createContext, useContext } from 'react';
import { detectRoute, getRouteConfig } from '../data/routeConfig.js';

const route = detectRoute();
const config = getRouteConfig(route);

const RouteContext = createContext(config);

export function RouteProvider({ children }) {
  return <RouteContext.Provider value={config}>{children}</RouteContext.Provider>;
}

export function useRoute() {
  return useContext(RouteContext);
}
