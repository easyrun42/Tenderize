import React, { Fragment, useEffect, useState } from "react";
import * as S from "./styles";
import {
  useChainId,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { Abi, Narrow, formatEther, formatGwei, isAddress } from "viem";
import { BigNumber } from "bignumber.js";
import { useToken } from "../../hooks/useToken";
import Loading from "../Loading/Loading";
import useTokenTransfer from "../../hooks/useTokenTransfer";
import { ethers } from "ethers";
import { switchNetwork } from "@wagmi/core";

interface IToken {
  tokenName: string;
  tokenAddress: string;
  tokenAbi: any[]; // erc20 abi
  functionName: string;
  userAddress: string;
}

const Token = ({
  tokenAddress,
  tokenName,
  tokenAbi,
  functionName,
  userAddress,
}: IToken) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [shouldShowTransferInput, setShouldShowTransferInput] = useState(false);

  const reset = () => {
    setShouldShowTransferInput(false);
    setAddress("");
    setAmount("");
  };

  const checkSummedAddress = isAddress(address)
    ? ethers.utils.getAddress(address.toLowerCase())
    : "";

  const {
    refetch: refetchToken,
    isLoading: isLoadingToken,
    setTokenBalance,
    tokenBalance,
    tokenDecimals,
    isValidTokenDecimal,
  } = useToken({
    tokenAddress,
    tokenAbi,
    userAddress,
    functionName,
  });

  const { transfer, isLoadingTransaction } = useTokenTransfer({
    tokenAddress,
    tokenAbi,
    reset,
    functionName: "transfer",
    userAddress: checkSummedAddress,
    refetchToken,
    amount:
      isValidTokenDecimal && amount
        ? ethers.utils.parseUnits(amount, tokenDecimals).toString()
        : "0",
  });

  const { chain } = useNetwork();

  const isNotOnEthereumMainnet = chain?.id !== 1;

  const isLoading = isLoadingToken || isLoadingTransaction;

  const onTransferSubmit = () => {
    setShouldShowTransferInput(true);
  };

  const transferTokens = async () => {
    try {
      if (!transfer) {
        return alert("We couldn't transfer funds. Please try again later.");
      }

      await transfer();
    } catch (err) {
      alert(`Failed to send tokens. Error: ${(err as Error).message}`);
    }
  };

  const onTransfer = () => {
    const isValidAddress = isAddress(address);

    if (!isValidAddress) {
      return alert("Please enter a valid address!");
    }

    const numberAmount = Number(amount);

    if (numberAmount > tokenBalance) {
      return alert("You do not have enough funds to transfer");
    }

    transferTokens();
  };

  const switchToMainnet = async () => {
    try {
      await switchNetwork({ chainId: 1 });
    } catch (err) {
      alert(`Failed to switch network. Error: ${(err as Error).message}`);
    }
  };

  return (
    <S.Token>
      <S.TokenHeader>
        <S.TokenHeaderTitle>{tokenName} Balance</S.TokenHeaderTitle>
      </S.TokenHeader>

      <S.TokenResult>
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <S.TokenResultBalanceText>{tokenBalance}</S.TokenResultBalanceText>
            {shouldShowTransferInput ? (
              <Fragment>
                <S.TokenTransferInputText>To Address</S.TokenTransferInputText>
                <S.TokenTransferInput
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="To Address"
                  type="text"
                />

                <S.TokenTransferInputText>Amount</S.TokenTransferInputText>
                <S.TokenTransferInput
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Token Amount"
                  type="number"
                />

                <S.TokenResultFlexRow>
                  <S.TokenButton className="cancel" onClick={reset}>
                    Cancel
                  </S.TokenButton>
                  <S.TokenButton
                    disabled={!isNotOnEthereumMainnet && (!address || !amount)}
                    onClick={
                      isNotOnEthereumMainnet ? switchToMainnet : onTransfer
                    }
                  >
                    {isNotOnEthereumMainnet ? "Switch to Mainnet" : "Submit"}
                  </S.TokenButton>
                </S.TokenResultFlexRow>
              </Fragment>
            ) : (
              <S.TokenButton onClick={onTransferSubmit}>Transfer</S.TokenButton>
            )}
          </Fragment>
        )}
      </S.TokenResult>
    </S.Token>
  );
};

export default Token;
