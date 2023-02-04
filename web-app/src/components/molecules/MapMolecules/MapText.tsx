import React, { useState } from "react";

function MapText() {
    const [lapsLeft, setLapsLeft] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    return (
        <>
            <div className="w-full text-center mt-1">
                <div className="grid grid-cols-2">
                    <div className="grid col-span-1">
                        <p>Laps Left: {lapsLeft}</p>
                    </div>
                    <div className="grid col-span-1">
                        <p>Time Left: {timeLeft}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MapText;
