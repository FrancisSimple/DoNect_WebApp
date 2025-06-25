import { useEffect, useRef } from "react";

function TransactionCharts({ chartType }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Chart.js must be loaded globally (via CDN in index.html)
    const ChartGlobal =
      typeof window !== "undefined" ? window.Chart : undefined;
    if (!ChartGlobal) return;

    // Clean up previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
      chartInstanceRef.current = null;
    }

    const chartId = `${chartType}Chart`;
    const canvas = document.getElementById(chartId);
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let data, options;

    // Configure data and options based on chart type
    if (chartType === "totalRaised") {
      data = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Total Funds Raised (GH₵)",
            data: [
              5000, 10000, 12000, 15000, 18000, 22000, 25000, 28000, 30000,
              35000, 40000, 45000,
            ],
            borderColor: "#22c55e",
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      };
    } else if (chartType === "expenses") {
      data = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Total Expenses (GH₵)",
            data: [1000, 1500, 2000, 1800, 2300, 2500, 3000, 2800, 3200, 3500, 4000, 4500],
            borderColor: "#ef4444",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      };
    } else if (chartType === "netBalance") {
      data = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Net Balance (GH₵)",
            data: [
              4000, 8500, 10000, 13200, 15700, 19500, 22000, 25200, 26800,
              31500, 35000, 40000, 45000,
            ],
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      };
    }

    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += "GH₵ " + context.parsed.y.toLocaleString();
              }
              return label;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0, 0, 0, 0.05)",
          },
          ticks: {
            callback: function (value) {
              return "GH₵" + value.toLocaleString();
            },
          },
        },
      },
    };

    // Create the chart
    if (data && options) {
      chartInstanceRef.current = new ChartGlobal(ctx, {
        type: "line",
        data: data,
        options: options,
      });
    }

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [chartType]);

  return (
    <div className="w-full h-full">
      <canvas
        id={`${chartType}Chart`}
        ref={chartRef}
        className="w-full h-full"
        style={{ minHeight: 200 }}
      />
    </div>
  );
}

export default TransactionCharts;
