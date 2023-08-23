import React, { Fragment, useEffect, useState } from "react";
import * as S from "./styles";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { Abi, Narrow, formatEther, formatGwei, isAddress } from "viem";
import { BigNumber } from "ethers";
import { useToken } from "../../hooks/useToken";
import Loading from "../Loading/Loading";

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
  const { isLoading, setTokenBalance, tokenBalance } = useToken({
    tokenAddress,
    tokenAbi,
    userAddress,
    functionName,
  });

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const [shouldShowTransferInput, setShouldShowTransferInput] = useState(false);

  const onTransferSubmit = () => {
    setShouldShowTransferInput(true);
  };

  const onCancel = () => {
    setShouldShowTransferInput(false);
    setAddress("");
    setAmount("");
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
                />

                <S.TokenTransferInputText>Amount</S.TokenTransferInputText>
                <S.TokenTransferInput
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Token Amount"
                />

                <S.TokenResultFlexRow>
                  <S.TokenButton className="cancel" onClick={onCancel}>
                    Cancel
                  </S.TokenButton>
                  <S.TokenButton
                    disabled={!address || !amount}
                    onClick={onTransfer}
                  >
                    Submit
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
