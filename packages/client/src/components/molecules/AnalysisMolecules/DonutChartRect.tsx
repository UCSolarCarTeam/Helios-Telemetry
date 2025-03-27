import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { twMerge } from "tailwind-merge";

import { getChartConfig } from "../../config/chartConfig";

// Register the required elements, controllers, and plugins
Chart.register(ArcElement, DoughnutController, Tooltip, Legend);

export interface DonutChartProps {
  percentage: number;
  fontSize?: string;
  thickness?: string;
  className?: string;
  numColour?: string;
  leftoverColour?: string;
  circ?: number;
  lowerBound?: number;
  upperBound?: number;
  subTitle?: string;
}

const DonutChartRect = ({
  circ = 310,
  className,
  fontSize = "1.4rem",
  leftoverColour = "white",
  lowerBound,
  numColour = "#CF4242",
  percentage,
  subTitle,
  thickness = "78%",
  upperBound,
}: DonutChartProps) => {
  const circumference = circ;

  // Doughnut chart configuration
  const data = {
    datasets: [
      {
        backgroundColor: [numColour, leftoverColour], // Colors for filled and remaining parts
        borderWidth: 0, // Remove border
        data: [percentage, 100 - percentage], // Data for the percentage and remaining
        hoverOffset: 4,
      },
    ],
  };

  const config = getChartConfig(
    data,
    percentage,
    thickness,
    fontSize,
    circumference,
  );
  return (
    <div className="flex w-32 items-center justify-center">
      <div
        className={twMerge(
          `flex size-16 flex-col items-center justify-center`,
          className,
        )}
      >
        <Doughnut
          data={config.data}
          options={config.options}
          plugins={config.plugins}
        />
        <div className="flex w-full items-center justify-between text-sm">
          <span className="text-primary">{lowerBound}</span>
          <span className="text-right text-green-dark">{upperBound}</span>
        </div>
        <p className="w-24 text-center text-xxs">{subTitle}</p>
      </div>
    </div>
  );
};
export default DonutChartRect;
