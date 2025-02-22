import { useState } from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import { useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement)

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       //position: 'top',
//     },
//     title: {
//       display: true,
//       text: ''
//     }
//   }
// }

//const labels = ["January", "February", "March", "April", "May", "June"]

const initialData = {
  labels: [],
  datasets: [

  ],
}



const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const initialData = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => 500),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => 300),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

export default function ChartComponent({ chartData }) {
  const [data, setData] = useState(initialData)



  useEffect(() => {

    setData({ ...data, datasets: chartData.datasets, labels: chartData.labels })
  }, [chartData]);


  return (
    <div className="w-full ">
      {/* <Bar options={options} data={data} /> */}
      <Line options={options} data={data} />
    </div>
  )
}

