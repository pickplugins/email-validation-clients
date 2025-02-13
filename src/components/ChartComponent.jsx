import { useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Sales",
    },
  },
}

const labels = ["January", "February", "March", "April", "May", "June"]

const initialData = {
  labels,
  datasets: [
    {
      label: "Sales",
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

export default function ChartComponent() {
  const [data, setData] = useState(initialData)

  const regenerateData = () => {
    const newData = {
      ...data,
      datasets: [
        {
          ...data.datasets[0],
          data: labels.map(() => Math.floor(Math.random() * 1000)),
        },
      ],
    }
    setData(newData)
  }

  return (
    <div className="w-full max-w-2xl">
      <div>
        <h3>Monthly Sales Chart</h3>
        <p>A breakdown of sales performance over the last 6 months</p>
      </div>
      <div>
        <Bar options={options} data={data} />
        <button
          onClick={regenerateData}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          Regenerate Data
        </button>
      </div>
    </div>
  )
}

