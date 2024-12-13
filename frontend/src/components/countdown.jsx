import React, { useState, useEffect } from 'react';

const Countdown = () => {
  // Function to calculate the remaining time
  const calculateTimeLeft = () => {
    const targetDate = new Date('2024-12-21T20:00:00'); // Target date
    const now = new Date();
    const difference = targetDate - now;

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

  // State for the remaining time
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Effect to update the countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      console.log('Updated TimeLeft:', newTimeLeft); // Debugging the updated state
      setTimeLeft(newTimeLeft); // Update state
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, []);

  // Debugging the current state being rendered
  console.log('Rendered TimeLeft State:', timeLeft);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Countdown to 21/12/2024 20:00</h1>
      <div className="flex justify-center gap-4">
        {/* Days */}
        <div className="p-4 bg-gray-200 rounded text-center w-24">
          <span className="text-4xl font-semibold block">{timeLeft.days ?? '00'}</span>
          <p className="text-xl block">Days</p>
        </div>
        {/* Hours */}
        <div className="p-4 bg-gray-200 rounded text-center w-24">
          <span className="text-4xl font-semibold block">{timeLeft.hours ?? '00'}</span>
          <p className="text-xl block">Hours</p>
        </div>
        {/* Minutes */}
        <div className="p-4 bg-gray-200 rounded text-center w-24">
          <span className="text-4xl font-semibold block">{timeLeft.minutes ?? '00'}</span>
          <p className="text-xl block">Minutes</p>
        </div>
        {/* Seconds */}
        <div className="p-4 bg-gray-200 rounded text-center w-24">
          <span className="text-4xl font-semibold block">{timeLeft.seconds ?? '00'}</span>
          <p className="text-xl block">Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
