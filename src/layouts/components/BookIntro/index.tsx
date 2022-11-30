import { Rating } from '~/components';
import './BookIntro.scss';
import localizations from '~/constants/locallizations';
import { Button } from '~/components';
export default function BookIntro() {
    return (
        <div className="book-intro display-flex">
            <div>
                <img src="https://pictures.abebooks.com/isbn/9781411423411-us.jpg" alt="Book Image" />
            </div>
            <div>
                <h4>How to Write a Research Paper [Paperback] sparknotes-editors</h4>
                <h4>UNITED STATES NAVAL ACADEMY</h4>
                <Rating stars={3.5}/>
                <span>{localizations.publishedBy} Sparknotes, 1963</span>
                <div>
                    <Button>
                        <span>
                            NEW
                        </span>
                    </Button>
                    <Button>
                        <span>
                            CONDITION: NEW
                        </span>
                    </Button>
                    <Button>
                        <span>
                            SOFT COVER
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    )
}