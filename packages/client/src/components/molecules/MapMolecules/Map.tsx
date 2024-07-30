import type { LngLatBounds, LngLatBoundsLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { useEffect, useRef } from "react";
import ReactMapGL, { type MapLib, Marker } from "react-map-gl";

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
function Map(props: IMapProps): JSX.Element {
  const { carLocation, mapLocation, lapLocation } = props;
  const mapRef = useRef<mapboxgl.Map | null>(null);
  useEffect(() => {
    const isOutsideBounds = (): boolean => {
      if (!mapRef || !mapRef.current) return false;

      const { lng, lat } = (
        mapRef.current.getBounds() as LngLatBounds
      ).getNorthEast();
      const { lng: westLng, lat: southLat } = (
        mapRef.current.getBounds() as LngLatBounds
      ).getSouthWest();

      return (
        carLocation.lng < westLng ||
        carLocation.lng > lng ||
        carLocation.lat > lat ||
        carLocation.lat < southLat ||
        lapLocation.lng < westLng ||
        lapLocation.lng > lng ||
        lapLocation.lat > lat ||
        lapLocation.lat < southLat
      );
    };

    if (isOutsideBounds() && mapRef.current) {
      fitToBounds(mapRef.current, carLocation, lapLocation);
    }
  }, [carLocation, lapLocation]);

  if (!process.env.NEXT_PUBLIC_MAPSAPIKEY) return <></>;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactMapGL
        mapLib={import("mapbox-gl") as Promise<MapLibType>}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPSAPIKEY}
        initialViewState={{
          longitude: mapLocation.lng,
          latitude: mapLocation.lat,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        boxZoom={false}
        doubleClickZoom={false}
        dragPan={false}
        dragRotate={false}
        scrollZoom={false}
        keyboard={false}
        onLoad={(e) => {
          mapRef.current = e.target as mapboxgl.Map;
          fitToBounds(mapRef.current, carLocation, lapLocation);
        }}
      >
        <Marker longitude={carLocation.lng} latitude={carLocation.lat}>
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
          style={{ color: "white" }}
        >
          <SportsScoreIcon />
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default Map;
