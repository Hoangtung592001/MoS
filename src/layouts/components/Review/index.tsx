import { useMemo } from 'react';
import './Review.scss';
type ReviewContainerProps = {
    title: string;
    content: object;
};

export default function Review({ title, content }: ReviewContainerProps) {
    function isValidCodon(value: string): value is keyof typeof content {
        return value in content;
    }

    function isValidSequence(values: string[]): values is Array<keyof typeof content> {
        return values.every(isValidCodon);
    }

    const keys = useMemo(() => Object.keys(content), []);

    if (!isValidSequence(keys)) {
        throw Error('invalid sequence');
    }

    return (
        <div className="review">
            <h3 className="review__title">{title}</h3>
            <div className="review-content">
                {keys.map((key, index) => {
                    if (Object.keys(content[key]).length == 0) {
                        return (
                            <span key={index} className="review-content__element">
                                {key}: {content[key]}
                            </span>
                        );
                    }
                })}
            </div>
        </div>
    );
}
