# 🎥 Demo Video

https://github.com/easyrun42/Tenderize/assets/136458308/1aa29856-323e-4546-b5ea-255a3462c443



# 🪙 Token Balances
- Inside `utils/tokens`, you'll find all you need for each token:
  1. Function names for fetching balances.
  2. ABI (Application Binary Interface).
  3. ERC20 Address.
  4. Token name.

## 🔍 How to Fetch Balances
- With the `<Token />` component, we use the magic of wagmi and rainbowkit together. Key methods like `useContractRead` are tucked inside the `useToken` hook.


### 🔍 Extracting Token Decimal and Token Balance
```
// Getting the balance of the token
  const {
    data: _tokenBalance,
    isLoading: isLoadingTokenBalance,
    refetch,
  } = useContractRead({
    address: tokenAddress as `0x`,
    abi: tokenAbi,
    functionName,
    args: [userAddress],
    chainId: 1,
  });

// Getting token decimals from the token
  const { data: _tokenDecimals, isLoading: isLoadingTokenDecimal } =
    useContractRead({
      address: tokenAddress as `0x`,
      abi: tokenAbi,
      functionName: "decimals",
      chainId: 1,
    });
```


### 🔍 Displaying Human Readable Balance with (bignumber.js):
```
  // Get total balance of token by dividing balance / token decimal
  const totalBalance = new BigNumber(_tokenBalance.toString())
    .div(_tokenDecimals.toString())
    .dp(4)
    .toNumber();
```


# 🔄 Transfering Tokens
- When transfering those tokens around 🚀, we rely on `usePrepareContractWrite`, `useContractWrite`, and `useWaitForTransaction` from wagmi and rainbowkit.

### 📋 Prepare the ERC20 Smart Contract
```
  const { config } = usePrepareContractWrite({
    address: tokenAddress as `0x`,
    abi: tokenAbi,
    functionName,
    chainId: 1,
    args: [userAddress, amount],
  });
```


### ✍️ Initiate the Transfer with useContractWrite
- Ready to send? Use the `write()` function and let the magic happen in your React app!
```
  const {
    write,
    isLoading,
    data: contractWriteData,
  } = useContractWrite(config);
```

### ⏳ A Little Patience! Wait for Transaction Confirmation
```
  const { isLoading: isLoadingTransaction } = useWaitForTransaction({
    hash: contractWriteData?.hash,
    onSuccess() {
      reset();
      refetchToken();
      alert("You have successfully transferred your tokens!");
    },
  });
```

Enjoy your token transfers! 🎊
