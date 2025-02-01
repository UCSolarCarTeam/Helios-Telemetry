import {
  ArcElement,
  Chart,
  ChartData,
  ChartOptions,
  ChartType,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef } from "react";

import { getChartConfig } from "./chartConfig";

// Register the required elements, controllers, and plugins for the doughnut chart
Chart.register(ArcElement, DoughnutController, Tooltip, Legend);
interface DonutChartProps {
  percentage: number;
  fontSize: string;
  chartColour: string;
  thickness: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  chartColour,
  fontSize,
  percentage,
  thickness,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null); // Track the chart instance

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Doughnut chart configuration
    const data: ChartData<"doughnut"> = {
      datasets: [
        {
          backgroundColor: [
            chartColour, // dark purple color for the percentage
            "#e0daf0", // light purple color for the remaining part
          ],
          data: [percentage, 100 - percentage], // Data for the percentage and remaining

          hoverOffset: 4,
        },
      ],
    };
    //typeof(data);

    const config = getChartConfig(data, percentage, thickness, fontSize);

    if (chartRef.current) {
      // Create a new chart instance
      chartInstance.current = new Chart(chartRef.current, config);
    }

    return () => {
      // Cleanup the chart instance on unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [percentage, fontSize]); // Re-render chart if percentage changes

  return (
    <div className="flex h-[6.25rem] w-[6.25rem] items-center justify-center">
      <canvas className=".block" ref={chartRef}></canvas>
    </div>
  );
};

export default DonutChart;
