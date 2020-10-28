import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function HomeCarousel() {
  return (
    <Carousel
      infiniteLoop={true}
      showThumbs={false}
      swipeable={true}
      stopOnHover={false}
      autoPlay={true}
      showStatus={false}
      >
      <div>
        <img src='/images/banner2.jpg'
          alt="banner 1" />
        {/* <p className='legend'>Legend 1</p> */}
      </div>
      <div>
        <img src='/images/banner4.jpg'
          alt="banner 2" />
        {/* <p className='legend'>Legend 2</p> */}
      </div>
      <div>
        <img src='/images/banner7.jpg'
          alt="banner 3" />
        {/* <p className='legend'>Legend 3</p> */}
      </div>
    </Carousel>
  )
}

export default HomeCarousel;
