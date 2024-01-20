import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import ReactMap, { Marker } from "react-map-gl";

type ILocation = {
  lat: number;
  lng: number;
};

type IMapProps = {
  carLocation: ILocation;
  mapLocation: ILocation;
};

function Map(props: IMapProps): JSX.Element {
  const { carLocation, mapLocation } = props;
  return (
    <ReactMap
      mapLib={import("mapbox-gl")}
      mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPSAPIKEY as string}
      longitude={mapLocation.lng}
      latitude={mapLocation.lat}
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
    >
      <Marker
        longitude={carLocation.lng}
        latitude={carLocation.lat}
        anchor={"center"}
      >
        <img src="/assets/HeliosBirdseye.png" alt="map-pin" width={20} />
      </Marker>
    </ReactMap>
  );
}

export default Map;
