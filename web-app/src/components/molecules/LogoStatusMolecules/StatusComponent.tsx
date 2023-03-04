import React from "react";

function StatusComponent() {
  return (
    <div className="grid m-auto ml-0">
      <h5 className="pb-1 text-text-gray dark:text-text-gray-dark">
        LAST PACKET
      </h5>
      <h5 className="text-text-gray  dark:text-text-gray-dark underline underline-offset-8 decoration-1 decoration-primary pb-3">
        Oct. 15 2022, 4:18.16pm
      </h5>
      <div className="grid grid-cols-2 gap-4 w-fit">
        <h5 className="text-text-gray dark:text-text-gray-dark">STATUS</h5>
        <div className="h-5 w-5 mt-1 rounded-full bg-green dark:bg-green-dark"></div>
      </div>
    </div>
  );
}

export default StatusComponent;
