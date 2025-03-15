import type { FeatureCollection, LineString } from "geojson";
import { LineLayerSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { type JSX, useEffect, useRef, useState } from "react";
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
import { type Coords, calculateBearing } from "@shared/helios-types";

import MapControls from "./MapControls";
import { TRACK_LIST, mapCameraControls } from "./MapSetup";

const { fitBounds, isOutsideBounds, lerp } = mapCameraControls;
// @ts-expect-error:next-line
type MapLibType = MapLib<mapboxgl.Map>;
export type TrackList = {
  layerProps: LayerProps & Partial<LineLayerSpecification>;
  sourceProps: SourceProps & {
    data: FeatureCollection<LineString>;
  };
  trackName: string;
};
if (!process.env.NEXT_PUBLIC_MAPSAPIKEY)
  throw new Error("Missing NEXT_PUBLIC_MAPSAPIKEY ");

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
  const [viewTracks, setViewTracks] = useState(TRACK_LIST.map(() => true));
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
            className="cursor-pointer hover:scale-125"
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
        {TRACK_LIST.map(({ layerProps, sourceProps }, index) => {
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
        trackList={TRACK_LIST}
        viewTracks={viewTracks}
      />
    </div>
  );
}
