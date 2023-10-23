import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

import slider1Img from './assets/images/slider-1.webp'
import slider2Img from './assets/images/slider-2.webp'
import slider3Img from './assets/images/slider-3.webp'
import slider4Img from './assets/images/slider-4.webp'
import card1Img from './assets/images/card-1.webp'
import card2Img from './assets/images/card-2.webp'
import card3Img from './assets/images/card-3.webp'
import card4Img from './assets/images/card-4.webp'
import CustomMouseCursor from './components/CustomMouseCursor'
import CardAnimation from './components/CardAnimation'
import ImageSlider from './components/ImageSlider'


const sliderContent = [
  {
    "title": "Welcome to TenTwenty Farms",
    "subTitle": "From Out Farms to your Hands",
    "imageUrl": slider1Img
  },
  {
    "title": "Welcome to TenTwenty Farms",
    "subTitle": "The master's eye is the best fertilizer",
    "imageUrl": slider2Img
  },
  {
    "title": "Welcome to TenTwenty Farms",
    "subTitle": "To a farmer dirt is not a waste, it is wealth",
    "imageUrl": slider3Img
  },
  {
    "title": "Welcome to TenTwenty Farms",
    "subTitle": "Schrute Farms is very easy to finds",
    "imageUrl": slider4Img
  },
]

const cardSliderContent = [
  {
    "title": "Client1",
    "subTitle": "Dubai, United Arab Emirates",
    "imageUrl": card1Img
  },
  {
    "title": "Client2",
    "subTitle": "Goa, India",
    "imageUrl": card2Img
  },
  {
    "title": "Client3",
    "subTitle": "Pune, India",
    "imageUrl": card3Img
  },
  {
    "title": "Client4",
    "subTitle": "Beijing, China",
    "imageUrl": card4Img
  },
]


function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [cardSliderIndex, setCardSliderIndex] = useState(1)
  const sectionRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 50% of the section must be visible
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The section is now in view
          sectionRef.current.querySelector('h2').classList.add('opacity-100','scale-[1.2]');
          sectionRef.current.querySelector('span').classList.add('opacity-100','scale-[1.2]');
        } else {
          // The section is out of view
          sectionRef.current.querySelector('h2').classList.remove('opacity-100','scale-[1.2]');
          sectionRef.current.querySelector('span').classList.remove('opacity-100','scale-[1.2]');
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(sectionRef.current);

    // Clean up the observer when the component is unmounted
    return () => observer.disconnect();
  }, []);

  //Logic to hide or show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        setIsNavbarVisible(false);
      } else {
        // Scrolling up
        setIsNavbarVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);


  return (
    <>
      <Navbar visible={isNavbarVisible} />
      <div className='snap-y snap-mandatory flex flex-col justify-center'>
        <section className='snap-start'>
          <ImageSlider content={sliderContent} />
        </section>
        <section ref={sectionRef} className='bg-white h-screen text-center min-w-[99vw] overflow-hidden' onKeyDown={() => console.log('ssss')}>
          <div className='max-w-lg mx-auto my-12 '>
            <h2 className='text-4xl m-6 mt-[10vh] transition-all duration-500 ease-in opacity-0'>Quality Product</h2>
            <span className='transition-all duration-1000 ease-in opacity-0'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, pariatur. Quasi adipisci distinctio repellat quibusdam, similique, voluptas enim cupiditate odit aspernatur at tempore impedit error harum alias, repudiandae iure quas.</span>
          </div>


          <CustomMouseCursor cursorSize={20}>
            <CardAnimation content={cardSliderContent} cardSliderIndex={cardSliderIndex} setCardSliderIndex={setCardSliderIndex} />
          </CustomMouseCursor>

          <div className=''>
            <h2 className='text-xl font-bold'>{cardSliderContent[cardSliderIndex].title}</h2>
            <span>{cardSliderContent[cardSliderIndex].subTitle}</span>
          </div>
          
        </section>
      </div>
    </>
  )
}

export default App
