import './InputTextArea.scss';

export default function InputTextArea({...props}) {
    return (
        <div className='input-text-area'>
            <textarea className='input-text-area__input' {...props}></textarea>
        </div>
    )
}