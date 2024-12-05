const filters: string[] = [
  "Motor Temperature",
  "Battery Consumption",
  "Average Speed",
  "Brake Time",
  "Power Out",
  "Battery Voltage",
  "Battery Current",
] as const;

export default function FeatureFilters() {
  return (
    <div className="flex max-w-44 flex-col gap-1 md:w-auto">
      {filters.map((filter) => (
        <div className="flex items-center space-x-2" key={filter}>
          <input
            className="size-4 accent-[#B94A6C]"
            id={filter}
            name={filter}
            type="checkbox"
          />
          <span>{filter}</span>
        </div>
      ))}
    </div>
  );
}
