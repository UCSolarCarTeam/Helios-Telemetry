import type { FeatureCollection, LineString } from "geojson";
import { LineLayerSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { type JSX, useCallback, useEffect, useRef, useState } from "react";
import ReactMapGL, {
  Layer,
  LayerProps,
  type MapLib,
  MapRef,
  Marker,
  Popup,
  Source,
  SourceProps,
  ViewState,
} from "react-map-gl";

import HeliosModel from "@/assets/HeliosBirdseye.png";
import { useAppState } from "@/contexts/AppStateContext";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import type { Coords, ITelemetryData } from "@shared/helios-types";

import { fakeData } from "../PlaybackMolecules/fakedata";
import { GEO_DATA } from "./ExampleCoordinates";
import { mapCameraControls } from "./MapControls";
import MapControls from "./MapControls";
import PacketMarker from "./PacketMarker";

const { calculateBearing, distance, fitBounds, isOutsideBounds, lerp } =
  mapCameraControls;
// @ts-expect-error:next-line
type MapLibType = MapLib<mapboxgl.Map>;
export type MapStates = {
  centered: boolean;
  currentCarLocation: Coords;
  satelliteMode: boolean;
};
export type TrackList = {
  layerProps: LayerProps & Partial<LineLayerSpecification>;
  sourceProps: SourceProps & {
    data: FeatureCollection<LineString>;
  };
  trackName: string;
};
if (!process.env.NEXT_PUBLIC_MAPSAPIKEY)
  throw new Error("Missing NEXT_PUBLIC_MAPSAPIKEY ");
const {
  raceTrackGeoJSON_CORVETTE_RACE_LOOP,
  raceTrackGeoJSON_GRAND_FULL_COURSE,
  raceTrackGeoJSON_GRAND_MAX_STRAIGHT,
} = GEO_DATA;
const trackLayerStyle: LayerProps = {
  layout: {
    "line-cap": "round",
    "line-join": "round",
  },
  paint: {
    "line-color": "#ff0000", // Red color for the track
    "line-width": 4, // Thickness of the track
  },
  type: "line",
};

const trackList: TrackList[] = [
  {
    layerProps: {
      ...trackLayerStyle,
      paint: { ...trackLayerStyle.paint, "line-color": "#ff0000" },
    },
    sourceProps: {
      data: raceTrackGeoJSON_CORVETTE_RACE_LOOP,
      id: "layer1",
      type: "geojson",
    },
    trackName: "Corvette Race Loop",
  },
  {
    layerProps: {
      ...trackLayerStyle,
      paint: { ...trackLayerStyle.paint, "line-color": "#0f00ff" },
    },
    sourceProps: {
      data: raceTrackGeoJSON_GRAND_FULL_COURSE,
      id: "layer2",
      type: "geojson",
    },
    trackName: "Grand Full Course",
  },
  {
    layerProps: {
      ...trackLayerStyle,
      paint: { ...trackLayerStyle.paint, "line-color": "#ff00ff" },
    },
    sourceProps: {
      data: raceTrackGeoJSON_GRAND_MAX_STRAIGHT,
      id: "layer3",
      type: "geojson",
    },
    trackName: "Grand Max Straight",
  },
] as const;
export type PacketMarker = {
  data: ITelemetryData;
  markerCoords: {
    latitude: number;
    longitude: number;
  };
  open: boolean;
};
export default function Map({
  carLocation,
  lapLocation,
}: {
  carLocation: Coords;
  lapLocation: Coords;
}): JSX.Element {
  const {
    currentAppState: { darkMode },
  } = useAppState();
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    latitude: carLocation.lat,
    longitude: carLocation.long,
    zoom: 14,
  });
  const [mapStates, setMapStates] = useState({
    centered: false,
    currentCarLocation: carLocation,
    satelliteMode: false,
  });
  const [popupOpen, setPopupOpen] = useState(true);
  const [viewTracks, setViewTracks] = useState(trackList.map(() => true));
  const [dataPoints, setDataPoints] = useState<PacketMarker[]>(
    fakeData.map((data) => ({
      data,
      markerCoords: {
        latitude: data.Telemetry.GpsLatitude,
        longitude: data.Telemetry.GpsLongitude,
      },
      open: false,
    })),
  );
  const mapRef = useRef<MapRef | undefined>(undefined);
  useEffect(() => {
    let animationFrameId: number;
    const animateCarMarker = () => {
      setMapStates((prevMapStates) => {
        const time = 0.01;
        const newLat = lerp(
          prevMapStates.currentCarLocation.lat,
          carLocation.lat,
          time,
        );
        const newLng = lerp(
          prevMapStates.currentCarLocation.long,
          carLocation.long,
          time,
        );
        return {
          ...prevMapStates,
          currentCarLocation: { lat: newLat, long: newLng },
        };
      });
      animationFrameId = requestAnimationFrame(animateCarMarker);
    };
    animateCarMarker();
    return () => cancelAnimationFrame(animationFrameId);
  }, [carLocation]);

  useEffect(() => {
    const coordinates: Coords[] = [carLocation, carLocation, lapLocation];
    if (!mapRef.current) return;
    const map = mapRef.current;
    if (isOutsideBounds(map, coordinates) && !mapStates.centered) {
      fitBounds(map, carLocation, lapLocation);
    } else if (mapStates.centered) {
      const dist = distance(
        carLocation.lat,
        carLocation.long,
        map.getCenter().lat,
        map.getCenter().lng,
      );
      const speedFactor = 80;
      map.flyTo({
        center: [carLocation.long, carLocation.lat],
        curve: 1, // Adjust the curve of the animation
        easing: (t) => t, // Easing function for the animation
        speed: speedFactor * dist,
        zoom: 16,
      });
    }
  }, [carLocation, lapLocation, mapStates.centered]);

  const toggleMapStyle = useCallback(() => {
    setMapStates((prev) => ({ ...prev, satelliteMode: !prev.satelliteMode }));
  }, [setMapStates]);

  const toggleCentred = useCallback(() => {
    setMapStates((prev) => ({ ...prev, centered: !prev.centered }));
  }, [setMapStates]);
  const onMouseEnterDataPoint = useCallback(
    (index: number) => {
      setDataPoints((prevDataPoints) =>
        prevDataPoints.map((point, i) =>
          i === index ? { ...point, open: true } : point,
        ),
      );
    },
    [setDataPoints],
  );
  const onMouseLeaveDataPoint = useCallback(
    (index: number) => {
      setDataPoints((prevDataPoints) =>
        prevDataPoints.map((point, i) =>
          i === index ? { ...point, open: false } : point,
        ),
      );
    },
    [setDataPoints],
  );

  return (
    <div className="relative size-full">
      <ReactMapGL
        boxZoom={false}
        doubleClickZoom={false}
        dragPan
        dragRotate
        keyboard={false}
        mapLib={import("mapbox-gl") as Promise<MapLibType>}
        mapStyle={
          mapStates.satelliteMode
            ? "mapbox://styles/mapbox/satellite-streets-v12"
            : darkMode
              ? "mapbox://styles/mapbox/dark-v11"
              : "mapbox://styles/mapbox/light-v11"
        }
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPSAPIKEY}
        onLoad={() => {
          if (!mapRef.current) return;
          fitBounds(mapRef.current, carLocation, lapLocation);
        }}
        onMove={(evt) => setViewState(evt.viewState)}
        ref={(instance) => {
          if (instance) {
            mapRef.current = instance;
          }
        }}
        scrollZoom
        {...viewState}
        style={{ height: "100%", width: "100%" }}
      >
        {popupOpen && (
          <Popup
            latitude={mapStates.currentCarLocation.lat}
            longitude={mapStates.currentCarLocation.long}
          >
            You are here
          </Popup>
        )}
        <Marker
          latitude={mapStates.currentCarLocation.lat}
          longitude={mapStates.currentCarLocation.long}
          onClick={(e) => e.originalEvent.stopPropagation()}
        >
          <Image
            alt="map-pin"
            height={50}
            onMouseEnter={() => setPopupOpen(true)}
            onMouseLeave={() => setPopupOpen(false)}
            src={HeliosModel}
            style={{
              transform: `rotate(${calculateBearing(mapStates.currentCarLocation, carLocation)}deg)`,
            }}
            width={20}
          />
        </Marker>
        <Marker
          latitude={lapLocation.lat}
          longitude={lapLocation.long}
          style={{
            color: mapStates.satelliteMode
              ? "white"
              : darkMode
                ? "white"
                : "black",
          }}
        >
          <SportsScoreIcon />
        </Marker>
        {dataPoints.map((packetMarker, index) => (
          <PacketMarker
            index={index}
            key={packetMarker.data.TimeStamp}
            onMouseEnterDataPoint={onMouseEnterDataPoint}
            onMouseLeaveDataPoint={onMouseLeaveDataPoint}
            packetMarker={packetMarker}
            setDataPoints={setDataPoints}
          />
        ))}
        {trackList.map(({ layerProps, sourceProps }, index) => {
          if (!viewTracks[index]) return null;
          return (
            <Source {...sourceProps} key={sourceProps.id}>
              <Layer {...layerProps} />
            </Source>
          );
        })}
      </ReactMapGL>
      <MapControls
        mapStates={mapStates}
        setViewTracks={setViewTracks}
        toggleCentred={toggleCentred}
        toggleMapStyle={toggleMapStyle}
        trackList={trackList}
        viewTracks={viewTracks}
      />
    </div>
  );
}
