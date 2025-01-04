import {
  ArcElement,
  Chart,
  ChartType,
  DoughnutController,
  Legend,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef } from "react";

// Register the required elements, controllers, and plugins for the doughnut chart
Chart.register(ArcElement, DoughnutController, Tooltip, Legend);

interface DonutChartProps {
  percentage: number;
}

const DonutChart: React.FC<DonutChartProps> = ({ percentage }) => {
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
            "#65558F", // dark purple color for the percentage
            "#e0daf0", // light purple color for the remaining part
          ],
          data: [percentage, 100 - percentage], // Data for the percentage and remaining

          hoverOffset: 4,
        },
      ],
    };

    const config = {
      data: data,
      options: {
        borderColor: "#BFBFBF",
        cutout: "80%", // Making it a doughnut chart (hole in the center)
        maintainAspectRatio: false, // Disable aspect ratio to allow custom size
        responsive: true, // Ensure chart resizes
      },
      type: "doughnut" as ChartType, // Explicitly casting to ChartType
    };

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
  }, [percentage]); // Re-render chart if percentage changes

  return (
    <canvas
      height={150} // Set the canvas height explicitly
      ref={chartRef}
      width={150} // Set the canvas width explicitly
    ></canvas>
  );
};

export default DonutChart;
