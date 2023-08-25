import React from "react";
import ApplicationView from "../components/ApplicationView/ApplicationView";
import { DynamicDashboard } from "../components";
import { Toaster } from "react-hot-toast";

const Home = () => {
  return (
    <ApplicationView>
      <DynamicDashboard />
      <Toaster />
    </ApplicationView>
  );
};

export default Home;
