import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useAppSelector } from '~/hooks';
import actionCreators from '~/redux';
import { useEffect } from 'react';
import { ProductCard } from '~/components';
import routes, { getBookDetailsRoute } from '~/config/routes';
import './SearchResultContainer.scss';
export default function SearchResultContainer() {
    const { title } = useParams();
    const dispatch = useDispatch();
    const { searchWholeBook } = bindActionCreators(actionCreators, dispatch);
    const wholeBooks = useAppSelector((state) => state.searchBookReducer.wholeBooks);
    const navigate = useNavigate();
    useEffect(() => {
        if (title) {
            searchWholeBook(title);
        } else {
            navigate(routes.home);
        }
    }, [title]);
    return (
        <div className="search-result-container">
            {wholeBooks.map((wholeBook) => {
                return (
                    <div className="search-result-container-item" key={wholeBook.id}>
                        <ProductCard
                            url={wholeBook.url}
                            title={wholeBook.title}
                            author={wholeBook.author}
                            to={getBookDetailsRoute(wholeBook.id)}
                        />
                    </div>
                );
            })}
        </div>
    );
}
