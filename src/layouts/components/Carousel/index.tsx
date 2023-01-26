import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Button, Description } from '~/components';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { ButtonTypes } from '~/constants/enums';
import './Carousel.scss';
function Slider() {
    const [index, setIndex] = useState(0);
    const maxIndex = 2;

    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    const handleNextSlide = () => {
        if (index < 2) {
            setIndex((prevIndex) => prevIndex + 1);
            return;
        }
        setIndex(0);
    };

    const handlePrevSlide = () => {
        if (index > 0) {
            setIndex((prevIndex) => prevIndex - 1);
            return;
        }
        setIndex(maxIndex);
    };

    return (
        <div className="slider">
            <Carousel
                className="slider-container"
                activeIndex={index}
                onSelect={handleSelect}
                interval={null}
                indicators={false}
            >
                <Carousel.Item className="slider-items">
                    <img
                        className="d-block w-100 slider-items__img"
                        src="https://assets.brightspot.abebooks.a2z.com/dims4/default/3343909/2147483647/strip/true/crop/1580x760+0+0/resize/998x480!/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.amazonaws.com%2F40%2F2a%2F68308451421b8d4f1d29cd4d7049%2Fbest-books-2022-carousel.png"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item className="slider-items">
                    <img
                        className="d-block w-100 slider-items__img"
                        src="https://assets.brightspot.abebooks.a2z.com/dims4/default/3343909/2147483647/strip/true/crop/1580x760+0+0/resize/998x480!/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.amazonaws.com%2F40%2F2a%2F68308451421b8d4f1d29cd4d7049%2Fbest-books-2022-carousel.png"
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item className="slider-items">
                    <img
                        className="d-block w-100 slider-items__img"
                        src="https://assets.brightspot.abebooks.a2z.com/dims4/default/3343909/2147483647/strip/true/crop/1580x760+0+0/resize/998x480!/quality/90/?url=http%3A%2F%2Fabebooks-brightspot.s3.amazonaws.com%2F40%2F2a%2F68308451421b8d4f1d29cd4d7049%2Fbest-books-2022-carousel.png"
                        alt="First slide"
                    />
                </Carousel.Item>
            </Carousel>
            <div className="slider-description">
                <Description
                    title="Best buys on new books"
                    content="The latest generation of authors continues to influence literature by writing from a greater number of viewpoints. Enjoy our selection of the best fiction and non-fiction books from 2022."
                    textLink="See the books"
                    linkTo="https://www.abebooks.com/"
                />
            </div>
            <div className="slider__prev-button">
                <Button type={ButtonTypes.NEXT_SLIDER} onClick={handlePrevSlide}>
                    <AiOutlineLeft />
                </Button>
            </div>
            <div className="slider__next-button">
                <Button type={ButtonTypes.NEXT_SLIDER} onClick={handleNextSlide}>
                    <AiOutlineRight />
                </Button>
            </div>
        </div>
    );
}

export default Slider;
