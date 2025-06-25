import { useEffect, useRef } from "react";

function Charts({ chartType }) {
  const chartIdMap = {
    overview: "overviewChart",
    engagement: "engagementChart",
    category: "categoryChart",
    traffic: "trafficChart",
  };
  const chartId = chartIdMap[chartType];
  const chartRef = useRef(null);

  useEffect(() => {
    // Chart.js must be loaded globally (via CDN in index.html)
    // Only run chart.js logic if Chart is available
    const ChartGlobal =
      typeof window !== "undefined" ? window.Chart : undefined;
    if (!ChartGlobal) return;

    // Import the renderCharts function dynamically
    import("../js/chart").then((mod) => {
      if (typeof mod.default === "function") {
        mod.default();
      }
    });
    // Optionally, you could clean up/destroy charts here if needed
  }, [chartType]);

  return (
    <div className="w-full h-full">
      <canvas
        id={chartId}
        ref={chartRef}
        className="w-full h-full"
        style={{ minHeight: 200 }}
      />
    </div>
  );
}

export default Charts;
//         "Sep",
//         "Oct",
//       ],
//       datasets: [
//         {
//           label: "Total Funds Raised (GH₵)",
//           data: [
//             5000, 10000, 12000, 15000, 18000, 22000, 25000, 28000, 30000, 35000,
//           ],
//           borderColor: "#22c55e",
//           backgroundColor: "rgba(34, 197, 94, 0.1)",
//           borderWidth: 2,
//           fill: true,
//           tension: 0.4,
//         },
//       ],
//     };

//     const options = {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           display: true,
//           position: "top",
//         },
//         tooltip: {
//           mode: "index",
//           intersect: false,
//           callbacks: {
//             label: function (context) {
//               let label = context.dataset.label || "";
//               if (label) {
//                 label += ": ";
//               }
//               if (context.parsed.y !== null) {
//                 label += "GH₵ " + context.parsed.y.toLocaleString();
//               }
//               return label;
//             },
//           },
//         },
//       },
//       scales: {
//         x: {
//           grid: {
//             display: false,
//           },
//         },
//         y: {
//           beginAtZero: true,
//           grid: {
//             color: "rgba(0, 0, 0, 0.05)",
//           },
//           ticks: {
//             callback: function (value) {
//               return "GH₵" + value.toLocaleString();
//             },
//           },
//         },
//       },
//     };

//     //return <Line data={data} options={options} />;
//   }

//   if (chartType === "expenses") {
//     // Sample data for expenses over time
//     const data = {
//       labels: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//       ],
//       datasets: [
//         {
//           label: "Total Expenses (GH₵)",
//           data: [1000, 1500, 2000, 1800, 2300, 2500, 3000, 2800, 3200, 3500],
//           borderColor: "#ef4444",
//           backgroundColor: "rgba(239, 68, 68, 0.1)",
//           borderWidth: 2,
//           fill: true,
//           tension: 0.4,
//         },
//       ],
//     };

//     const options = {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           display: true,
//           position: "top",
//         },
//         tooltip: {
//           mode: "index",
//           intersect: false,
//           callbacks: {
//             label: function (context) {
//               let label = context.dataset.label || "";
//               if (label) {
//                 label += ": ";
//               }
//               if (context.parsed.y !== null) {
//                 label += "GH₵ " + context.parsed.y.toLocaleString();
//               }
//               return label;
//             },
//           },
//         },
//       },
//       scales: {
//         x: {
//           grid: {
//             display: false,
//           },
//         },
//         y: {
//           beginAtZero: true,
//           grid: {
//             color: "rgba(0, 0, 0, 0.05)",
//           },
//           ticks: {
//             callback: function (value) {
//               return "GH₵" + value.toLocaleString();
//             },
//           },
//         },
//       },
//     };

//     return <Line data={data} options={options} />;
//   }

//   if (chartType === "netBalance") {
//     // Sample data for net balance over time
//     const data = {
//       labels: [
//         "Jan",
//         "Feb",
//         "Mar",
//         "Apr",
//         "May",
//         "Jun",
//         "Jul",
//         "Aug",
//         "Sep",
//         "Oct",
//       ],
//       datasets: [
//         {
//           label: "Net Balance (GH₵)",
//           data: [
//             4000, 8500, 10000, 13200, 15700, 19500, 22000, 25200, 26800, 31500,
//           ],
//           borderColor: "#3b82f6",
//           backgroundColor: "rgba(59, 130, 246, 0.1)",
//           borderWidth: 2,
//           fill: true,
//           tension: 0.4,
//         },
//       ],
//     };

//     const options = {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           display: true,
//           position: "top",
//         },
//         tooltip: {
//           mode: "index",
//           intersect: false,
//           callbacks: {
//             label: function (context) {
//               let label = context.dataset.label || "";
//               if (label) {
//                 label += ": ";
//               }
//               if (context.parsed.y !== null) {
//                 label += "GH₵ " + context.parsed.y.toLocaleString();
//               }
//               return label;
//             },
//           },
//         },
//       },
//       scales: {
//         x: {
//           grid: {
//             display: false,
//           },
//         },
//         y: {
//           beginAtZero: true,
//           grid: {
//             color: "rgba(0, 0, 0, 0.05)",
//           },
//           ticks: {
//             callback: function (value) {
//               return "GH₵" + value.toLocaleString();
//             },
//           },
//         },
//       },
//     };

//     return <Line data={data} options={options} />;
//   }

//   return (
//     <div className="w-full h-full">
//       <canvas
//         id={chartId}
//         ref={chartRef}
//         className="w-full h-full"
//         style={{ minHeight: 200 }}
//       />
//     </div>
//   );
// }

// export default Charts;
