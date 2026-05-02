-- Rename motor telemetry fields for naming consistency
-- RENAME COLUMN is used intentionally: DROP + re-ADD would destroy all existing telemetry data.

ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0BemfD"               TO "Motor0BEMFd";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0BemfQ"               TO "Motor0BEMFq";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0DcBusAh"             TO "Motor0DCBusAh";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0DspBoardTemperature" TO "Motor0DspBoardTemp";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0HeatsinkTemperature" TO "Motor0HeatsinkTemp";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0MotorTemperature"    TO "Motor0MotorTemp";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0Supply15v"           TO "Motor0Supply15V";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0Supply1v9"           TO "Motor0Supply1V9";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0Supply3v3"           TO "Motor0Supply3V3";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor0TritiumId"           TO "Motor0TritiumID";

ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1BemfD"               TO "Motor1BEMFd";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1BemfQ"               TO "Motor1BEMFq";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1DcBusAh"             TO "Motor1DCBusAh";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1DspBoardTemperature" TO "Motor1DspBoardTemp";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1HeatsinkTemperature" TO "Motor1HeatsinkTemp";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1MotorTemperature"    TO "Motor1MotorTemp";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1Supply15v"           TO "Motor1Supply15V";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1Supply1v9"           TO "Motor1Supply1V9";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1Supply3v3"           TO "Motor1Supply3V3";
ALTER TABLE "telemetry_packet" RENAME COLUMN "Motor1TritiumId"           TO "Motor1TritiumID";
