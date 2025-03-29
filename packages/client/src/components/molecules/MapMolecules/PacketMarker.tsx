import { JSX } from "react";
import { Marker, Popup } from "react-map-gl";

import SportsScoreIcon from "@mui/icons-material/SportsScore";

import type { PacketMarkerData } from "./Map";

export default function PacketMarker(props: {
  packetMarker: PacketMarkerData;
  index: number;
  setDataPoints: React.Dispatch<React.SetStateAction<PacketMarkerData[]>>;
  onMouseEnterDataPoint: (index: number) => void;
  onMouseLeaveDataPoint: (index: number) => void;
}): JSX.Element {
  const { index, onMouseEnterDataPoint, onMouseLeaveDataPoint, packetMarker } =
    props;
  const { data, markerCoords, open } = packetMarker;
  return (
    <>
      {open && <Popup {...markerCoords}>{data.TimeStamp}</Popup>}
      <Marker {...markerCoords}>
        <SportsScoreIcon
          height={50}
          onMouseEnter={() => onMouseEnterDataPoint(index)}
          onMouseLeave={() => onMouseLeaveDataPoint(index)}
        />
      </Marker>
    </>
  );
}
