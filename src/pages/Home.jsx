import React, { useContext } from "react";

import Layout from '../components/Layout'
import { useState, useEffect, Component } from "react";
import { AuthContext } from "../components/AuthContext";

const Home = () => {
  const { user, loading } = useContext(AuthContext);

  var [debounce, setDebounce] = useState("Hello"); // Using the hook.

  useEffect(() => {


  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}

export default Home