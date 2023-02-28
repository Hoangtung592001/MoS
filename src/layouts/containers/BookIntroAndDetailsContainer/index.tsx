import './BookIntroAndDetailsContainer.scss';
import { BookIntro, BookDetails, PriceInfo, ProductCardList } from '../../components';
import { Fragment, useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import actionCreators from '~/redux';
import { getAccessTokenFromCookies } from '~/commons/commonUsedFunctions';
import { AddToBasket } from '~/redux/action-creators/basketActionCreator';
import routes from '~/config/routes';
import Cookies from 'universal-cookie';
import { accessTokenKey, RequestStatus } from '~/constants';
export default function BookIntroAndDetailsContainer() {
    const bookDetails = useAppSelector((state) => state.bookDetailsReducer.bookDetails);
    const cookies = new Cookies();
    const accessToken = cookies.get(accessTokenKey);
    const { status } = useAppSelector((state) => state.basketReducer);
    const dispatch = useAppDispatch();
    const { bookId } = useParams();
    const { getBookDetails, addToBasket, resetBasket, getFrequentlyViewedItems } = bindActionCreators(
        actionCreators,
        dispatch,
    );
    const frequentlyViewedItems = useAppSelector((state) => state.frequentlyViewedItemsReducer.items);
    const navigate = useNavigate();
    const onAddToBasket = () => {
        if (accessToken && bookId) {
            const params: AddToBasket = {
                bookId: bookId,
                accessToken: accessToken,
                quantity: 1,
            };

            addToBasket(params);
        }

        if (!accessToken) {
            navigate(routes.signin);
        }
    };

    useEffect(() => {
        getFrequentlyViewedItems();
    }, []);

    useEffect(() => {
        if (bookId) {
            getBookDetails(getAccessTokenFromCookies(), bookId);
        }
    }, [bookId, getBookDetails]);

    useEffect(() => {
        if (status == RequestStatus.Fulfilled) {
            resetBasket();
            navigate(routes.basket);
        }
    }, [status]);

    return bookDetails ? (
        <Fragment>
            <div className="book-intro-and-details-container display-flex justify-content--space-between">
                <div className="book-intro-and-details-info">
                    <BookIntro
                        title={bookDetails.title}
                        author={bookDetails.author.name}
                        publisher={bookDetails.publisher.name}
                        quantity={bookDetails.quantity}
                        publishedAt={bookDetails.publishedAt}
                        bookCondition={bookDetails.bookCondition.name}
                        bookImg={bookDetails.bookImages[0].url}
                    />
                    <BookDetails
                        description={bookDetails.description}
                        title={bookDetails.title}
                        publisher={bookDetails.publisher.name}
                        publishedAt={bookDetails.publishedAt}
                        bookCondition={bookDetails.bookCondition.name}
                        bookDetails={JSON.parse(bookDetails.bookDetails)}
                    />
                </div>
                <div className="book-intro-and-details-price">
                    <PriceInfo
                        price={bookDetails.price}
                        bookId={bookDetails.id}
                        onAddToBasket={onAddToBasket}
                        isLoading={status == RequestStatus.Pending}
                    />
                </div>
            </div>
            <div className="book-intro-and-details-recomended-items">
                <ProductCardList title="Frequently Viewed Items" items={frequentlyViewedItems} />
            </div>
        </Fragment>
    ) : null;
}
