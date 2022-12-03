import React, {useState} from "react";
import Map from "../molecules/MapMolecules/Map"
import MapText from "../molecules/MapMolecules/MapText"

function MapContainer() {
    return (
        <>
            <Map/>
            <MapText/>
        </>
    );
}

export default MapContainer;