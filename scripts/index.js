const ctx = document.getElementById("digital-chart");
const ctx2 = document.getElementById("analog-chart");
const modal = document.getElementById("modal");


Chart.defaults.color = "#8c8c8c";

new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
    ],
    datasets: [
      {
        data: [0, 1, 0, 1, 1, 1, 1, 0, 0, 0],
        borderWidth: 1.5,
        backgroundColor: "#FF6F00",
        borderColor: "#FF6F00",
      },
    ],
  },
  options: {
    plugins: {
      legend: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#2c2d30",
        },
      },
      x: {
        grid: {
          color: "#2c2d30",
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 30,
        bottom: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});

new Chart(ctx2, {
  type: "line",
  data: {
    labels: [
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
      ["\n", "MM:DD", "HH:MM:SS"],
    ],
    datasets: [
      {
        label: "a",
        data: [0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
        borderWidth: 1.5,
        backgroundColor: "#3F51B5",
        borderColor: "#3F51B5",
      },
    ],
  },
  options: {
    plugins: {
      legend: false,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#2c2d30",
        },
      },
      x: {
        grid: {
          color: "#2c2d30",
        },
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 30,
        bottom: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  },
});
