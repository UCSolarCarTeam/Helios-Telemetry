// DonutChart.tsx
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
            "rgb(255, 99, 100)", // Red color for the percentage
            "rgb(255, 255, 255)", // White color for the remaining part
          ],
          data: [percentage, 100 - percentage], // Data for the percentage and remaining
          hoverOffset: 4,
        },
      ],
      labels: ["Red", "Remaining"], // Labels for segments
    };

    const config = {
      data: data,
      options: {
        cutout: "70%", // Making it a doughnut chart (hole in the center)
        plugins: {
          legend: { display: false }, // Optional: Hide legend
          tooltip: { enabled: false }, // Optional: Disable tooltips
        },
        responsive: true,
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
  }, [percentage]); // Re-run chart rendering if percentage changes

  return (
    <canvas ref={chartRef} style={{ height: "150px", width: "150px" }}></canvas>
  ); // Adjust width and height
};

export default DonutChart;
