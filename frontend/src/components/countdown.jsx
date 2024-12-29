

import React, { useState, useEffect } from 'react';

const Countdown = ({ weddingDate }) => {
  const calculateTimeLeft = () => {
    const targetDate = new Date(weddingDate); // Use weddingDate from props
    const now = new Date();
    const difference = targetDate - now;
    console.log("tariiikh:", weddingDate);
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
      <h1 className="text-3xl font-bold text-center mb-6">The Countdown to Us</h1>
      <div className="flex justify-center gap-4">

        <div className="relative p-4 rounded-lg w-24 h-24 bg-gradient-to-b from-gray-100 to-gray-200 shadow-md text-center">
          <span className="text-5xl font-bold text-gray-400 drop-shadow-md tracking-widest">
            {timeLeft.days ?? '00'}
          </span>
          <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">
            Days
          </p>
        </div>

        <div className="relative p-4 rounded-lg w-24 h-24 bg-gradient-to-b from-gray-100 to-gray-200 shadow-md text-center">
          <span className="text-5xl font-bold text-gray-400 drop-shadow-md tracking-widest">{timeLeft.hours ?? '00'}</span>
          <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Hours</p>
        </div>
        <div className="relative p-4 rounded-lg w-24 h-24 bg-gradient-to-b from-gray-100 to-gray-200 shadow-md text-center">
          <span className="text-5xl font-bold text-gray-400 drop-shadow-md tracking-widest">{timeLeft.minutes ?? '00'}</span>
          <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Minutes</p>
        </div>
        <div className="relative p-4 rounded-lg w-24 h-24 bg-gradient-to-b from-gray-100 to-gray-200 shadow-md text-center">
          <span className="text-5xl font-bold text-gray-400 drop-shadow-md tracking-widest">{timeLeft.seconds ?? '00'}</span>
          <p className="text-sm text-gray-500 uppercase tracking-wider mt-1">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
