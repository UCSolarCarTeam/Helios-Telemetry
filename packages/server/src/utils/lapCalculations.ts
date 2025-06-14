import { Coords } from "@shared/helios-types";

const ONE_DEG_TO_KM = 40075 / 360; // 111 km = 1 deg

// Finds offset by converting distance (in km) to a certain latitude and longitude
export function calculateOffset(offsetDistance: number, referenceLat: number) {
  const latOffset = offsetDistance / ONE_DEG_TO_KM;
  const longOffset =
    offsetDistance / (ONE_DEG_TO_KM * Math.cos((referenceLat * Math.PI) / 180));

  return { latOffset, longOffset };
}

// Main private that converts latitude and longitude to Decimal Degrees (DD)
export function convertToDecimalDegrees(lat: string, long: string): Coords {
  let latitude: number;
  let longitude: number;
  lat = lat.trim();
  long = long.trim();

  if (isDMS(lat)) {
    latitude = dmsToDecimal(lat);
  } else if (isDMM(lat)) {
    latitude = dmmToDecimal(lat);
  } else if (isDDLat(lat)) {
    latitude = parseFloat(lat);
  } else {
    throw new Error("lat");
  }

  if (isDMS(long)) {
    longitude = dmsToDecimal(long);
  } else if (isDMM(long)) {
    longitude = dmmToDecimal(long);
  } else if (isDDLong(long)) {
    longitude = parseFloat(long);
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
