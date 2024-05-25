import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import ReactMap, { Marker } from "react-map-gl";

import SportsScoreIcon from "@mui/icons-material/SportsScore";

type ILocation = {
  lat: number;
  lng: number;
};

type IMapProps = {
  carLocation: ILocation;
  mapLocation: ILocation;
  lapLocation: ILocation;
};

function Map(props: IMapProps): JSX.Element {
  const { carLocation, mapLocation, lapLocation } = props;

  if (!process.env.NEXT_PUBLIC_MAPSAPIKEY) return <></>;
  return (
    <ReactMap
      mapLib={import("mapbox-gl")}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPSAPIKEY}
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
      zoom={13}
    >
      <Marker
        longitude={carLocation.lng}
        latitude={carLocation.lat}
        anchor={"center"}
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
        anchor={"center"}
        style={{ color: "white" }}
        draggable={false}
        pitchAlignment="auto"
      >
        <SportsScoreIcon />
      </Marker>
    </ReactMap>
  );
}

export default Map;
