import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { type JSX, useEffect, useRef, useState } from "react";
import ReactMapGL, {
  Layer,
  LayerProps,
  type MapLib,
  MapRef,
  Marker,
  Source,
} from "react-map-gl";

import { useAppState } from "@/contexts/AppStateContext";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import type { Coords } from "@shared/helios-types";

import { GEO_DATA } from "./ExampleCoordinates";
import MapControls from "./MapControls";

// @ts-expect-error:next-line
type MapLibType = MapLib<mapboxgl.Map>;
export type MapStates = {
  centered: boolean;
  currentCarLocation: Coords;
  satelliteMode: boolean;
};
if (!process.env.NEXT_PUBLIC_MAPSAPIKEY)
  throw new Error("Missing NEXT_PUBLIC_MAPSAPIKEY ");
const { raceTrackGeoJSON, raceTrackGeoJSON2 } = GEO_DATA;
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
const lerp = (
  startPosition: number,
  endPosition: number,
  timeOfAnimation: number,
) => {
  return startPosition * (1 - timeOfAnimation) + endPosition * timeOfAnimation;
};
const calculateBearing = (start: Coords, end: Coords): number => {
  //using the haversine formula from https://www.movable-type.co.uk/scripts/latlong.html
  const startLat = (start.lat * Math.PI) / 180; //convert to radians
  const startLng = (start.long * Math.PI) / 180;
  const endLat = (end.lat * Math.PI) / 180;
  const endLng = (end.long * Math.PI) / 180;

  const deltaLng = endLng - startLng;
  const x = Math.sin(deltaLng) * Math.cos(endLat);
  const y =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(deltaLng);

  const bearing = (Math.atan2(x, y) * 180) / Math.PI;
  return (bearing + 360) % 360; // Normalize to 0-360 degrees
};

const fitBounds = (
  mapRef: MapRef | undefined,
  coordsA: Coords,
  coordsB: Coords,
) => {
  if (!mapRef) return;
  mapRef.fitBounds(
    [
      [coordsA.long, coordsA.lat],
      [coordsB.long, coordsB.lat],
    ],
    {
      linear: true,
      maxZoom: 16,
      padding: { bottom: 35, left: 35, right: 35, top: 35 },
    },
  );
};
const isOutsideBounds = (
  mapRef: MapRef | undefined,
  coordinates: Coords[],
): boolean => {
  if (!mapRef || !coordinates) return false;
  const bounds = mapRef.getBounds();
  if (!bounds) return false;
  const { lat: northLat, lng: eastLng } = bounds.getNorthEast();
  const { lat: southLat, lng: westLng } = bounds.getSouthWest();
  coordinates.forEach((coord) => {
    if (
      coord.long < westLng ||
      coord.long > eastLng ||
      coord.lat < southLat ||
      coord.lat > northLat
    ) {
      return true;
    }
  });
  return false;
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
  const [viewState, setViewState] = useState({
    latitude: carLocation.lat,
    longitude: carLocation.long,
    zoom: 14,
  });
  const [mapStates, setMapStates] = useState({
    centered: false,
    currentCarLocation: carLocation,
    satelliteMode: false,
  });
  const mapRef = useRef<MapRef | undefined>(undefined);
  useEffect(() => {
    let animationFrameId: number;
    const animateCarMarker = () => {
      setMapStates((prevMapStates) => {
        const t = 0.01;
        const newLat = lerp(
          prevMapStates.currentCarLocation.lat,
          carLocation.lat,
          t,
        );
        const newLng = lerp(
          prevMapStates.currentCarLocation.long,
          carLocation.long,
          t,
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
      map.flyTo({
        center: [carLocation.long, carLocation.lat],
        curve: 1, // Adjust the curve of the animation
        easing: (t) => t, // Easing function for the animation
        speed: 1.5, // Adjust the speed of the animation
        zoom: 16,
      });
    }
  }, [carLocation, lapLocation, mapStates.centered]);

  const toggleMapStyle = () => {
    setMapStates((prev) => ({ ...prev, satelliteMode: !prev.satelliteMode }));
  };

  const toggleCentred = () => {
    setMapStates((prev) => ({ ...prev, centered: !prev.centered }));
  };
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
        <Marker
          latitude={mapStates.currentCarLocation.lat}
          longitude={mapStates.currentCarLocation.long}
        >
          <Image
            alt="map-pin"
            height={50}
            src="/assets/HeliosBirdseye.png"
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
        <Source data={raceTrackGeoJSON} id="layer1-source" type="geojson">
          <Layer {...trackLayerStyle} id="layer1" />
        </Source>
        <Source data={raceTrackGeoJSON2} id="layer2-source" type="geojson">
          <Layer {...trackLayerStyle} id="layer2" />
        </Source>
      </ReactMapGL>
      <MapControls
        mapStates={mapStates}
        toggleCentred={toggleCentred}
        toggleMapStyle={toggleMapStyle}
      />
    </div>
  );
}
