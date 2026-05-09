import React, { useEffect, useState } from "react";

import { usePlaybackData } from "@/hooks/usePlaybackData";
import { usePlaybackSegments } from "@/hooks/usePlaybackSegments";
import { downloadCSV } from "@/lib/utils";
import { useAppState } from "@/stores/useAppState";
import { usePacketStore } from "@/stores/usePacket";
import { usePlaybackStore } from "@/stores/usePlayback";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { ITelemetryData, convertToCSV } from "@shared/helios-types";

import DatePickerColumn from "./DataPickerMolecules/DatePickerColumn";
import DatePickerResultColumn from "./DataPickerMolecules/DatePickerResultColumn";

/*
 * This component defines a modal that conatins the DatePicker and Results columns for the playback feature.
 * The modal is opened when the user clicks on the calendar icon, which appears when the playback switch is on.
 *
 * createDateTime: This function creates a Date object from the selected date and time (Selected via the DatePickerColumn).
 *
 * fetchPlaybackData: This function fetches the lap data from the server (DyanmoDB) based on the selected date and time range.
 * It then updates the playback data in the PlaybackContext to be used in the PlaybackSlider component.
 *
 * This component is also responsbile for automatically loading playback data when the playback switch is on and a date is stored
 * in local storage (Date and time was previosuly "cached"). The date and time are only stored in local storage once the user selects
 * a date and time range and clicks the confirm button in the DatePickerColumn for the first time.
 */

export type IPlaybackDateTime = {
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
};
export type IPlaybackDataResponse = {
  data: ITelemetryData;
  timestamp: number;
  id: string;
};

/*
 * This component is used to contain the PlaybackResultColumn and DatePickerColumn in a modal. It contains the actual logic for 
 * fetching the playback data from the database based on the selected date and time.

 * It also contains the logic for exporting the playback data to a CSV file. It does so by flattening the nested JSON TelemetryData
 * objects into a flat structure that can be easily converted to CSV format and then using the browser's Blob API to create a 
 * downloadable file.
 */

const HOUR_IN_MS = 60 * 60 * 1000;

const getDayStart = (date: Date) => {
  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  return dayStart;
};

const formatSegmentLabel = (startUtc: number) => {
  const start = new Date(startUtc);
  const end = new Date(startUtc + HOUR_IN_MS);

  const format = (value: Date) =>
    value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return `${format(start)} - ${format(end)}`;
};

