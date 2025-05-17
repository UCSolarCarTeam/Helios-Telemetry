import type { FeatureCollection, LineString } from "geojson";
import mapboxgl, { LineLayerSpecification } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import { type JSX, useCallback, useEffect, useRef, useState } from "react";
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
import {
  type Coords,
  ITelemetryData,
  calculateBearing,
} from "@shared/helios-types";

import MapControls from "./MapControls";
import {
  Hydrated_Grand_Full_course,
  TRACK_LIST,
  mapCameraControls,
} from "./MapSetup";
import PacketMarker from "./PacketMarker";

const { distance, fitBounds, isOutsideBounds, lerp } = mapCameraControls;
// @ts-expect-error:next-line
type MapLibType = MapLib<mapboxgl.Map>;

export type PacketMarkerData = {
  data: ITelemetryData;
  markerCoords: {
    latitude: number;
    longitude: number;
  };
  open: boolean;
};
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
    centered: true,
    currentCarLocation: carLocation,
    isFullscreen: false,
    satelliteMode: false,
  });
  const [popupOpen, setPopupOpen] = useState(true);
  const [viewTracks, setViewTracks] = useState(TRACK_LIST.map(() => true));
  const [dataPoints, setDataPoints] = useState<PacketMarkerData[]>(
    Hydrated_Grand_Full_course,
  );
  const [mapControlsAdded, setMapControlsAdded] = useState(false);

  const mapRef = useRef<MapRef | undefined>(undefined);

  if (mapRef.current && !mapControlsAdded) {
    mapRef.current.addControl(new mapboxgl.FullscreenControl(), "top-right");
    setMapControlsAdded(true);
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement !== null;
      setMapStates((prev) => ({ ...prev, isFullscreen }));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    setViewState((prev) => ({
      ...prev,
      zoom: mapStates.isFullscreen ? 16 : 14,
    }));
  }, [mapStates.isFullscreen]);

  useEffect(() => {
    const time = mapStates.isFullscreen ? 1 : 1 / 60;
    let animationFrameId: number;
    const animateCarMarker = () => {
      setMapStates((prevMapStates) => {
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
  }, [carLocation, mapStates.isFullscreen]);
  useEffect(() => {
    const coordinates: Coords[] = [carLocation, carLocation, lapLocation];
    if (!mapRef.current) return;
    const map = mapRef.current;
    if (isOutsideBounds(map, coordinates) && !mapStates.centered) {
      fitBounds(map, carLocation, lapLocation);
    } else if (mapStates.centered) {
      const dist = distance(
        carLocation.lat,
        carLocation.long,
        map.getCenter().lat,
        map.getCenter().lng,
      );
      const speedFactor = 80;
      map.flyTo({
        center: [carLocation.long, carLocation.lat],
        curve: 1, // Adjust the curve of the animation
        easing: (t) => t, // Easing function for the animation
        speed: speedFactor * dist,
        zoom: mapStates.isFullscreen ? 16 : 14,
      });
    }
  }, [carLocation, lapLocation, mapStates.centered, mapStates.isFullscreen]);

  const toggleMapStyle = useCallback(() => {
    setMapStates((prev) => ({ ...prev, satelliteMode: !prev.satelliteMode }));
  }, [setMapStates]);

  const toggleCentred = useCallback(() => {
    setMapStates((prev) => ({ ...prev, centered: !prev.centered }));
  }, [setMapStates]);
  const onMouseEnterDataPoint = useCallback(
    (index: number) => {
      setDataPoints((prevDataPoints) =>
        prevDataPoints.map((point, i) =>
          i === index ? { ...point, open: true } : point,
        ),
      );
    },
    [setDataPoints],
  );
  const onMouseLeaveDataPoint = useCallback(
    (index: number) => {
      setDataPoints((prevDataPoints) =>
        prevDataPoints.map((point, i) =>
          i === index ? { ...point, open: false } : point,
        ),
      );
    },
    [setDataPoints],
  );

  const geojson: FeatureCollection = {
    features: [
      {
        geometry: {
          coordinates: [lapLocation.long, lapLocation.lat],
          type: "Point",
        },
        properties: { title: "Finish Line" },
        type: "Feature",
      },
    ],
    type: "FeatureCollection",
  };

  const layerStyle: LayerProps = {
    id: "finish-line",
    paint: {
      "circle-color": "#B94A6C",
      "circle-opacity": 0.8,
      "circle-radius": 30,

      "circle-stroke-color": "#9C0534",
      "circle-stroke-width": 2,
    },
    type: "circle",
  };

  return (
    <div className="relative size-full" id="map-container">
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
        onMove={(evt) => {
          setViewState(evt.viewState);
        }}
        ref={(instance) => {
          if (instance) {
            mapRef.current = instance;
          }
        }}
        scrollZoom
        {...viewState}
        style={{ height: "100%", width: "100%" }}
      >
        <MapControls
          mapStates={mapStates}
          setViewTracks={setViewTracks}
          toggleCentred={toggleCentred}
          toggleMapStyle={toggleMapStyle}
          trackList={TRACK_LIST}
          viewTracks={viewTracks}
        />
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
            height={mapStates.isFullscreen ? 80 : 50}
            onMouseEnter={() => setPopupOpen(true)}
            onMouseLeave={() => setPopupOpen(false)}
            src={HeliosModel}
            style={{
              transform: `rotate(${calculateBearing(mapStates.currentCarLocation, carLocation)}deg)`,
            }}
            width={mapStates.isFullscreen ? 40 : 20}
          />
        </Marker>
        <Marker
          latitude={lapLocation.lat + 0.00025}
          longitude={lapLocation.long + 0.00025}
        >
          <SportsScoreIcon
            style={{
              color: mapStates.satelliteMode
                ? "white"
                : darkMode
                  ? "white"
                  : "black",
            }}
            sx={{ fontSize: mapStates.isFullscreen ? "100px" : "40px" }}
          />
        </Marker>
        {mapStates.isFullscreen && (
          <Source data={geojson} id="finish-line-source" type="geojson">
            <Layer {...layerStyle} />
          </Source>
        )}

        {dataPoints.map((packetMarker, index) => (
          <PacketMarker
            index={index}
            key={packetMarker.data.TimeStamp}
            onMouseEnterDataPoint={onMouseEnterDataPoint}
            onMouseLeaveDataPoint={onMouseLeaveDataPoint}
            packetMarker={packetMarker}
            setDataPoints={setDataPoints}
          />
        ))}

        {TRACK_LIST.map(({ layerProps, sourceProps }, index) => {
          if (!viewTracks[index]) return null;
          return (
            <Source {...sourceProps} key={sourceProps.id}>
              <Layer {...layerProps} />
            </Source>
          );
        })}
      </ReactMapGL>
    </div>
  );
}
