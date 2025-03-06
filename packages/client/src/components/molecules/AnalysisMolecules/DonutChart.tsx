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
}

const DonutChartRect: React.FC<DonutChartProps> = ({
  fontSize,
  percentage,
  thickness,
}) => {
  const circumference = 360;

  // Doughnut chart configuration
  const data = {
    datasets: [
      {
        backgroundColor: ["#65558F", "#e0daf0"], // Colors for filled and remaining parts
        borderWidth: 0, // Remove border
        data: [percentage, 100 - percentage], // Data for the percentage and remaining
        hoverOffset: 4,
      },
    ],
  };

  const config = getChartConfig( //pass data to config
    data,
    percentage,
    thickness,
    fontSize,
    circumference,
  );

  return (
    <div className="flex h-[6.4rem] w-[6.4rem] items-center justify-center">
      <Doughnut
        data={config.data}
        options={config.options}
        plugins={config.plugins}
      />
    </div>
  );
};
export default DonutChartRect;
