//import Features from '../components/features';

import React, { useRef } from "react";

import Features1 from '../components/feature1';
import Header1 from '../components/Header1';
import GallerySlider from '../components/GallerySlider';
import GallerySlider1 from '../components/GallerySlider1';
import Feedback from '../components/feedback';
import Searchvenues from '../components/searchvenues';





const Homepage = () => {
  const searchVenuesRef = useRef(null);
  const scrollToSearchVenues = () => {
    searchVenuesRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
  };

  return (
    <div>
      <Header1 onScrollToSearchVenues={scrollToSearchVenues} />
      <div ref={searchVenuesRef}> {/* Attach ref to Searchvenues */}
        <Searchvenues />
      </div>
      <Feedback />
      <Features1 />

      {/*<Features />*/}
      {/* <GallerySlider /> */}
      {/* <GallerySlider1 /> */}
    </div>
  );
};

export default Homepage;
