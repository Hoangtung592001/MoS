import config from '~/config';

import { Home } from '~/pages';

interface Route {
    path: string;
    component: any;
    layout?: any;
}

const publicRoutes: Route[] = [{ path: config.routes.home, component: Home }];

export { publicRoutes };
