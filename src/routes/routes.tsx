import config from '~/config';

import { HomeContainer } from '~/layouts/containers';

interface Route {
    path: string;
    component: any;
    layout?: any;
}

const publicRoutes: Route[] = [{ path: config.routes.home, component: HomeContainer }];

export { publicRoutes };
