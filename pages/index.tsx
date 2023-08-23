import React from "react";
import ApplicationView from "../components/ApplicationView/ApplicationView";
import { DynamicDashboard } from "../components";

const Home = () => {
  return (
    <ApplicationView>
      <DynamicDashboard />
    </ApplicationView>
  );
};

export default Home;
