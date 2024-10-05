import type {
  LngLatBounds,
  LngLatBoundsLike,
  Map as MapboxMap,
} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaLayerGroup, FaLocationArrow, FaSatellite } from "react-icons/fa";
import ReactMapGL, { type MapLib, Marker } from "react-map-gl";

import { useAppState } from "@/contexts/AppStateContext";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import type { Coords } from "@shared/helios-types";

// @ts-expect-error:next-line
type MapLibType = MapLib<mapboxgl.Map>;

type IMapProps = {
  carLocation: Coords;
  mapLocation: Coords;
  lapLocation: Coords;
};

const fitToBounds = (
  map: mapboxgl.Map,
  carLocation: Coords,
  lapLocation: Coords,
) => {
  if (!map) return;
  const bounds: LngLatBoundsLike = [
    [carLocation.long, carLocation.lat],
    [lapLocation.long, lapLocation.lat],
  ];

  map.fitBounds(bounds, {
    linear: true,
    maxZoom: 16,
    padding: { bottom: 35, left: 35, right: 35, top: 35 },
  });
};
// linear interpolation for the animation for the car to catch up
const lerp = (
  startPosition: number,
  endPosition: number,
  timeOfAnimation: number,
) => {
  return startPosition * (1 - timeOfAnimation) + endPosition * timeOfAnimation;
};

function Map(props: IMapProps): JSX.Element {
  const { currentAppState } = useAppState();
  const { carLocation, lapLocation, mapLocation } = props;
  const mapRef = useRef<MapboxMap | null>(null);
  const [mapStates, setMapStates] = useState({
    centered: false,
    currentCarLocation: carLocation,
    satelliteMode: false,
  });
  const buttonRef = useRef(null);

  useEffect(() => {
    const isOutsideBounds = (coordinates: Coords[]): boolean => {
      if (!mapRef.current) return false;
      const bounds = mapRef.current?.getBounds() as LngLatBounds | undefined;
      const { lat, lng } = bounds?.getNorthEast() || { lat: 0, lng: 0 };
      const { lat: southLat, lng: westLng } = bounds?.getSouthWest() || {
        lat: 0,
        lng: 0,
      };
      if (coordinates === undefined) return false;
      for (let i = 0; i < coordinates.length; i++) {
        const coord = coordinates[i];
        if (
          coord &&
          (coord.long < westLng ||
            coord.long > lng ||
            coord.lat < southLat ||
            coord.lat > lat)
        ) {
          return true;
        }
      }
      return false;
    };
    const coordinates: Coords[] = [carLocation, mapLocation, lapLocation];
    if (isOutsideBounds(coordinates) && mapRef.current && !mapStates.centered) {
      fitToBounds(mapRef.current, carLocation, lapLocation);
    } else if (mapStates.centered && mapRef.current) {
      mapRef.current.flyTo({
        center: [carLocation.long, carLocation.lat],
        curve: 1, // Adjust the curve of the animation
        easing: (t) => t, // Easing function for the animation
        speed: 1.5, // Adjust the speed of the animation
        zoom: 16,
      });
    }
  }, [carLocation, lapLocation, mapStates.centered, mapLocation]);

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

  if (!process.env.NEXT_PUBLIC_MAPSAPIKEY) return <></>;

  const toggleMapStyle = () => {
    setMapStates((prev) => ({ ...prev, satelliteMode: !prev.satelliteMode }));
  };

  const toggleCentred = () => {
    setMapStates((prev) => ({ ...prev, centered: !prev.centered }));
  };

  return (
    <>
      <div className="relative size-full">
        <div className="absolute z-10 flex flex-col space-x-14 space-y-0 p-2">
          <button
            className={`absolute z-10 flex size-8 cursor-pointer items-center justify-center rounded-full border-none ${currentAppState.darkMode === true ? "bg-dark text-dark" : "bg-light text-light"}`}
            onClick={() => {
              toggleMapStyle();
            }}
            ref={buttonRef}
          >
            {mapStates.satelliteMode === true ? (
              <FaSatellite
                className={`text-xl ${currentAppState.darkMode === true ? "text-dark" : "text-light"} h-6 text-[1rem] leading-[0.3rem]`}
              />
            ) : (
              <FaLayerGroup
                className={`text-xl ${currentAppState.darkMode === true ? "text-dark" : "text-light"} h-6 text-[1rem] leading-[0.3rem]`}
              />
            )}
          </button>

          <button
            className={`absolute z-10 flex size-8 cursor-pointer items-center justify-center rounded-full border-none ${currentAppState.darkMode === true ? "bg-dark text-dark" : "bg-light text-light"}`}
            onClick={() => {
              toggleCentred();
            }}
          >
            <FaLocationArrow
              className={`text-xl ${currentAppState.darkMode === true ? "text-dark" : "text-light"} h-6 text-[1rem] leading-[0.3rem]`}
            />
          </button>
        </div>
        <ReactMapGL
          boxZoom={false}
          doubleClickZoom={false}
          dragPan={true}
          dragRotate={true}
          initialViewState={{
            latitude: mapLocation.lat,
            longitude: mapLocation.long,
            zoom: 14,
          }}
          keyboard={false}
          mapLib={import("mapbox-gl") as Promise<MapLibType>}
          mapStyle={
            mapStates.satelliteMode
              ? "mapbox://styles/mapbox/satellite-streets-v12"
              : currentAppState.darkMode
                ? "mapbox://styles/mapbox/dark-v11"
                : "mapbox://styles/mapbox/light-v11"
          }
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPSAPIKEY}
          onLoad={(e) => {
            const mapInstance = e.target;
            fitToBounds(mapInstance as mapboxgl.Map, carLocation, lapLocation);
          }}
          ref={(instance) => {
            if (instance) {
              mapRef.current = instance.getMap();
            }
          }}
          scrollZoom={true}
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
              width={20}
            />
          </Marker>
          <Marker
            latitude={lapLocation.lat}
            longitude={lapLocation.long}
            style={{
              color:
                mapStates.satelliteMode === true
                  ? "white"
                  : currentAppState.darkMode === true
                    ? "white"
                    : "black",
            }}
          >
            <SportsScoreIcon />
          </Marker>
        </ReactMapGL>
      </div>
    </>
  );
}

export default Map;
