// Ensure Chart.js is loaded globally (e.g., via <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> in index.html)
// Defensive checks for DOM and Chart existence

function renderCharts() {
  // Use Chart from window if available
  const ChartGlobal = (typeof window !== "undefined" && typeof window.Chart !== "undefined") ? window.Chart : undefined;
  if (!ChartGlobal) return;

  // Dashboard stats data and colors
  const statLabels = [
    "Active Projects",
    "Completed Projects",
    "Upcoming Projects",
    "Total Donors",
    "Total Beneficiaries",
    "Pending Users"
  ];
  const statData = [12, 8, 5, 10, 32, 14];
  const statColors = [
    "#22c55e", // green-500
    "#3b82f6", // blue-500
    "#f59e42", // yellow-500
    "#ec4899", // pink-500
    "#a78bfa", // purple-400
    "#f59e42"  // orange-400
  ];
  const statBgColors = [
    "rgba(34,197,94,0.2)",
    "rgba(59,130,246,0.2)",
    "rgba(245,158,66,0.2)",
    "rgba(236,72,153,0.2)",
    "rgba(167,139,250,0.2)",
    "rgba(245,158,66,0.2)"
  ];

  // Overview Chart (Bar)
  const overviewEl = document.getElementById('overviewChart');
  if (overviewEl) {
    const overviewCtx = overviewEl.getContext('2d');
    if (overviewEl._chartInstance) {
      overviewEl._chartInstance.destroy();
    }
    overviewEl._chartInstance = new ChartGlobal(overviewCtx, {
      type: 'bar',
      data: {
        labels: statLabels,
        datasets: [
          {
            label: "Overview",
            data: statData,
            backgroundColor: statBgColors,
            borderColor: statColors,
            borderWidth: 2,
            borderRadius: 10,
            maxBarThickness: 40,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: "index", intersect: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#374151", font: { weight: "bold" } }
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: { color: "#374151" }
          }
        }
      }
    });
  }

  // Engagement Chart (Line)
  const engagementEl = document.getElementById('engagementChart');
  if (engagementEl) {
    const engagementCtx = engagementEl.getContext('2d');
    if (engagementEl._chartInstance) {
      engagementEl._chartInstance.destroy();
    }
    engagementEl._chartInstance = new ChartGlobal(engagementCtx, {
      type: 'line',
      data: {
        labels: statLabels,
        datasets: [
          {
            label: "Engagement",
            data: statData,
            borderColor: "#22c55e",
            backgroundColor: "rgba(34,197,94,0.1)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: statColors,
            pointBorderColor: "#fff",
            pointRadius: 6,
            pointHoverRadius: 8,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { mode: "index", intersect: false }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: "#374151", font: { weight: "bold" } }
          },
          y: {
            beginAtZero: true,
            grid: { color: "rgba(0,0,0,0.05)" },
            ticks: { color: "#374151" }
          }
        }
      }
    });
  }

  // Category Chart (Doughnut)
  const categoryEl = document.getElementById('categoryChart');
  if (categoryEl) {
    const categoryCtx = categoryEl.getContext('2d');
    if (categoryEl._chartInstance) {
      categoryEl._chartInstance.destroy();
    }
    categoryEl._chartInstance = new ChartGlobal(categoryCtx, {
      type: 'doughnut',
      data: {
        labels: statLabels,
        datasets: [{
          data: statData,
          backgroundColor: statColors,
          borderWidth: 2,
          borderColor: "#fff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' }
        },
        cutout: "70%"
      }
    });
  }

  // Traffic Chart (Polar Area)
  const trafficEl = document.getElementById('trafficChart');
  if (trafficEl) {
    const trafficCtx = trafficEl.getContext('2d');
    if (trafficEl._chartInstance) {
      trafficEl._chartInstance.destroy();
    }
    trafficEl._chartInstance = new ChartGlobal(trafficCtx, {
      type: 'polarArea',
      data: {
        labels: statLabels,
        datasets: [{
          data: statData,
          backgroundColor: statColors,
          borderWidth: 2,
          borderColor: "#fff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' }
        }
      }
    });
  }
}

// Run on DOMContentLoaded and also export for dynamic import in React
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderCharts);
  } else {
    renderCharts();
  }
}

export default renderCharts;