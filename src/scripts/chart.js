// Import Chart.js
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

// Register the required components
Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Title,
  Tooltip // <-- Add this!
);

// Chart data and configuration
const data = {
  labels: ["HTML", "CSS", "JavaScript", "GSAP", "Api", "Git"],
  datasets: [
    {
      label: "My Skills",
      data: [80, 70, 60, 50, 55, 50],
      backgroundColor: "rgba(54, 162, 235, 0.2)", // Transparent fill
      borderColor: "rgba(54, 162, 235, 1)", // Border color
      borderWidth: 2,
    },
  ],
};

// custom messages
const customMessages = [
  "'Div-ine' structure, but no meaning.",
  "I have 99 problems, and z-index is all of them.",
  "Where 1 + '1' equals '11'—because logic.",
  "Turning 'smooth animations' into 'smooth headaches.'",
  "'Why do you hate me?' – Me, after a 429 error.",
  "Commit messages? More like my diary: 'Fixed stuff' x100."
];

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Tooltip background
      titleColor: "#ffffff", // Tooltip title color
      bodyColor: "#ffffff", // Tooltip body color
      callbacks: {
         label: function (context) {
    const index = context.dataIndex;
    const message = customMessages[index] || "";
    return `${message}`;
  }
      },
    },
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#ffffff", // Change the legend text color
      },
    },
  },
    interaction: {
      mode: "nearest", // Ensure this is set to 'nearest' or 'point'
      intersect: true, // Ensures the tooltip appears only when directly over a point
    },
  scales: {
    r: {
      angleLines: {
        color: "#999999", // Angle lines color
      },
      grid: {
        color: "#666666", // Grid lines color
      },
      pointLabels: {
        color: " hsl(180, 89%, 32%)", // Change the color of labels around the chart
        font: {
          size: 14, // Optional: Adjust font size
          family: "Arial", // Optional: Set font family
        },
      },
      ticks: {
        stepSize: 20, // Steps between ticks
        min: 0, // Starting value for the scale
        max: 100, // Maximum value for the scale
        color: "#ffffff",
        callback: (value) => `${value}%`, // Add '%' to tick labels
        backdropColor: "rgba(0, 0, 0, 0)",
      },
      suggestedMin: 0, // Ensure the minimum suggested value starts at 0
      suggestedMax: 100, // Ensure the maximum suggested value ends at 100
    },
  },
};

// Create and render the chart
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "radar",
  data: data,
  options: options,
});
