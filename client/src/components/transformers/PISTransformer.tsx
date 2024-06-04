import type I_PIS from "@/objects/PIS/PIS.interface";
import type { I_PISField, I_PISFieldData } from "@/objects/PIS/PIS.interface";

type RangeCheckedFieldDataProps = {
  fieldData: I_PISFieldData;
};

function RangeCheckedFieldData(props: RangeCheckedFieldDataProps): JSX.Element {
  const { value, unit, min, max, expectedBool } = props.fieldData;
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
  return (
    <span className={`m-1` + " " + color}>
      {FieldUnitsHandler(unit, displayValue)}
    </span>
  );
}

type FormatStringProps = {
  fstring: string;
  data: I_PISFieldData[];
};

function FormatString(props: FormatStringProps): JSX.Element {
  const { fstring, data } = props;
  // %s •C (%s) - %s •C (%s)
  // console.log("TEST", fstring.split("%s"));

  return (
    <span>
      {fstring.split("%s").map((part, index) => {
        return index === fstring.split("%s").length - 1 ? (
          <span key={index}>{part}</span>
        ) : (
          <span key={index}>
            {part}
            <RangeCheckedFieldData fieldData={data[index]} />
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

  const formatString = (string: string, params: I_PISFieldData[]) => {
    // %s •C (%s) - %s •C (%s)
    console.log("TEST", string.split("%s"));
    return string
      .split("%s")
      .map((part, index) => {
        typeof params[index] === "undefined" ? (
          ""
        ) : (
          <>
            <RangeCheckedFieldData fieldData={params[index]} />
            {part}
          </>
        );
      })
      .join("");
  };

  return fstring === undefined ? (
    <div>
      <RangeCheckedFieldData fieldData={data[0]} />
    </div>
  ) : (
    <div>
      <FormatString fstring={fstring} data={data} />
    </div>
  );
}

type FieldPrinterProps = {
  field: I_PISField;
};

function FieldPrinter(props: FieldPrinterProps): JSX.Element {
  const { field } = props;
  if (
    field.fstring !== undefined &&
    (field?.fstring.match(/%s/g) || []).length !== field.data.length
  ) {
    console.error(
      "PIS ERROR: The fstring must contain the same amount of %s's as PIS data fields",
    );
    return <div>PIS ERROR: </div>;
  }
  return (
    <div className="mt-1 flex items-center justify-between text-xs">
      {field.name}:
      <FieldDataFormatter data={field.data} fstring={field.fstring} />
    </div>
  );
}

type FieldsPrinterProps = {
  fields: I_PISField[];
  depth?: number;
};

function FieldsPrinter(props: FieldsPrinterProps): JSX.Element {
  const { fields, depth = 0 } = props;
  return (
    <div
      className={`block overflow-x-hidden md:grid md:grid-cols-3 md:gap-x-2 lg:block  lg:overflow-x-hidden ${depth >= 3 ? `max-h-[100px]` : depth === 2 ? `max-h-[260px]` : `max-h-[260px]`}`}
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
  const { root, depth = 0 } = props;
  return (
    root && (
      <div className="flex size-full flex-col gap-x-2 lg:h-[375px] lg:flex-wrap xl:h-[330px]">
        {Object.keys(root).map((key, index) => {
          const value = root[key];
          return (
            <div key={index} id={key} className={`flex flex-col `}>
              <div className="border-helios flex w-full items-center justify-evenly border-b-2">
                <p
                  className={`text-helios pt-3 font-bold ${
                    depth >= 2 ? `text-xs` : depth === 1 ? "text-sm" : "text-lg"
                  }`}
                >
                  {key}
                </p>
              </div>
              {Array.isArray(value) ? (
                <FieldsPrinter fields={value} depth={depth + 1} />
              ) : (
                <PISTransformer root={value} depth={depth + 1} />
              )}
            </div>
          );
        })}
      </div>
    )
  );
}

export default PISTransformer;
