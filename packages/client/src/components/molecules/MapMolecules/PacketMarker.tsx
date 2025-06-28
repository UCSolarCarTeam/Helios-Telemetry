import { JSX } from "react";
import { Marker, Popup } from "react-map-gl";

import { FiberManualRecordOutlined } from "@mui/icons-material";

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
        <FiberManualRecordOutlined
          height={30}
          onMouseEnter={() => onMouseEnterDataPoint(index)}
          onMouseLeave={() => onMouseLeaveDataPoint(index)}
        />
      </Marker>
    </>
  );
}
