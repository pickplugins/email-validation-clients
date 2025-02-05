import Layout from '../components/Layout'
import { useState, useEffect, Component } from "react";

const Home = () => {
  var [debounce, setDebounce] = useState("Hello"); // Using the hook.

  useEffect(() => {

    console.log(debounce);

  }, []);


  return (
    <Layout>
      <h1>Home</h1>
    </Layout>
  )
}

export default Home