import { useEffect, useRef, useState } from "react";
import '../App.css'

const ImageSlider = ({ content = [] }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hideText, setHideText] = useState(true);
    const intervalIdRef = useRef(null);

    // Function to iterate to the next Slide
    const incrementSlider = () => {
        clearInterval(intervalIdRef.current);
        setActiveIndex((prev) => (prev < 3 ? prev + 1 : 0));
        startInterval();
    };

    // Function to show and hide text
    const showText = () => {
        setHideText(false);
        setTimeout(() => {
            setHideText(true);
        }, 2500);
    };

    // Function to get the previous index
    const getPrevIndex = () => {
        if (activeIndex === 0) {
            return content.length - 1;
        }
        return activeIndex - 1;
    };

    // Function to start the interval
    const startInterval = () => {
        intervalIdRef.current = setInterval(() => {
            incrementSlider();
        }, 3000);
    };

    //Runs everytime the activeIndex changes
    useEffect(() => {
        showText();
        startInterval();
        return () => clearInterval(intervalIdRef.current);
    }, [activeIndex]);

    return <div className='bg-white h-screen min-w-[99vw] relative text-white' onClick={() => incrementSlider()}>

        <div className={`absolute top-[40%] left-[10%] lg:w-[50%] md:w-[60%] w-[90%] z-30 transition-all duration-500 ease-in ${!hideText ? ' scale-[1] opacity-100' : ' scale-[0.6] opacity-0'}`}>
            <h3>
                {content[activeIndex].title}
            </h3>
            <h2 className='lg:text-6xl md:text-6xl text-5xl mt-4 transition-all duration-100'>
                {content[activeIndex].subTitle}
            </h2>
        </div>
        <div className='absolute bottom-10 left-[10%] flex items-center gap-4  z-30'>
            <div className="h-28 w-28 border-2 border-white flex justify-center items-center relative">

                <div className='relative h-20 w-20 bg-blue-300 flex justify-center items-center'>
                    <span className='z-10'>Next</span>
                    <img loading="lazy" src={content[(activeIndex + 1) == content.length ? 0 : activeIndex + 1].imageUrl} className='absolute h-20 w-20' />
                </div>
                <svg
                    key={activeIndex}
                 className="absolute -top-4 -left-4 w-28 h-28 m-2 overflow-visible" xmlns="http://www.w3.org/2000/svg">
                    <rect className="stroke-white fill-transparent" x="5" y="5" height="100%" width="100%" strokeWidth="8" />
                </svg>

            </div>
            <div className='flex items-center gap-4'>
                <span>{"0" + (activeIndex + 1)}</span>
                <div className="border-b border-solid border-t-2 border-gray-300 min-w-[6em] h-px"></div>
                <span>{"0" + (content.length)}</span>
            </div>
        </div>
        <div className=''>
            {content.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all ease-in-out ${index == getPrevIndex() ? 'scale-[1] z-10' :
                        index != activeIndex ? 'inset-y-full scale-[0.7]' :
                            index == activeIndex && ' duration-1000 inset-y-0 scale-[1] z-20'}`}>
                    <img loading="lazy" src={slide.imageUrl} alt={`Slide`} className='h-full w-full object-cover' />
                </div>
            ))}
        </div>
    </div>;
};

export default ImageSlider;
