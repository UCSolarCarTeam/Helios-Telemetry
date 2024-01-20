import React from "react";

function GearParkBrakeComponent(props: any) {
  enum gear {
    park,
    reverse,
    neutral,
    drive,
  }
  let g: gear = gear.drive;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="grid grid-flow-col grid-rows-4 space-y-1 pt-8 text-xl">
          <div>
            <h1 className={g.valueOf() == gear.park ? "text-zesty" : ""}>P</h1>
          </div>
          <div>
            <h1 className={g.valueOf() == gear.reverse ? "text-zesty" : ""}>
              R
            </h1>
          </div>
          <div>
            <h1 className={g.valueOf() == gear.neutral ? "text-zesty" : ""}>
              N
            </h1>
          </div>
          <div>
            <h1 className={g.valueOf() == gear.drive ? "text-zesty" : ""}>D</h1>
          </div>
        </div>

        <div className="grid grid-rows-1 gap-4">
          <div className="row-start-4 row-end-4">
            <img width={30} height={30} src="/assets/warning.svg" />
          </div>
        </div>
      </div>
    </>
  );
}
export default GearParkBrakeComponent;
