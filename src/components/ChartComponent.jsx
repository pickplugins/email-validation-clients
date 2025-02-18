import { useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import { useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: ''
    }
  }
}

//const labels = ["January", "February", "March", "April", "May", "June"]

const initialData = {
  labels: [],
  datasets: [

  ],
}

export default function ChartComponent({ entries }) {
  const [data, setData] = useState(initialData)



  useEffect(() => {
    var items = [];
    var labels = [];
    Object.entries(entries).map((args, index) => {
      labels.push(args[0])
      items.push({
				label: args[0],
				data: args[1],
				backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
					Math.random() * 255
				)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
			});

    })

    console.log(items)
    setData({ ...data, datasets: items, labels: labels })
  }, [entries]);


  return (
    <div className="w-full ">
      <Bar options={options} data={data} />
    </div>
  )
}

