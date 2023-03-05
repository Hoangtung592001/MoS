import config from '~/config';
import { FooterOnly, HeaderIcon } from '~/layouts';

import {
    HomeContainer,
    SigninContainer,
    SignupContainer,
    BasketContainer,
    BookIntroAndDetailsContainer,
    MyAccountContainer,
    SecurityContainer,
    ChangeEmailContainer,
    ChangeNameContainer,
    ChangePasswordContainer,
    PaymentOptionsContainer,
    ReviewOrderContainer,
} from '~/layouts/containers';
import CongratulationsContainer from '~/layouts/containers/CongratulationsContainer';
import GoogleMapContainer from '~/layouts/containers/GoogleMapContainer';
import MyPurchasesContainer from '~/layouts/containers/MyPurchasesContainer';
import ShippingAddressContainer from '~/layouts/containers/ShippingAddressContainer';

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
    { path: config.routes.security, component: SecurityContainer, layout: HeaderIcon },
    { path: config.routes.changeEmail, component: ChangeEmailContainer, layout: HeaderIcon },
    { path: config.routes.changeName, component: ChangeNameContainer, layout: HeaderIcon },
    { path: config.routes.changePassword, component: ChangePasswordContainer, layout: HeaderIcon },
    { path: config.routes.shippingAddress, component: ShippingAddressContainer, layout: HeaderIcon },
    { path: config.routes.googleMap, component: GoogleMapContainer, layout: HeaderIcon },
    { path: config.routes.paymentOptions, component: PaymentOptionsContainer, layout: HeaderIcon },
    { path: config.routes.reviewOrder, component: ReviewOrderContainer, layout: HeaderIcon },
    { path: config.routes.myPurchases, component: MyPurchasesContainer },
    { path: config.routes.congratulations, component: CongratulationsContainer },
];

export { publicRoutes };
