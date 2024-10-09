import { Coords } from "@shared/helios-types";

// Converts numeric degrees to radians
function toRad(value: number) {
  return (value * Math.PI) / 180;
}

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
export function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const dlat1 = toRad(lat1);
  const dlat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

// Main private that converts latitude and longitude to Decimal Degrees (DD)
export function convertToDecimalDegrees(lat: string, long: string): Coords {
  let latitude: number;
  let longitude: number;
  lat = lat.trim();
  long = long.trim();

  if (isDMM(lat)) {
    latitude = dmmToDecimal(lat);
  } else if (isDMS(lat)) {
    latitude = dmsToDecimal(lat);
  } else if (isDDLat(lat)) {
    latitude = parseFloat(lat);
  } else {
    throw new Error("lat");
  }

  if (isDMM(long)) {
    longitude = dmmToDecimal(long);
  } else if (isDDLong(long)) {
    longitude = parseFloat(long);
  } else if (isDMS(long)) {
    longitude = dmsToDecimal(long);
  } else {
    throw new Error("long");
  }

  return { lat: latitude, long: longitude };
}
export function isDDLong(long: string) {
  const longitude = parseFloat(long);
  if (longitude > 180 || longitude < -180) {
    return false;
  }

  return longitude;
}
export function isDDLat(lat: string) {
  const latitude = parseFloat(lat);
  if (latitude > 90 || latitude < -90) {
    return false;
  }
  return latitude;
}

// Helper private to detect if input is in DMS (Degrees, Minutes, Seconds)
export function isDMS(input: string): boolean {
  const regex = /(\d+)[°\s](\d+)[′’'\s](\d+(\.\d+)?)[″"\s]?\s?([NSEW])/;
  return regex.test(input);
}
// Convert DMS format to Decimal Degrees
export function dmsToDecimal(input: string): number {
  const regex = /(\d+)[°\s](\d+)[′’'\s](\d+(\.\d+)?)[″"\s]?\s?([NSEW])/;
  const match = input.match(regex);
  if (!match) {
    throw new Error("Invalid DMS format");
  }

  const degrees = parseFloat(match[1] ?? "0");
  const minutes = parseFloat(match[2] ?? "0");
  const seconds = parseFloat(match[3] ?? "0");
  const direction = match[5];

  let decimal = degrees + minutes / 60 + seconds / 3600;

  if (direction === "S" || direction === "W") {
    decimal *= -1;
  }
  return decimal;
}

// Helper function to detect if input is in DMM (Degrees and Decimal Minutes)
export function isDMM(input: string): boolean {
  const regex = /(\d+)[°\s]\s?(\d+\.\d+)[’"']?\s?([NSEW]?)/;
  return regex.test(input);
}

// Convert DMM format to Decimal Degrees
export function dmmToDecimal(input: string): number {
  const regex = /(\d+)[°\s]\s?(\d+\.\d+)[’"']?\s?([NSEW]?)/;
  const match = input.match(regex);

  if (!match) {
    throw new Error("Invalid DMM format");
  }

  const degrees = parseFloat(match[1] ?? "0");
  const minutes = parseFloat(match[2] ?? "0");
  const direction = match[3];

  let decimal = degrees + minutes / 60;

  if (direction === "S" || direction === "W") {
    decimal *= -1;
  }

  return decimal;
}
