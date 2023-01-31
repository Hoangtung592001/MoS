import './SearchAndCarousel.scss';
import localizations from '~/constants/locallizations';
import { ButtonLink, Input } from '~/components';
import { ButtonLinkTypes, InputTypes } from '~/constants/enums';
import Slider from '../Carousel';
export default function SearchAndCarousel() {
    return (
        <div className="search-and-carousel">
            <div className="search-form">
                <h4 className="search-form__info">{localizations.searchFormIntro}</h4>
                <h4 className="search-form__header">{localizations.searchFormHeader}</h4>
                <div className="search-form-container">
                    <div className="search-form-input">
                        <label htmlFor="" className="search-form-input__label">
                            {localizations.author}
                        </label>
                        <Input inputType={InputTypes.SEARCH_BY_FORM} placeholder={localizations.searchByAuthor} />
                    </div>
                    <div className="search-form-input">
                        <label htmlFor="" className="search-form-input__label">
                            {localizations.title}
                        </label>
                        <Input inputType={InputTypes.SEARCH_BY_FORM} placeholder={localizations.searchByTitle} />
                    </div>
                    <div className="search-form-input">
                        <label htmlFor="" className="search-form-input__label">
                            {localizations.keywordOrISBN}
                        </label>
                        <Input inputType={InputTypes.SEARCH_BY_FORM} placeholder={localizations.searchByKeywordOrISBN} />
                    </div>
                    <div className="search-form-submit">
                        <ButtonLink to="" type={ButtonLinkTypes.SECONDARY_BUTTON}>
                            <span className="search-form__submit-text">{localizations.search}</span>
                        </ButtonLink>
                    </div>
                </div>
            </div>
            <div className="carousel">
                <Slider />
            </div>
        </div>
    );
}
