import './Select.scss';

// interface SelectProps {
//     label: string;
//     isRequired: boolean;
//     items: Array<SelectItem>;
//     props: any;
// }

export interface SelectItem {
    id: any;
    value: string;
}

export default function Select({ label, isRequired, items, ...props }: any) {
    return (
        <div className="select display-flex flex-direction--column">
            <label className="select__label">
                {label}
                {isRequired ? <span className="select__label--required">*</span> : null}
            </label>
            <select className="select__content" {...props}>
                {items.length > 0 &&
                    items.map((item: any, index: any) => {
                        return (
                            <option key={index} value={item.id}>
                                {item.value}
                            </option>
                        );
                    })}
            </select>
        </div>
    );
}
