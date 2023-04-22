import { useEffect, useCallback, useState } from "react"
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
import { BoostrapModal } from "~/layouts/components";
export default function BooksContainer() {
    const dispatch = useAppDispatch();
    const { GetAllBooks, removeBook, resetBookDetails } = bindActionCreators(actionCreators, dispatch);
    const { books, removeBookStatus } = useAppSelector(state => state.bookDetailsReducer);
    const accessToken = getAccessTokenFromCookies();
    const [selectedBookId, setSelectedBookId] = useState<string>();
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(localizations.saveChangeModalTitle);
    const [contentModal, setContentModal] = useState(localizations.saveChangeModalContent);
    useEffect(() => {
        GetAllBooks();
        window.scrollTo(0, 0);
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
        <BoostrapModal 
            show={showModal} 
            setShow={setShowModal} 
            isErrored={false} 
            isDanger={true} 
            title={titleModal} 
            content={contentModal}
            action={() => {
                if (selectedBookId)
                onRemove(selectedBookId)
            }}
            saveChangeTitle={localizations.delete}
        />
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
                        authorName={book.author.name}
                        Button={
                            <div className="book-container-item-remove-button">
                                <Button type={ButtonTypes.ADDTOBASKET} onClick={(e : any) => {
                                    setSelectedBookId(book.id);
                                    setShowModal(true);
                                }} isLoading={removeBookStatus == RequestStatus.Pending && book.id === selectedBookId}>
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