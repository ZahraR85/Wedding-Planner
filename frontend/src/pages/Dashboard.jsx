import React from 'react';
import Countdown from '../components/countdown';
import Music from '../components/music';
import MakeupUser from '../components/makeupUser';


const Dashboard = () => {
  return (
<div className="flex flex-col md:flex-row gap-4 p-4"> <div className="w-full md:w-1/2 flex flex-col gap-4"> 
<div className="bg-blue-100 p-4 rounded shadow"> 
  <Countdown />
   </div> <div className="bg-green-100 p-4 rounded shadow"> <Music />
    </div> 
    </div> 
    <div className="w-full md:w-1/2 bg-yellow-100 p-4 rounded shadow">
     <MakeupUser /> 
     </div>
     </div>
  );
};
export default Dashboard