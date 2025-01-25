import {
  ArcElement,
  Chart,
  ChartOptions,
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

    const config = {
      data: data,
      options: {
        borderColor: "#BFBFBF",
        circumference: 310,
        cutout: thickness, // Making it a doughnut chart (hole in the center)
        maintainAspectRatio: false, // Disable aspect ratio to allow custom size
        plugins: {
          // Add custom text plugin
          centerText: {
            text: percentage, // Text to display in the center
          },
          tooltip: {
            enabled: true, // Ensure tooltips still work
          },
        },

        responsive: true, // Ensure chart resizes
        rotation: 200,
      },
      plugins: [
        {
          beforeDraw(chart: {
            ctx: CanvasRenderingContext2D;
            chartArea: {
              top: number;
              bottom: number;
            };
            options: ChartOptions;
            width: number;
          }) {
            const { width } = chart;
            const ctx = chart.ctx;

            // get the coordinates of the center
            const centerX = width / 2;
            const centerY =
              chart.chartArea.top +
              (chart.chartArea.bottom - chart.chartArea.top) / 2;

            //get the text to display from options
            //const text = chart.options.plugins.centerText?.text || ""; // if theres no text, display nothing

            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.font = `${fontSize} Arial`;
            ctx.fillStyle = "#4D6BDB"; // Text color
            ctx.fillText(percentage.toString(), centerX, centerY);
            ctx.restore();
          },
          id: "centerText",
        },
      ],

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
  }, [percentage, fontSize]); // Re-render chart if percentage changes

  return (
    <div
      className={`flex items-center justify-center`}
      style={{
        height: chartHeight,
        width: chartWidth,
      }}
    >
      <canvas className=".block" ref={chartRef}></canvas>
    </div>
  );
};

export default DonutChartRect;
