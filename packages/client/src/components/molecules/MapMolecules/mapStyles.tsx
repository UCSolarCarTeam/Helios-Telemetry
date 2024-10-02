const mapStyles: Record<string, google.maps.MapTypeStyle[]> = {
  default: [],
  hiding: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.icon",
      featureType: "transit",
      stylers: [{ visibility: "off" }],
    },
  ],

  light: [
    {
      elementType: "geometry",
      stylers: [{ color: "#2F3E55" }],
    },
    {
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      elementType: "geometry",
      featureType: "poi",
      stylers: [{ color: "#695c79" }],
    },

    {
      elementType: "geometry",
      featureType: "poi.park",
      stylers: [{ color: "#0000ff" }],
    },

    {
      elementType: "geometry",
      featureType: "road",
      stylers: [{ color: "#f1f3f4" }],
    },

    {
      elementType: "geometry",
      featureType: "road.highway",
      stylers: [{ color: "#dadada" }],
    },

    {
      elementType: "geometry",
      featureType: "transit.line",
      stylers: [{ color: "#e5e5e5" }],
    },
    {
      elementType: "geometry",
      featureType: "transit.station",
      stylers: [{ color: "#695c79" }],
    },
    {
      elementType: "geometry",
      featureType: "water",
      stylers: [{ color: "#c9c9c9" }],
    },
  ],

  night: [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      elementType: "labels.text.fill",
      featureType: "administrative.locality",
      stylers: [{ color: "#d59563" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "poi",
      stylers: [{ color: "#d59563" }],
    },
    {
      elementType: "geometry",
      featureType: "poi.park",
      stylers: [{ color: "#263c3f" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "poi.park",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      elementType: "geometry",
      featureType: "road",
      stylers: [{ color: "#00ff00" }],
    },
    {
      elementType: "geometry.stroke",
      featureType: "road",
      stylers: [{ color: "#00ff00" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "road",
      stylers: [{ color: "#00ff00" }],
    },
    {
      elementType: "geometry",
      featureType: "road.highway",
      stylers: [{ color: "#746855" }],
    },
    {
      elementType: "geometry.stroke",
      featureType: "road.highway",
      stylers: [{ color: "#00ff00" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "road.highway",
      stylers: [{ color: "#00ff00" }],
    },
    {
      elementType: "geometry",
      featureType: "transit",
      stylers: [{ color: "#2f3948" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "transit.station",
      stylers: [{ color: "#d59563" }],
    },
    {
      elementType: "geometry",
      featureType: "water",
      stylers: [{ color: "#17263c" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "water",
      stylers: [{ color: "#515c6d" }],
    },
    {
      elementType: "labels.text.stroke",
      featureType: "water",
      stylers: [{ color: "#17263c" }],
    },
  ],

  retro: [
    { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
    {
      elementType: "geometry.stroke",
      featureType: "administrative",
      stylers: [{ color: "#c9b2a6" }],
    },
    {
      elementType: "geometry.stroke",
      featureType: "administrative.land_parcel",
      stylers: [{ color: "#dcd2be" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "administrative.land_parcel",
      stylers: [{ color: "#ae9e90" }],
    },
    {
      elementType: "geometry",
      featureType: "landscape.natural",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      elementType: "geometry",
      featureType: "poi",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "poi",
      stylers: [{ color: "#93817c" }],
    },
    {
      elementType: "geometry.fill",
      featureType: "poi.park",
      stylers: [{ color: "#a5b076" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "poi.park",
      stylers: [{ color: "#447530" }],
    },
    {
      elementType: "geometry",
      featureType: "road",
      stylers: [{ color: "#f5f1e6" }],
    },
    {
      elementType: "geometry",
      featureType: "road.arterial",
      stylers: [{ color: "#fdfcf8" }],
    },
    {
      elementType: "geometry",
      featureType: "road.highway",
      stylers: [{ color: "#f8c967" }],
    },
    {
      elementType: "geometry.stroke",
      featureType: "road.highway",
      stylers: [{ color: "#e9bc62" }],
    },
    {
      elementType: "geometry",
      featureType: "road.highway.controlled_access",
      stylers: [{ color: "#e98d58" }],
    },
    {
      elementType: "geometry.stroke",
      featureType: "road.highway.controlled_access",
      stylers: [{ color: "#db8555" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "road.local",
      stylers: [{ color: "#806b63" }],
    },
    {
      elementType: "geometry",
      featureType: "transit.line",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "transit.line",
      stylers: [{ color: "#8f7d77" }],
    },
    {
      elementType: "labels.text.stroke",
      featureType: "transit.line",
      stylers: [{ color: "#ebe3cd" }],
    },
    {
      elementType: "geometry",
      featureType: "transit.station",
      stylers: [{ color: "#dfd2ae" }],
    },
    {
      elementType: "geometry.fill",
      featureType: "water",
      stylers: [{ color: "#b9d3c2" }],
    },
    {
      elementType: "labels.text.fill",
      featureType: "water",
      stylers: [{ color: "#92998d" }],
    },
  ],
};

export default mapStyles;
