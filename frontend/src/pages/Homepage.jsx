import { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Features2 from '../components/Feature2';
import Header1 from '../components/Header1';
import Feedback from '../components/feedback';
import SearchVenue from "../components/SearchVenue.jsx";
import Staff from "../components/Staff";

const Homepage = () => {
  const searchVenuesRef = useRef(null);

  const scrollToSearchVenues = () => {
    searchVenuesRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
  };
  return (
    <div>
      <Header1 onScrollToSearchVenues={scrollToSearchVenues} />
      <div ref={searchVenuesRef}>
        <SearchVenue />
      </div>
      <Feedback />
      <Features2 />
      <Staff />
      <ToastContainer />
      
    </div>
  );
};

export default Homepage;























    
