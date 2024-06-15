import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

import { type SvgProps } from "@/components/atoms/SVGProps";

const LatencyDotsIcon = (props: SvgProps) => {
  const { color, height, width, latency, isConnected } = props;
  return (
    <div className="flex flex-col items-center">
      <p
        className={twMerge(
          "w-6 text-xs",
          isConnected ? "text-green" : "text-helios",
        )}
      >
        {Math.ceil(latency ?? 0)}ms
      </p>
      <div className="flex size-6 items-center justify-center">
        {isConnected ? (
          <svg
            fill={color}
            width={width}
            height={height}
            viewBox="0 0 32 32"
            enableBackground="new 0 0 32 32"
            id="Glyph"
            version="1.1"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M16,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S17.654,13,16,13z"
              id="XMLID_287_"
            />
            <path
              d="M6,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S7.654,13,6,13z"
              id="XMLID_289_"
            />
            <path
              d="M26,13c-1.654,0-3,1.346-3,3s1.346,3,3,3s3-1.346,3-3S27.654,13,26,13z"
              id="XMLID_291_"
            />
          </svg>
        ) : (
          <div className=" m-auto ">
            <IoClose color={"#9C0534"} size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LatencyDotsIcon;
