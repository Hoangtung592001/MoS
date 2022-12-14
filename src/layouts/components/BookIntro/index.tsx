import { Rating } from '~/components';
import './BookIntro.scss';
import localizations from '~/constants/locallizations';
import { TextLink, TextBox } from '~/components';
import { TextLinkTypes } from '~/constants/enums';
export default function BookIntro() {
    return (
        <div className="book-intro display-flex">
            <div className="book-intro-image">
                <img src="https://pictures.abebooks.com/isbn/9781411423411-us.jpg" alt="Book Image" />
            </div>
            <div className="book-intro-details">
                <h4 className='book-intro-details__header'>How to Write a Research Paper [Paperback] sparknotes-editors</h4>
                <TextLink type={TextLinkTypes.BLUE}>
                    <span className="book-intro-details__text--grey">UNITED STATES NAVAL ACADEMY</span>
                </TextLink>
                <Rating stars={3.5} />
                <span className='book-intro-details__text--plain'>{localizations.publishedBy} Sparknotes, 1963</span>
                <div className="display-flex book-intro-details-characteristics">
                    <div className="book-intro-details-characteristic">
                        <TextBox text="NEW" />
                    </div>
                    <div className="book-intro-details-characteristic">
                        <TextBox text="CONDITION: NEW" />
                    </div>
                    <div className="book-intro-details-characteristic">
                        <TextBox text="SOFT COVER" />
                    </div>
                </div>
                <div className='book-intro-details-later'>
                    <TextLink type={TextLinkTypes.BLUE}>
                        <span className='book-intro-details-later__text'>{localizations.saveForLater}</span>
                    </TextLink>
                </div>
                <div className='book-intro-details-seller'>
                    <div>
                        <span className='book-intro-details-seller__location'>{localizations.from}</span>
                        <TextLink type={TextLinkTypes.BLUE}>
                            <span>BennettBooksLtd (LOS ANGELES, CA, U.S.A.)</span>
                        </TextLink>
                    </div>
                    <div className='book-intro-details-seller-time-start display-flex align-items--center'>
                        <span>
                            MoSBooks Seller Since
                        </span>
                        <span className='book-intro-details__text--plain'>
                            April 17, 2008
                        </span>
                    </div>
                    <span className='book-intro-details__text--plain'>{localizations.quantity}: 1</span>
                </div>
            </div>
        </div>
    );
}
