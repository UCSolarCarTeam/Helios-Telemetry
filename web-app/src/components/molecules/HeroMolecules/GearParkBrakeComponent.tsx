import React from "react";
import { ReactComponent as Logo } from "./../../../assets/warning.svg";
//<img src={imageToAdd} alt="explanation-mark" />

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
      <div className="flex items-center flex-col">
        <div className="grid grid-rows-4 grid-flow-col pt-8 text-xl space-y-1">
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
            <Logo fill="#444444" width={30} height={30} className=""></Logo>
          </div>
        </div>
      </div>
    </>
  );
}
export default GearParkBrakeComponent;
