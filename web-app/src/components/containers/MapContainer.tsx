import React from "react";
import Map from "../molecules/MapMolecules/Map";
import MapText from "../molecules/MapMolecules/MapText";

function MapContainer() {
  return (
    <div className="h-full w-full">
      <div className="grid h-5/6">
        <Map
          carLocation={{ lat: 38.9277572, lng: -95.6777937 }}
          mapLocation={{ lat: 38.9277572, lng: -95.6777937 }}
        />
      </div>
      <div className="grid h-1/6">
        <MapText />
      </div>
    </div>
  );
}

export default MapContainer;
