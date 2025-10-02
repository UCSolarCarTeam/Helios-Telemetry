import { type JSX, useCallback } from "react";

import useUnitsHandler from "@/hooks/PIS/useUnitsHandler";
import useFullscreen from "@/hooks/useFullscreen";
import {
  type I_PISField,
  type I_PISFieldData,
} from "@/objects/PIS/PIS.interface";
import type I_PIS from "@/objects/PIS/PIS.interface";
import { useAppState } from "@/stores/useAppState";

type RangeCheckedFieldDataProps = {
  fieldData: I_PISFieldData;
};

function RangeCheckedFieldData(props: RangeCheckedFieldDataProps): JSX.Element {
  const { expectedBool, max, min, unit, value } = props.fieldData;
  const inRange =
    // If value is of type string range is true
    typeof value === "string"
      ? true
      : // If value is of type number range is true if min and max are undefined or value is between min and max
        typeof value === "number"
        ? (min === undefined || value >= min) &&
          (max === undefined || value <= max)
        : // If value is of type boolean range is true if expectedBool is undefined and value is false or value is equal to expectedBool
          typeof value === "boolean"
          ? (expectedBool === undefined && value === false) ||
            expectedBool === value
          : false;

  const color = inRange ? "text-green" : "text-red-500";
  const displayValue = typeof value === "boolean" ? (value ? "T" : "F") : value;

  const { units, val } = useUnitsHandler(unit, displayValue);
  return (
    <span className={`m-1` + " " + color}>
      {typeof val === "number" ? Number(val).toFixed(0) : val} {units}
    </span>
  );
}

type FormatStringProps = {
  fstring: string;
  data: I_PISFieldData[];
};

function FormatString(props: FormatStringProps): JSX.Element {
  const { data, fstring } = props;
  // %s •C (%s) - %s •C (%s)

  return (
    <span>
      {fstring.split("%s").map((part, index) => {
        return index === fstring.split("%s").length - 1 ? (
          <span key={index}>{part}</span>
        ) : (
          <span key={index}>
            {part}
            <RangeCheckedFieldData fieldData={data[index] as I_PISFieldData} />
          </span>
        );
      })}
    </span>
  );
}

type FieldDataFormatterProps = {
  data: I_PISFieldData[];
  fstring?: string;
  hover?: string;
};

function FieldDataFormatter(props: FieldDataFormatterProps): JSX.Element {
  const { data, fstring } = props;
  return (
    <div className="relative flex-1 items-center">
      <div className="absolute -top-1.5 line-clamp-1 w-full pr-2 text-end">
        {fstring ? (
          <FormatString data={data} fstring={fstring} />
        ) : (
          <RangeCheckedFieldData fieldData={data[0] as I_PISFieldData} />
        )}
      </div>
    </div>
  );
}

type FieldPrinterProps = {
  field: I_PISField;
};

function FieldPrinter(props: FieldPrinterProps): JSX.Element {
  const { setCurrentAppState } = useAppState();
  const { field } = props;

  const handleAddToFavourites = useCallback(() => {
    const storedFavourites = localStorage.getItem("favourites");
    const parsedFavourites: string[] = storedFavourites
      ? (JSON.parse(storedFavourites) as string[])
      : [];

    if (
      !parsedFavourites.some((fav) => fav === field.name) &&
      typeof field.name === "string"
    ) {
      if (parsedFavourites.length === 8 && typeof field.name === "string") {
        parsedFavourites.shift();
      }
      parsedFavourites.push(field.name);
      setCurrentAppState((prev) => ({
        ...prev,
        favourites: parsedFavourites,
      }));
      localStorage.setItem("favourites", JSON.stringify(parsedFavourites));
    }
  }, [field.name, setCurrentAppState]);

  if (
    field.fstring !== undefined &&
    (field?.fstring.match(/%s/g) || []).length !== field.data.length
  ) {
    global.console.error(
      "PIS ERROR: The fstring must contain the same amount of %s's as PIS data fields",
    );
    return <div>PIS ERROR: </div>;
  }

  return (
    <div className="group mt-1 flex items-center justify-between text-xs">
      {!field.isFault && (
        <span
          className="mt-1 hidden cursor-pointer items-center whitespace-nowrap text-xs font-bold text-helios group-hover:flex"
          onClick={handleAddToFavourites}
        >
          Add to Favourites
        </span>
      )}
      <div className="flex w-full items-center justify-between gap-2">
        <p
          className={`mt-1 flex items-center justify-between text-xs ${field.isFault ? "" : "group-hover:hidden"}`}
        >
          {field.name}
        </p>
        <FieldDataFormatter data={field.data} fstring={field.fstring} />
      </div>
    </div>
  );
}

type FieldsPrinterProps = {
  fields: I_PISField[];
  depth?: number;
};

function FieldsPrinter(props: FieldsPrinterProps): JSX.Element {
  const { depth = 0, fields } = props;
  const isFullscreen = useFullscreen();

  // get the max height class based on depth, but only do this if not in fullscreen
  const getMaxHeightClass = () => {
    if (isFullscreen) return ""; // no max height restriction in fullscreen

    if (depth >= 3) return "max-h-[100px]";
    return "max-h-[260px]";
  };

  return (
    <div
      className={`block overflow-x-hidden md:grid md:grid-cols-3 md:gap-x-2 lg:block lg:overflow-x-hidden ${getMaxHeightClass()}`}
    >
      {fields.map((field, index) => (
        <FieldPrinter field={field} key={index} />
      ))}
    </div>
  );
}
type PIStransformerProps = {
  root: I_PIS;
  depth?: number;
};

function PISTransformer(props: PIStransformerProps): JSX.Element {
  const { depth = 0, root } = props;
  const formatKey = (key: string): string => {
    return key
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between lowercase and uppercase
      .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2") // Add space between consecutive uppercase followed by lowercase
      .replace(/([a-zA-Z])(\d)/g, "$1 $2"); // Add space between letters and numbers
  };

  return (
    root && (
      <div className="flex size-full flex-col gap-x-2 lg:h-[375px] lg:flex-wrap xl:h-[350px]">
        {Object.keys(root).map((key, index) => {
          const value = root[key];
          return (
            <div className={`flex flex-col`} id={key} key={index}>
              <div className="flex w-full items-center justify-evenly border-b-2 border-helios">
                <p
                  className={`pt-3 font-bold text-helios ${
                    depth >= 2 ? `text-xs` : depth === 1 ? "text-sm" : "text-lg"
                  }`}
                >
                  {formatKey(key)}
                </p>
              </div>
              {Array.isArray(value) ? (
                <FieldsPrinter depth={depth + 1} fields={value} />
              ) : (
                <PISTransformer depth={depth + 1} root={value as I_PIS} />
              )}
            </div>
          );
        })}
      </div>
    )
  );
}

export default PISTransformer;
