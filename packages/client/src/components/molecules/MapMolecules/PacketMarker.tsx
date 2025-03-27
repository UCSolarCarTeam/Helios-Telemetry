import type { FeatureCollection } from "geojson";
import { JSX } from "react";
import { Layer, LayerProps, Marker, Popup, Source } from "react-map-gl";

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

  const geojson: FeatureCollection = {
    features: [
      {
        geometry: {
          coordinates: [
            packetMarker.markerCoords.longitude,
            packetMarker.markerCoords.latitude,
          ],
          type: "Point",
        },
        properties: { title: "Finish Line !!!" },
        type: "Feature",
      },
    ],
    type: "FeatureCollection",
  };

  const layerStyle: LayerProps = {
    id: "finish-line",
    paint: {
      "circle-color": "#B94A6C",
      "circle-opacity": 0.8,
      "circle-radius": 20,
      "circle-stroke-color": "#9C0534",
      "circle-stroke-width": 2,
    },
    type: "circle",
  };

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
      <Source data={geojson} id="finish-line-source" type="geojson">
        <Layer {...layerStyle} />
      </Source>
    </>
  );
}
