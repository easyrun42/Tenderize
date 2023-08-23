import React from "react";
import Image from "next/image";
import * as S from "./styles";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ConnectWallet = () => {
  return (
    <S.ConnectWallet>
      <Image width={236} height={170} src="/image/steak.png" alt="steak" />
      <S.Tender>
        Almost there! Just connect your wallet to dive into Tenderize
      </S.Tender>
      <ConnectButton />
    </S.ConnectWallet>
  );
};

export default ConnectWallet;
