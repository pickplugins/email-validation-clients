import React, { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Navigate } from "react-router-dom";


const Tab = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);


  return (
    <div>{children}</div>

  );
};

export default Tab;
