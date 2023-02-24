import { useMemo } from 'react';

type ReviewContainerProps = {
    title: string;
    content: object;
};

export default function Review({ title, content }: ReviewContainerProps) {
    const keys = useMemo(() => Object.keys(content), []);

    return (
        <div className="review">
            <h3 className="review__title">{title}</h3>
            <div className="review-content"></div>
        </div>
    );
}
