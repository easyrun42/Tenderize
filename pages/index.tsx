import React from "react";
import { useAccount } from "wagmi";
import Dashboard from "../components/Dashboard/Dashboard";
import ApplicationView from "../components/ApplicationView/ApplicationView";

const Home = () => {
  return (
    <ApplicationView>
      <Dashboard />
    </ApplicationView>
  );
};

export default Home;
