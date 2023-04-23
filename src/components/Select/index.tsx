import './Select.scss';

export interface SelectItem {
    id: any;
    value: string;
}

export default function Select({ label, isRequired, items, selectType, isValid = true, errorMessage, ...props }: any) {
    return (
        <div className="select display-flex flex-direction--column">
            {label && (
                <label className="select__label">
                    {label}
                    {isRequired ? <span className="select__label--required">*</span> : null}
                </label>
            )}
            <select
                className={
                    `${selectType ? `select__content--${selectType} select__content` : 'select__content'}` +
                    `${!isValid ? ' select__content--invalid' : ''}`
                }
                {...props}
            >
                <option value=''></option>
                {items &&
                    items.length > 0 &&
                    items.map((item: any, index: any) => {
                        return (
                            <option key={index} value={item.id}>
                                {item.value}
                            </option>
                        );
                    })}
            </select>
            {
                !isValid &&
                <div className='input-container-error'>
                    <span className='input-container-error__message'>
                        {errorMessage}
                    </span>
                </div>
            }
        </div>
    );
}
