import config from '~/config';
import { FooterOnly } from '~/layouts';

import { HomeContainer, SigninContainer, SignupContainer } from '~/layouts/containers';

interface Route {
    path: string;
    component: any;
    layout?: any;
}

const publicRoutes: Route[] = [{ path: config.routes.home, component: HomeContainer}, 
                                { path: config.routes.signin, component: SigninContainer, layout: FooterOnly },
                                { path: config.routes.signup, component: SignupContainer, layout: FooterOnly }
                                ];

export { publicRoutes };
