

import React, { useState, useEffect } from 'react';

const Countdown = ({ weddingDate }) => {
  const calculateTimeLeft = () => {
    const targetDate = new Date(weddingDate); // Use weddingDate from props
    const now = new Date();
    const difference = targetDate - now;
    console.log("tariiikh:",weddingDate);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }; // Default when countdown ends
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [weddingDate]);

  if (!weddingDate) return <p>Wedding date not set!</p>; // Handle missing weddingDate

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Countdown to Wedding</h1>
      <div className="flex justify-center gap-4">
        <div className="p-4 bg-gray-200 rounded text-center w-24">
          <span className="text-4xl font-semibold block">{timeLeft.days ?? '00'}</span>
          <p className="text-xl block">Days</p>
        </div>
        <div className="p-4 bg-gray-200 rounded text-center w-24">
          <span className="text-4xl font-semibold block">{timeLeft.hours ?? '00'}</span>
          <p className="text-xl block">Hours</p>
        </div>
        <div className="p-4 bg-gray-200 rounded text-center w-24">
          <span className="text-4xl font-semibold block">{timeLeft.minutes ?? '00'}</span>
          <p className="text-xl block">Minutes</p>
        </div>
        <div className="p-4 bg-gray-200 rounded text-center w-24">
          <span className="text-4xl font-semibold block">{timeLeft.seconds ?? '00'}</span>
          <p className="text-xl block">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
