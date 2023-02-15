import { Button } from '~/components';
import './Modal.scss';

interface ModelParams {
    title: string;
    content: string;
    showModal: boolean;
    setShowModal: any;
}

function Modal(props: ModelParams) {
    return (
        <div className={`modal-overlay ${!props.showModal ? 'hidden' : ''}`}>
            <div className='modal-body'>
                <div className='modal-header'>
                    <h3 className='modal-header__header'>{props.title}</h3>
                    <span className='modal-header__exit' onClick={(e) => {
                        props.setShowModal(false)
                    }}>x</span>
                </div>
                <div className='modal-middle'>
                    <span className='modal-body__text'>
                        {props.content}
                    </span>
                </div>
                <div className='modal-options'>
                    <div>
                        <Button onClick={(e: any) => {
                                props.setShowModal(false)
                            }}>
                            <span>
                                Close
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
