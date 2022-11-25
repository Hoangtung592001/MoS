import './Input.scss';

interface InputProps {
    placeholder: string
}

function Input({ placeholder }: InputProps) {
    return(
        <input type="text" className='input' placeholder={placeholder}/>
    )
}

export default Input;
