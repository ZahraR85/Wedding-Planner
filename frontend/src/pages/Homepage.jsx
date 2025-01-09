

import { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
// import { Chat, RequestForm } from "@/components";
import ChatApp from "../components/ChatApp";
import RequestForm from '../components/RequestForm';
import "react-toastify/dist/ReactToastify.css";
import Features1 from '../components/feature1';
import Header1 from '../components/Header1';
import Feedback from '../components/feedback';
import SearchVenues from "../components/SearchVenues.jsx";
import Staff from "../components/Staff";



const systemPrompt = "if you have question can ask here!";

const Homepage = () => {
  const searchVenuesRef = useRef(null);
  const chatRef = useRef(null);

  const scrollToSearchVenues = () => {
    searchVenuesRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
  };

  const [totalRequests, setTotalRequests] = useState(import.meta.env.VITE_MAX_REQUESTS || 5);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'system',
      content: systemPrompt
    }
  ]);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  return (
    <div>


      <Header1 onScrollToSearchVenues={scrollToSearchVenues} />
      <div ref={searchVenuesRef}>
        <SearchVenues />
      </div>
      <Feedback />
      <Features1 />
      <Staff />

      <div className='container mx-auto h-screen flex flex-col justify-around'>
        <ToastContainer theme='colored' autoClose={1000} />

        <ChatApp />

        {/* <div ref={chatRef} className='h-[75%] p-5 bg-base-200 rounded-lg shadow-md overflow-y-scroll'>
          <Chat messages={messages} />
        </div>
        <div className='h-[20%] p-5 bg-base-200 rounded-lg shadow-md'>
          <RequestForm
            messages={messages}
            setMessages={setMessages}
            totalRequests={totalRequests}
            setTotalRequests={setTotalRequests}
          />
        </div> */}
      </div>

    </div>
  );
};

export default Homepage;















// import { useEffect, useState, useRef } from "react";
// import Features1 from '../components/feature1';
// import Header1 from '../components/Header1';
// //import GallerySlider from '../components/GallerySlider';
// //import GallerySlider1 from '../components/GallerySlider1';
// import Feedback from '../components/feedback';
// import SearchVenues from "../components/SearchVenues.jsx";
// import Staff from "../components/Staff";





// import { ToastContainer } from 'react-toastify';
// import { Chat, RequestForm } from '@/components';
// import 'react-toastify/dist/ReactToastify.css';


// const systemPrompt =
//   'You are Gollum, from Lord of the Rings, you became a senior software engineer and are as helpful as you are annoying';


// const Homepage = () => {
//   const searchVenuesRef = useRef(null);
//   const chatRef = useRef(null);

//   const scrollToSearchVenues = () => {
//     searchVenuesRef.current.scrollIntoView({ behavior: "smooth" }); 



    
//     const [totalRequests, setTotalRequests] = useState(import.meta.env.VITE_MAX_REQUESTS || 5);
//     const [messages, setMessages] = useState([
//       {
//         id: 1,
//         role: 'system',
//         content: systemPrompt
//       }
//     ]);
  
//     useEffect(() => {
//       chatRef.current.scrollTo({
//         top: chatRef.current.scrollHeight,
//         behavior: 'smooth'
//       });
//     }, [messages]);
//   };

//   return (
//     <div>

//       <div className='container mx-auto h-screen flex flex-col justify-around'>
//         <ToastContainer theme='colored' autoClose={1000} />
//         <div ref={chatRef} className='h-[75%] p-5 bg-base-200 rounded-lg shadow-md overflow-y-scroll'>
//           <Chat messages={messages} />
//         </div>
//         <div className='h-[20%] p-5 bg-base-200 rounded-lg shadow-md'>
//           <RequestForm
//             messages={messages}
//             setMessages={setMessages}
//             totalRequests={totalRequests}
//             setTotalRequests={setTotalRequests}
//           />
//         </div>
//       </div>



//       <Header1 onScrollToSearchVenues={scrollToSearchVenues} />
//       <div ref={searchVenuesRef} > {/* Attach ref to SearchVenues */}
//         <SearchVenues />
//       </div>
//       <Feedback />
//       <Features1 />
//       <Staff />
//       {/*<Features />*/}
//       {/* <GallerySlider /> */}
//       {/* <GallerySlider1 /> */}






//     </div>
//   );
// };

// export default Homepage;
