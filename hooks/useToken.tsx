import { BigNumber } from "bignumber.js";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

interface IUseToken {
  tokenAddress: string;
  tokenAbi: any[]; // abi
  functionName: string;
  userAddress: string;
}

export const useToken = ({
  tokenAddress,
  tokenAbi,
  functionName,
  userAddress,
}: IUseToken) => {
  const [tokenBalance, setTokenBalance] = useState(0);

  // Getting token balance from erc20 address
  const { data: _tokenBalance, isLoading: isLoadingTokenBalance } =
    useContractRead({
      address: tokenAddress as `0x`,
      abi: tokenAbi,
      functionName,
      args: [userAddress],
      chainId: 1,
    });

  // Getting token decimals from erc20 address
  const { data: _tokenDecimals, isLoading: isLoadingTokenDecimal } =
    useContractRead({
      address: tokenAddress as `0x`,
      abi: tokenAbi,
      functionName: "decimals",
      chainId: 1,
    });

  const tokenDecimals = typeof _tokenDecimals === "number" ? _tokenDecimals : 0;
  const tokenDivDecimals = 10 ** tokenDecimals;

  const tokenBalanceWei =
    typeof _tokenBalance === "bigint" ? _tokenBalance : BigInt(0);

  // Get total balance of token by dividing balance / token decimals
  const totalBalance = new BigNumber(tokenBalanceWei.toString())
    .div(tokenDivDecimals.toString())
    .dp(4)
    .toNumber();

  const isLoading = isLoadingTokenDecimal || isLoadingTokenBalance;

  const isValidTokenDecimal = tokenDecimals > 0;

  useEffect(() => {
    setTokenBalance(totalBalance);
  }, [totalBalance]);

  return {
    isValidTokenDecimal,
    tokenDecimals,
    isLoading,
    tokenBalance,
    setTokenBalance,
  };
};
