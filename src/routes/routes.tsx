import config from '~/config';
import { FooterOnly } from '~/layouts';

import { HomeContainer, SigninContainer, SignupContainer, BasketContainer, BookIntroAndDetailsContainer, MyAccountContainer } from '~/layouts/containers';

interface Route {
    path: string;
    component: any;
    layout?: any;
}

const publicRoutes: Route[] = [
    { path: config.routes.home, component: HomeContainer },
    { path: config.routes.signin, component: SigninContainer, layout: FooterOnly },
    { path: config.routes.signup, component: SignupContainer, layout: FooterOnly },
    { path: config.routes.basket, component: BasketContainer },
    { path: config.routes.bookDetails, component: BookIntroAndDetailsContainer },
    { path: config.routes.myAccount, component: MyAccountContainer },
];

export { publicRoutes };
