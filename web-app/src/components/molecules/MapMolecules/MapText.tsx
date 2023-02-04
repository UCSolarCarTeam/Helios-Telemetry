import React from "react";

function MapText() {
  const lapsLeft = 0;
  const timeLeft = 0;
  return (
    <>
      <div className="w-full text-center mt-1">
        <div className="grid grid-cols-2">
          <div className="grid col-span-1 text-primary-text dark:text-primary-text-dark">
            <p>Laps Left: {lapsLeft}</p>
          </div>
          <div className="grid col-span-1 text-primary-text dark:text-primary-text-dark">
            <p>Time Left: {timeLeft}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapText;