function PlaybackDatePicker() {
  const { currentAppState, setCurrentAppState } = useAppState();
  const [open, setOpen] = useState(false);
  const [playbackDateTime, setPlaybackDateTime] = useState<IPlaybackDateTime>(
    () => {
      const savedPlaybackDateTime = currentAppState.playbackDateTime;

      return {
        date: savedPlaybackDateTime?.date ?? new Date(),
        endTime: savedPlaybackDateTime?.endTime ?? null,
        startTime: savedPlaybackDateTime?.startTime ?? null,
      };
    },
  );
  const [confirmedDate, setConfirmedDate] = useState<Date | null>(
    playbackDateTime.date,
  );
  const [hasRequestedSegments, setHasRequestedSegments] = useState(false);
  const [selectedSegmentStartUtc, setSelectedSegmentStartUtc] = useState<
    number | null
  >(null);

  const { playbackData, setPlaybackData } = usePlaybackStore((state) => ({
    playbackData: state.playbackData,
    setPlaybackData: state.setPlaybackData,
  }));

  const dayStartUtc = confirmedDate ? getDayStart(confirmedDate).getTime() : 0;

  const { data: segmentRanges = [], isLoading: isLoadingSegments } =
    usePlaybackSegments({
      dayStartUtc,
      enabled: hasRequestedSegments && dayStartUtc > 0,
      segmentMs: HOUR_IN_MS,
    });

  const selectedSegment = React.useMemo(() => {
    if (segmentRanges.length === 0) {
      return null;
    }

    if (
      selectedSegmentStartUtc !== null &&
      segmentRanges.some(
        (segment) => segment.startUtc === selectedSegmentStartUtc,
      )
    ) {
      return (
        segmentRanges.find(
          (segment) => segment.startUtc === selectedSegmentStartUtc,
        ) ?? null
      );
    }

    return segmentRanges[0] ?? null;
  }, [segmentRanges, selectedSegmentStartUtc]);

  const { data: fetchedPlaybackData = [], isLoading: isLoadingPlaybackData } =
    usePlaybackData({
      enabled:
        selectedSegment !== null &&
        selectedSegment.endUtc > selectedSegment.startUtc,
      endTime: selectedSegment?.endUtc ?? 0,
      startTime: selectedSegment?.startUtc ?? 0,
    });

  const availableSegments = React.useMemo(
    () =>
      segmentRanges.map((segment) => ({
        label: formatSegmentLabel(segment.startUtc),
        startUtc: segment.startUtc,
      })),
    [segmentRanges],
  );

  const confirmedSegmentDateTime = React.useMemo<IPlaybackDateTime>(() => {
    if (confirmedDate === null || selectedSegment === null) {
      return {
        date: confirmedDate,
        endTime: null,
        startTime: null,
      };
    }

    return {
      date: confirmedDate,
      endTime: new Date(selectedSegment.endUtc),
      startTime: new Date(selectedSegment.startUtc),
    };
  }, [confirmedDate, selectedSegment]);

  useEffect(() => {
    if (!hasRequestedSegments || selectedSegment === null) {
      setPlaybackData([]);
      return;
    }

    setPlaybackData(fetchedPlaybackData);
  }, [
    fetchedPlaybackData,
    hasRequestedSegments,
    selectedSegment,
    setPlaybackData,
  ]);

  useEffect(() => {
    setCurrentAppState((prev) => ({
      ...prev,
      playbackDateTime: confirmedSegmentDateTime,
    }));
  }, [confirmedSegmentDateTime, setCurrentAppState]);

  const isLoading = isLoadingSegments || isLoadingPlaybackData;

  // Confirms date selection and triggers segment fetch for that selected day.
  const loadDaySegments = () => {
    if (!playbackDateTime.date) {
      return;
    }

    setConfirmedDate(getDayStart(playbackDateTime.date));
    setHasRequestedSegments(true);
    setSelectedSegmentStartUtc(null);
    setPlaybackData([]);
  };

  const updatePlaybackTime: React.Dispatch<
    React.SetStateAction<IPlaybackDateTime>
  > = (time) => {
    setPlaybackDateTime(time);
  };
  const handleDownloadCSV = () => {
    // Generate filename with date and time range
    const start = confirmedSegmentDateTime.startTime ?? new Date();
    const end = confirmedSegmentDateTime.endTime ?? new Date();
    const playbackDate =
      confirmedSegmentDateTime.startTime ??
      confirmedSegmentDateTime.endTime ??
      new Date();
    const dateStr = playbackDate.toLocaleDateString().replace(/\//g, "-");
    const formatTime = (date: Date) =>
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    const timeStr = `${formatTime(start)}_to_${formatTime(end)}`;
    const filename = `Helios Packet Data - ${dateStr} ${timeStr}.csv`;
    const data = convertToCSV(playbackData);
    downloadCSV(data, filename);
  };

  return (
    <div>
      <h2 className="text-text-gray dark:text-text-gray-dark w-fit cursor-pointer text-sm font-black">
        <CalendarMonthIcon onClick={() => setOpen(true)} />
      </h2>
      <Modal
        aria-describedby="modal-modal-description"
        aria-labelledby="modal-modal-title"
        className="flex items-center justify-center"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div className="relative flex h-auto w-full max-w-lg rounded-lg border-none bg-white p-6 shadow-lg outline-none sm:max-w-xl md:max-w-2xl">
          <div className="flex w-full flex-col gap-6 sm:flex-row">
            <DatePickerColumn
              fetchPlaybackData={loadDaySegments}
              onSegmentChange={setSelectedSegmentStartUtc}
              playbackDateTime={playbackDateTime}
              segmentOptions={availableSegments}
              segmentsLoaded={hasRequestedSegments}
              segmentsLoading={isLoadingSegments}
              selectedSegmentStartUtc={selectedSegment?.startUtc ?? null}
              setPlaybackDateTime={updatePlaybackTime}
            />
            <DatePickerResultColumn
              confirmedPlaybackDateTime={confirmedSegmentDateTime}
              loading={isLoading}
              playbackData={playbackData}
            />
          </div>
          {(playbackData?.length ?? 0) > 0 && (
            <Tooltip arrow title="Download to CSV">
              <button
                className="absolute right-7 top-5"
                disabled={playbackData?.length === 0}
                onClick={handleDownloadCSV}
              >
                <FileDownloadOutlinedIcon />
              </button>
            </Tooltip>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default PlaybackDatePicker;
