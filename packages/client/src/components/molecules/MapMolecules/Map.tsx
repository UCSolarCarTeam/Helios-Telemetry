// This file shows the current location of the car.
import type { FeatureCollection, LineString } from "geojson";
import mapboxgl, { LineLayerSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "next-themes";
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
  ViewState,
} from "react-map-gl";

import HeliosModel from "@/assets/HeliosBirdseye.png";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import {
  type Coords,
  ITelemetryData,
  calculateBearing,
  haversineDistance,
} from "@shared/helios-types";

import MapControls from "./MapControls";
import {
  Hydrated_Grand_Full_course,
  TRACK_LIST,
  mapCameraControls,
} from "./MapSetup";
import PacketMarker from "./PacketMarker";

const { distance, fitBounds, isOutsideBounds, lerp } = mapCameraControls;
// @ts-expect-error:next-line
type MapLibType = MapLib<mapboxgl.Map>;

export type PacketMarkerData = {
  data: ITelemetryData;
  markerCoords: {
    latitude: number;
    longitude: number;
  };
  open: boolean;
};

type TrackSourceProps = {
  id: string;
  type: "geojson";
  data: FeatureCollection<LineString>;
};

// this is for the demo mode when default tracks are shown in demo mode
export type TrackList = {
  layerProps: LayerProps & Partial<LineLayerSpecification>;
  sourceProps: TrackSourceProps;
  trackName: string;
};
if (!process.env.NEXT_PUBLIC_MAPSAPIKEY)
  throw new Error("Missing NEXT_PUBLIC_MAPSAPIKEY ");

/**
 * The main map component that visualizes the current location of a vehicle on a Mapbox map,
 * along with track overlays and telemetry data markers.
 *
 * Features:
 * - Smooth car movement animation using interpolation, thats what the lerp function is for
 *      - lerp is only triggered when the car moves less than 10km, otherwise
 *         it just jumps/teleports to the new location so it doesn't look like the car is missing
 * - Satellite and light/dark mode toggle
 * - Display of track lines, lap location, and telemetry markers
 * - There are some popups that show the current car location as well as the timestamp marker
 *    of the telemetry data points on the demo mode track
 *
 * IMPORTANT: ReactMapGL docs: https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/map
 *
 * @param {Coords} carLocation - The current GPS coordinates of the vehicle
 * @param {Coords} lapLocation - The fixed GPS coordinates of the lap marker
 */
export default function Map({
  carLocation,
  lapLocation,
}: {
  carLocation: Coords;
  lapLocation: Coords;
}): JSX.Element {
  const [viewState, setViewState] = useState<Partial<ViewState>>({
    latitude: carLocation.lat,
    longitude: carLocation.long,
    zoom: 14,
  });
  const { resolvedTheme } = useTheme();

  const [mapStates, setMapStates] = useState({
    centered: true,
    currentCarLocation: carLocation,
    satelliteMode: false,
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const [viewTracks, setViewTracks] = useState(TRACK_LIST.map(() => true));
  const [dataPoints, setDataPoints] = useState<PacketMarkerData[]>(
    Hydrated_Grand_Full_course,
  );
  const [mapControlsAdded, setMapControlsAdded] = useState(false);

  const mapRef = useRef<MapRef | undefined>(undefined);

  if (mapRef.current && !mapControlsAdded) {
    mapRef.current.addControl(new mapboxgl.FullscreenControl(), "top-right");
    setMapControlsAdded(true);
  }

  // calculation for the car marker animation
  useEffect(() => {
    const distance = haversineDistance(
      mapStates.currentCarLocation.lat,
      mapStates.currentCarLocation.long,
      carLocation.lat,
      carLocation.long,
    );

    // if the distance is greater than 10 km, update the current car location without animations/lerp
    // if the disatnce isn't, just animate it like normal

    if (distance < 10) {
      const time = 1 / 60; // run at 60fps
      let animationFrameId: number;
      const animateCarMarker = () => {
        setMapStates((prevMapStates) => {
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
    } else {
      setMapStates((prev) => ({ ...prev, currentCarLocation: carLocation }));
    }
  }, [carLocation, haversineDistance]);

  // this effect is used to fit the map bounds to the car and lap location
  // it is triggered when the car or lap location changes, or when the map is centered
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
        dragPan={!mapStates.centered}
        dragRotate={!mapStates.centered}
        keyboard={false}
        mapLib={import("mapbox-gl") as Promise<MapLibType>}
        mapStyle={
          mapStates.satelliteMode
            ? "mapbox://styles/mapbox/satellite-streets-v12"
            : resolvedTheme === "dark"
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
        scrollZoom={!mapStates.centered}
        touchZoomRotate={!mapStates.centered}
        {...viewState}
        style={{ height: "100%", width: "100%" }}
      >
        <MapControls
          mapStates={mapStates}
          setViewTracks={setViewTracks}
          toggleCentred={toggleCentred}
          toggleMapStyle={toggleMapStyle}
          trackList={TRACK_LIST}
          viewTracks={viewTracks}
        />
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
              : resolvedTheme === "dark"
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
        {TRACK_LIST.map(({ layerProps, sourceProps }, index) => {
          if (!viewTracks[index]) return null;
          return (
            <Source {...sourceProps} key={sourceProps.id}>
              <Layer {...layerProps} />
            </Source>
          );
        })}
      </ReactMapGL>
    </div>
  );
}
