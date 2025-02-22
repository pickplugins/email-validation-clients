import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";


const Spinner = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(0);
  const childrenArray = React.Children.toArray(children);


  return (
    <div className="w-full  mx-auto ">
      <div className="flex border-b border-gray-300">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`py-2 px-4 text-sm text-white bg-amazon-400 font-medium focus:outline-none transition-all cursor-pointer ${activeTab === index
              ? " bg-amazon-600 "
              : " "
              }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 ">
        {childrenArray.find(child => child.props.index === activeTab)}
      </div>
    </div>


  );
};

export default Spinner;
