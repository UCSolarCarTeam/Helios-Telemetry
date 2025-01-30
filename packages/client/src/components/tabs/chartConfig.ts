import { ChartOptions, ChartType } from "chart.js";

export const getChartConfig = (
  data: number,
  percentage: number,
  thickness: number,
  fontSize: string,
) => {
  return {
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
};
