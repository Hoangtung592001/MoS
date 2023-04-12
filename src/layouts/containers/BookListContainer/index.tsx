import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useAppSelector } from '~/hooks';
import actionCreators from '~/redux';
import { useEffect } from 'react';
import { ProductCard } from '~/components';
import { getBookDetailsRoute } from '~/config/routes';
import './BookListContainer.scss';
import localizations from '~/constants/locallizations';
export default function BookListContainer() {
    const dispatch = useDispatch();
    const { GetAllBooks } = bindActionCreators(actionCreators, dispatch);
    const books = useAppSelector((state) => state.bookDetailsReducer.books);
    useEffect(() => {
            GetAllBooks();
    }, []);
    return (
        <div className='book-list-container'>
            <h3 className='book-list-container__title'>{localizations.bookList}</h3>
            <div className="search-result-container">
                {books.map((book) => {
                    return (
                        <div className="search-result-container-item" key={book.id}>
                            <ProductCard
                                url={book.bookImages[0].url}
                                title={book.title}
                                author={book.author.name}
                                to={getBookDetailsRoute(book.id)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
