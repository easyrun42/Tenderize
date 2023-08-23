import React, { useEffect, useState } from "react";
import Token from "../Token/Token";
import * as S from "./styles";
import { ITokens, tokens as _tokens } from "../../utils/tokens";

interface ITokenListPortfolio {
  userAddress: string;
}

const TokenListPortfolio = ({ userAddress }: ITokenListPortfolio) => {
  const [tokens, setTokens] = useState<ITokens[]>([]);

  useEffect(() => {
    setTokens(_tokens);
  }, []);

  return (
    <S.TokenListPortfolio>
      {tokens.length
        ? tokens.map(({ name, erc20Address, abi, functionName }) => (
            <Token
              key={`${name}-${erc20Address}`}
              userAddress={userAddress}
              tokenName={name}
              tokenAddress={erc20Address}
              tokenAbi={abi}
              functionName={functionName}
            />
          ))
        : null}
    </S.TokenListPortfolio>
  );
};

export default TokenListPortfolio;
