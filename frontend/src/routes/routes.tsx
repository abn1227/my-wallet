import { AuthenticationRoutes } from './Authentication';
import { DefaultRoutes } from './DefaulRoutes';

export const routes = [...DefaultRoutes, ...AuthenticationRoutes];
