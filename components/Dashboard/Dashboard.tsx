import React from "react";
import ApplicationView from "../ApplicationView/ApplicationView";
import { useAccount } from "wagmi";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import TokenList from "../TokenList/TokenList";

const Dashboard = () => {
  const { isConnected } = useAccount();

  if (!isConnected) return <ConnectWallet />;

  return <TokenList />;
};

export default Dashboard;
