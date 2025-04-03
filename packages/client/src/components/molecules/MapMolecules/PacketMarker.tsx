import { JSX } from "react";
import { Marker, Popup } from "react-map-gl";

import CircleIcon from "@mui/icons-material/Circle";

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
      <Marker
        latitude={packetMarker.markerCoords.latitude}
        longitude={packetMarker.markerCoords.longitude}
      >
        <CircleIcon
          onMouseEnter={() => onMouseEnterDataPoint(index)}
          onMouseLeave={() => onMouseLeaveDataPoint(index)}
          sx={{ fontSize: "8px" }}
        />
      </Marker>
    </>
  );
}
