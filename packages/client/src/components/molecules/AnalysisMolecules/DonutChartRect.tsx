import {
  ArcElement,
  Chart,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef } from "react";

import { getChartConfig } from "../../config/chartConfig";

// Register the required elements, controllers, and plugins for the doughnut chart
Chart.register(ArcElement, DoughnutController, Tooltip, Legend);

interface DonutChartProps {
  percentage: number;
  chartHeight: number;
  chartWidth: number;
  fontSize: string;
  //chartColour: string;
  thickness: string;
}

const DonutChartRect: React.FC<DonutChartProps> = ({
  //chartColour,
  chartHeight,
  chartWidth,
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
    const data = {
      datasets: [
        {
          backgroundColor: [
            "#CF4242", // dark red color for the percentage
            "#e0daf0", // white color for the remaining part
          ],
          data: [percentage, 100 - percentage], // Data for the percentage and remaining

          hoverOffset: 4,
        },
      ],
    };

    const circumference = 310;
    const config = getChartConfig(
      data,
      percentage,
      thickness,
      fontSize,
      circumference,
    );

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
    <div className="flex h-[4.4rem] w-[4.4rem] items-center justify-center">
      <canvas className=".block" ref={chartRef}></canvas>
    </div>
  );
};

export default DonutChartRect;
