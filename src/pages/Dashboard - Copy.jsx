import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import Layout from "../components/Layout";
import UserAccount from "../components/UserAccount";
import GlobalHeader from "../components/GlobalHeader";
import UserProfileEdit from "../components/UserProfileEdit";
import Login from '../components/Login';
import Register from '../components/Register';
import { useState, useEffect } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Line } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );


import {
  IconBasketCheck,
  IconClipboardList,
  IconMailSpark,
  IconCloudDataConnection,
  IconDashboard,
  IconCalculator,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
  IconRotateRectangle,
} from "@tabler/icons-react";


const Dashboard = () => {
  const { userData, token } = useContext(AuthContext);
  // const token = localStorage.getItem("token");

  var [appData, setappData] = useState(window.appData);

  // useEffect(() => {
  //   setappData(window.appData)
  // }, [window.appData]);

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: 'top',
  //     },
  //     title: {
  //       display: true,
  //       text: 'Chart.js Line Chart',
  //     },
  //   },
  // };

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: 'Dataset 1',
  //       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  //       borderColor: 'rgb(255, 99, 132)',
  //       backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //     },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
  //       borderColor: 'rgb(53, 162, 235)',
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  return (
    <Layout >
      {userData && (
        <div className="p-5">

          <div className="grid gap-4 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 text-white">

            <div className="bg-blue-600 p-3 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="w-[50px]">
                  <IconClipboardList size="40" />
                </div>
                <div>
                  <div className="text-md">Total Task</div>
                  <div className="text-3xl">123</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 p-3 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="w-[50px]">
                  <IconMailSpark size="40" />
                </div>
                <div>
                  <div className="text-md">Total Email Validated</div>
                  <div className="text-3xl">123</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 p-3 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="w-[50px]">
                  <IconCloudDataConnection size="40" />
                </div>
                <div>
                  <div className="text-md">Total API Keys</div>
                  <div className="text-3xl">123</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 p-3 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="w-[50px]">
                  <IconBasketCheck size="40" />
                </div>
                <div>
                  <div className="text-md">Total Orders</div>
                  <div className="text-3xl">123</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 p-3 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="w-[50px]">
                  <IconCalculator size="40" />
                </div>
                <div>
                  <div className="text-md">Total Credits Used</div>
                  <div className="text-3xl">123</div>
                </div>
              </div>
            </div>






          </div>

          <div>
            {/* <Line options={options} data={data} /> */}
            {/* <Doughnut data={data} /> */}

          </div>

        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
