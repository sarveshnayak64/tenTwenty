import React, { useState } from "react";

const CardAnimation = ({content = [], cardSliderIndex, setCardSliderIndex}) => {
    
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [updateOccurred, setUpdateOccurred] = useState(false);
    let margin = 150
    
    const handleDragStart = (e) => {
        setIsDragging(true);
        setUpdateOccurred(false);
        setStartX(e.clientX);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    //Handle drag event
    const handleDrag = (e) => {
        if (isDragging && !updateOccurred) {
            const currentX = e.clientX;
            const deltaX = currentX - startX;

            if (deltaX > 0) {
                setCardSliderIndex((prev) =>
                    prev > 0 && prev < content.length ? prev - 1 : prev
                );
                // Dragged to the right
            } else if (deltaX < 0) {
                setCardSliderIndex((prev) =>
                    prev >= 0 && prev < content.length-1 ? prev + 1 : prev
                );
                // Dragged to the left
            }
            setUpdateOccurred(true);
        }
    };
    return <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        className={`flex justify-center w-full max-h-1/2`}>
        {
            content.map((card, index) => (
                <div
                    key={index}
                    className={`lg:min-w-[33%] md:min-w-[40%] min-w-[70%] transition-all duration-1000`}
                    style={{
                        transform: index === cardSliderIndex
                            ? 'translateX(' + (margin - (100 * cardSliderIndex)) + '%)' // Centered slide
                            : index < cardSliderIndex
                                ? `translateX(${(margin - (100 * cardSliderIndex))}%)` // Slides to the left
                                : `translateX(${(margin - (100 * cardSliderIndex))}%)`, // Slides to the right
                    }}>
                    <img
                        onClick={() => setCardSliderIndex(index)}
                        src={card.imageUrl}
                        className={`h-max object-cover transition-all duration-1000 w-2/4 mx-auto ${index == cardSliderIndex ? ' -translate-y-4' :
                            index == cardSliderIndex - 1 ? '-rotate-[15deg]' :
                                index == cardSliderIndex + 1 && 'rotate-[15deg]'
                            } translate-y-10 slide`} />
                </div>
            ))
        }
    </div>;
};

export default CardAnimation;
