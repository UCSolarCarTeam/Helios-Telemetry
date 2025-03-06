import {
  ArcElement,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

import { getChartConfig } from "../../config/chartConfig";

// Register the required elements, controllers, and plugins
ChartJS.register(ArcElement, DoughnutController, Tooltip, Legend);

interface DonutChartProps {
  percentage: number;
  chartHeight: number;
  chartWidth: number;
  fontSize: string;
  thickness: string;
}

const DonutChartRect: React.FC<DonutChartProps> = ({
  fontSize,
  percentage,
  thickness,
}) => {
  const circumference = 310;

  // Doughnut chart configuration
  const data = {
    datasets: [
      {
        backgroundColor: ["#CF4242", "#e0daf0"], // Colors for filled and remaining parts
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
    <div className="flex h-[4.4rem] w-[4.4rem] items-center justify-center">
      <Doughnut
        data={config.data}
        options={config.options}
        plugins={[plugins]}
      />
    </div>
  );
};
export default DonutChartRect;
