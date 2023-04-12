import { useEffect, useCallback } from "react"
import { bindActionCreators } from "redux";
import { getAccessTokenFromCookies } from "~/commons/commonUsedFunctions";
import Button from "~/components/Button";
import { RequestStatus } from "~/constants";
import { ButtonTypes } from "~/constants/enums";
import localizations from "~/constants/locallizations";
import { useAppDispatch, useAppSelector } from "~/hooks";
import OrderItem from "~/layouts/components/OrderItem";
import actionCreators from "~/redux";
import { RemoveBookReq } from "~/redux/action-creators/bookDetailsActionCreator";
import './BooksContainer.scss';
import { getEditBookRoute } from "~/config/routes";
export default function BooksContainer() {
    const dispatch = useAppDispatch();
    const { GetAllBooks, removeBook, resetBookDetails } = bindActionCreators(actionCreators, dispatch);
    const { books, removeBookStatus } = useAppSelector(state => state.bookDetailsReducer);
    const accessToken = getAccessTokenFromCookies();
    useEffect(() => {
        GetAllBooks();
    }, []);

    const onRemove = useCallback((bookId: string) => {
        const removeBookProps: RemoveBookReq = {
            accessToken: accessToken,
            bookId: bookId
        };
        removeBook(removeBookProps);
    }, []);

    useEffect(() => {
        if (removeBookStatus === RequestStatus.Fulfilled) {
            resetBookDetails();
            window.location.reload();
        }
    }, [removeBookStatus])

    return <div className="book-container">
        {books.map((book) => {
            return (
                <div className="book-container-item" key={book.id}>
                    <OrderItem 
                        bookId={book.id}
                        imgUrl={book.bookImages[0].url}
                        title={book.title}
                        quantity={book.quantity}
                        finalPriceEach={book.price}
                        originalPriceEach={book.price}
                        disablePrice={true}
                        showQuantity={false}
                        url={getEditBookRoute(book.id)}
                        Button={
                            <div>
                                <Button type={ButtonTypes.ADDTOBASKET} onClick={(e : any) => {
                                    onRemove(book.id)
                                }} isLoading={removeBookStatus == RequestStatus.Pending}>
                                    <span className="price-info__add-to-basket">
                                        {localizations.remove}
                                    </span>
                                </Button>
                            </div>
                        }
                    />
                </div>
            )
        })}
    </div>
}