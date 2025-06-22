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
