import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

import { getChartConfig } from "../../config/chartConfig";

// Register the required elements, controllers, and plugins
Chart.register(ArcElement, DoughnutController, Tooltip, Legend);

interface DonutChartProps {
  percentage: number;
  fontSize: string;
  thickness: string;
  height: string;
  width: string;
  numColour: string;
  leftoverColour: string;
}

const DonutChartRect: React.FC<DonutChartProps> = ({
  fontSize,
  height,
  leftoverColour,
  numColour,
  percentage,
  thickness,
  width,
}) => {
  const circumference = 310;

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
    <div className={`flex items-center justify-center ${height} ${width}`}>
      <Doughnut
        data={config.data}
        options={config.options}
        plugins={config.plugins}
      />
    </div>
  );
};
export default DonutChartRect;
