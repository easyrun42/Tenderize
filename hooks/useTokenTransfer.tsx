import { useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import toast from "react-hot-toast";

interface IUseTokenTransfer {
  tokenAddress: string;
  tokenAbi: any[]; // abi
  functionName: string;
  userAddress: string;
  originalAmount: string;
  amount: string;
  reset: () => void;
  setTokenBalance: (num: number) => void;
  tokenBalance: number;
}

const useTokenTransfer = ({
  tokenAddress,
  tokenAbi,
  functionName,
  userAddress,
  amount,
  originalAmount,
  reset,
  setTokenBalance,
  tokenBalance,
}: IUseTokenTransfer) => {
  const { config } = usePrepareContractWrite({
    address: tokenAddress as `0x`,
    abi: tokenAbi,
    functionName,
    chainId: 1,
    args: [userAddress, amount],
  });

  const {
    write,
    isLoading,
    data: contractWriteData,
    isSuccess,
  } = useContractWrite(config);

  const { isLoading: isLoadingTransaction, isError } = useWaitForTransaction({
    hash: contractWriteData?.hash,
    onSuccess() {
      reset();
      toast.success(`Transaction has successfully been sent!`);
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTokenBalance(tokenBalance - Number(originalAmount));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Sorry we couldn't verify the transaction.");
      setTokenBalance(tokenBalance + Number(originalAmount));
    }
  }, [isError]);

  return {
    transfer: write,
    isLoading,
    isLoadingTransaction,
  };
};

export default useTokenTransfer;
