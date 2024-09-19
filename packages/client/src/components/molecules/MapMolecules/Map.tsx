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

// @ts-expect-error:next-line
type MapLibType = MapLib<mapboxgl.Map>;

type ILocation = {
  lat: number;
  lng: number;
};

type IMapProps = {
  carLocation: ILocation;
  mapLocation: ILocation;
  lapLocation: ILocation;
};

const fitToBounds = (
  map: mapboxgl.Map | null,
  carLocation: ILocation,
  lapLocation: ILocation,
) => {
  if (!map) return;
  const bounds: LngLatBoundsLike = [
    [carLocation.lng, carLocation.lat],
    [lapLocation.lng, lapLocation.lat],
  ];

  map.fitBounds(bounds, {
    padding: { top: 35, bottom: 35, left: 35, right: 35 },
    linear: true,
    maxZoom: 16,
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
  const { carLocation, mapLocation, lapLocation } = props;
  const mapRef = useRef<MapboxMap | null>(null);
  const [mapStates, setMapStates] = useState({
    satelliteMode: false,
    centered: false,
    currentCarLocation: carLocation,
  });
  const buttonRef = useRef(null);

  useEffect(() => {
    const isOutsideBounds = (coordinates: ILocation[]): boolean => {
      if (!mapRef.current) return false;
      const bounds = mapRef.current?.getBounds() as LngLatBounds | undefined;
      const { lng, lat } = bounds?.getNorthEast() || { lng: 0, lat: 0 };
      const { lng: westLng, lat: southLat } = bounds?.getSouthWest() || {
        lng: 0,
        lat: 0,
      };
      if (coordinates === undefined) return false;
      for (let i = 0; i < coordinates.length; i++) {
        const coord = coordinates[i];
        if (
          coord &&
          (coord.lng < westLng ||
            coord.lng > lng ||
            coord.lat < southLat ||
            coord.lat > lat)
        ) {
          return true;
        }
      }
      return false;
    };
    const coordinates: ILocation[] = [carLocation, mapLocation, lapLocation];
    if (isOutsideBounds(coordinates) && mapRef.current && !mapStates.centered) {
      fitToBounds(mapRef.current, carLocation, lapLocation);
    } else if (mapStates.centered && mapRef.current) {
      mapRef.current.flyTo({
        center: [carLocation.lng, carLocation.lat],
        zoom: 16,
        speed: 1.5, // Adjust the speed of the animation
        curve: 1, // Adjust the curve of the animation
        easing: (t) => t, // Easing function for the animation
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
          prevMapStates.currentCarLocation.lng,
          carLocation.lng,
          t,
        );
        return {
          ...prevMapStates,
          currentCarLocation: { lat: newLat, lng: newLng },
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
            ref={buttonRef}
            className={`absolute z-10 flex size-8 cursor-pointer items-center justify-center rounded-full border-none ${currentAppState.darkMode === true ? "bg-dark text-dark" : "bg-light text-light"}`}
            onClick={() => {
              toggleMapStyle();
            }}
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
          ref={(instance) => {
            if (instance) {
              mapRef.current = instance.getMap();
            }
          }}
          mapLib={import("mapbox-gl") as Promise<MapLibType>}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPSAPIKEY}
          initialViewState={{
            longitude: mapLocation.lng,
            latitude: mapLocation.lat,
            zoom: 14,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={
            mapStates.satelliteMode
              ? "mapbox://styles/mapbox/satellite-streets-v12"
              : currentAppState.darkMode
                ? "mapbox://styles/mapbox/dark-v11"
                : "mapbox://styles/mapbox/light-v11"
          }
          boxZoom={false}
          doubleClickZoom={false}
          dragPan={true}
          dragRotate={true}
          scrollZoom={true}
          keyboard={false}
          onLoad={(e) => {
            const mapInstance = e.target;
            fitToBounds(mapInstance as mapboxgl.Map, carLocation, lapLocation);
          }}
        >
          <Marker
            longitude={mapStates.currentCarLocation.lng}
            latitude={mapStates.currentCarLocation.lat}
          >
            <Image
              src="/assets/HeliosBirdseye.png"
              alt="map-pin"
              width={20}
              height={50}
            />
          </Marker>
          <Marker
            longitude={lapLocation.lng}
            latitude={lapLocation.lat}
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
