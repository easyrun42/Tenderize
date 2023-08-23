import React from "react";
import * as S from "./styles";
import Image from "next/image";
import TokenListPortfolio from "../TokenListPortfolio/TokenListPortfolio";
import { useAccount } from "wagmi";

const TokenList = () => {
  const { address } = useAccount();
  return (
    <S.TokenList>
      <Image width={236} height={170} src="/image/steak.png" alt="steak" />
      <S.TokenListTitle>Your Tenderize Portfolio</S.TokenListTitle>
      <TokenListPortfolio userAddress={address ?? ""} />
    </S.TokenList>
  );
};

export default TokenList;
