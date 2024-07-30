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
const lerp = (start: number, end: number, t: number) => {
  return start * (1 - t) + end * t;
};

function Map(props: IMapProps): JSX.Element {
  const { currentAppState } = useAppState();
  const { carLocation, mapLocation, lapLocation } = props;
  const mapRef = useRef<MapboxMap | null>(null);
  const [satelliteMode, setSatelliteMode] = useState(false);
  const [centered, setCentered] = useState(false);
  const buttonRef = useRef(null);
  const [currentCarLocation, setCurrentCarLocation] = useState(carLocation);

  useEffect(() => {
    const isOutsideBounds = (coordinates: ILocation[]): boolean => {
      if (!mapRef.current) return false;
      const bounds = mapRef.current?.getBounds() as LngLatBounds | undefined;
      const { lng, lat } = bounds?.getNorthEast() || { lng: 0, lat: 0 };
      const { lng: westLng, lat: southLat } = bounds?.getSouthWest() || {
        lng: 0,
        lat: 0,
      };
      for (
        let i = 0;
        coordinates !== undefined && i < coordinates.length;
        i++
      ) {
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
    if (isOutsideBounds(coordinates) && mapRef.current && !centered) {
      fitToBounds(mapRef.current, carLocation, lapLocation);
    } else if (centered && mapRef.current) {
      mapRef.current.flyTo({
        center: [carLocation.lng, carLocation.lat],
        zoom: 16,
        speed: 1.5, // Adjust the speed of the animation
        curve: 1, // Adjust the curve of the animation
        easing: (t) => t, // Easing function for the animation
      });
    }
  }, [carLocation, lapLocation, centered, mapLocation]);

  useEffect(() => {
    let animationFrameId: number;
    const animateCarMarker = () => {
      setCurrentCarLocation((prevLocation) => {
        const t = 0.01; // Animation speed [0,1]
        const newLat = lerp(prevLocation.lat, carLocation.lat, t);
        const newLng = lerp(prevLocation.lng, carLocation.lng, t);
        return { lat: newLat, lng: newLng };
      });
      animationFrameId = requestAnimationFrame(animateCarMarker); // creates animation frame for the map
    };
    animateCarMarker();
    return () => cancelAnimationFrame(animationFrameId);
  }, [carLocation]);
  if (!process.env.NEXT_PUBLIC_MAPSAPIKEY) return <></>;

  const toggleMapStyle = () => {
    setSatelliteMode((prev) => !prev);
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
            {satelliteMode === true ? (
              <FaSatellite
                className={`text-xl ${currentAppState.darkMode === true ? "text-dark" : "text-light"}`}
              />
            ) : (
              <FaLayerGroup
                className={`text-xl ${currentAppState.darkMode === true ? "text-dark" : "text-light"}`}
              />
            )}
          </button>

          <button
            className={`absolute z-10 flex size-8 cursor-pointer items-center justify-center rounded-full border-none ${currentAppState.darkMode === true ? "bg-dark text-dark" : "bg-light text-light"}`}
            onClick={() => {
              setCentered(!centered);
            }}
          >
            <FaLocationArrow
              className={`text-xl ${currentAppState.darkMode === true ? "text-dark" : "text-light"}`}
              style={{
                fontSize: "1.0rem",
                lineHeight: "0.3rem",
                height: "1.5rem",
              }}
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
            satelliteMode
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
            // @ts-expect-error:next-line
            fitToBounds(mapInstance, carLocation, lapLocation);
          }}
        >
          <Marker
            longitude={currentCarLocation.lng}
            latitude={currentCarLocation.lat}
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
                satelliteMode === true
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
