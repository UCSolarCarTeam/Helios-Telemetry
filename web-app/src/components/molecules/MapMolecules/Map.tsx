import React, { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader"
import mapStyles from "./mapStyles";
import Config from "../../../config";

function Map(props: any) {
    const { carLocation, mapLocation } = props;
    let map: google.maps.Map | undefined;

    const loader = new Loader({
        apiKey: Config.mapsAPIKey,
        version: "weekly",
    });


    loader.load().then(() => {
        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: mapLocation,
            zoom: 15,
            mapTypeControl: false,
            gestureHandling: "none",
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            keyboardShortcuts: false,
            
        });

        map.setOptions({ styles: mapStyles['light'] });
        new google.maps.Marker({
            position: carLocation,
            icon: {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              strokeColor: "#AC516C",
              scale: 5,
              rotation: 0,
            },
            draggable: false,
            map: map,
          });
    });



    return (
        <>
            <div id="map"></div>
        </>
    );
}

export default Map;