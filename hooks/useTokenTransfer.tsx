import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

interface IUseTokenTransfer {
  tokenAddress: string;
  tokenAbi: any[]; // abi
  functionName: string;
  userAddress: string;
  amount: string;
  refetchToken: () => void;
  reset: () => void;
}

const useTokenTransfer = ({
  tokenAddress,
  tokenAbi,
  functionName,
  userAddress,
  amount,
  reset,
  refetchToken,
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
  } = useContractWrite(config);

  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: contractWriteData?.hash,
    onSuccess() {
      reset();
      refetchToken();
      alert("You have successfully transferred your tokens!");
    },
  });

  return {
    transfer: write,
    isLoading,
    isLoadingTransaction,
  };
};

export default useTokenTransfer;
