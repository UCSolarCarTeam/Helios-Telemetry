import React from "react";

function MapText() {
  const lapsLeft = 0;
  const timeLeft = 0;
  return (
    <>
      <div className="mt-1 w-full text-center">
        <div className="grid grid-cols-2">
          <div className="col-span-1 grid">
            <p>Laps Left: {lapsLeft}</p>
          </div>
          <div className="col-span-1 grid">
            <p>Time Left: {timeLeft}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapText;
