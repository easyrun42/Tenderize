export interface ITokens {
  name: string;
  erc20Address: string;
  functionName: string;
  abi: any[];
}

// Ethereum Mainnet - Tokens
export const tokens = [
  {
    name: "USDC",
    erc20Address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    functionName: "balanceOf",
    abi: [
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },

  {
    name: "USDT",
    erc20Address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    functionName: "balanceOf",
    abi: [
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { name: "_to", type: "address" },
          { name: "_value", type: "uint256" },
        ],
        name: "transfer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
  {
    name: "DAI",
    erc20Address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    functionName: "balanceOf",
    abi: [
      {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "dst", type: "address" },
          { internalType: "uint256", name: "wad", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
];
