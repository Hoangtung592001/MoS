import './Checkbox.scss';

interface CheckboxProps {
    text: string;
}

export default function Checkbox({ text }: CheckboxProps) {
    return (
        <div className='checkbox display-flex'>
            <input type="checkbox" className='checkbox__input'/>
            <span className='checkbox__text'>{text}</span>
        </div>
    )
}