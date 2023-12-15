// export default [
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: false, internalType: 'address[3]', name: 'addrs', type: 'address[3]' },
//       { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
//     ],
//     name: 'AcceptOfferERC1155',
//     type: 'event'
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: false, internalType: 'address[3]', name: 'addrs', type: 'address[3]' },
//       { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
//     ],
//     name: 'AcceptOfferNFT',
//     type: 'event'
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: false, internalType: 'address[3]', name: 'addrs', type: 'address[3]' },
//       { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
//     ],
//     name: 'AuctionERC1155',
//     type: 'event'
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: false, internalType: 'address[3]', name: 'addrs', type: 'address[3]' },
//       { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
//     ],
//     name: 'AuctionNFT',
//     type: 'event'
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: false, internalType: 'address[3]', name: 'addrs', type: 'address[3]' },
//       { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
//     ],
//     name: 'BuyERC1155ETH',
//     type: 'event'
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: false, internalType: 'address[3]', name: 'addrs', type: 'address[3]' },
//       { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'value', type: 'uint256' }
//     ],
//     name: 'BuyERC1155Normal',
//     type: 'event'
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: false, internalType: 'address[3]', name: 'addrs', type: 'address[3]' },
//       { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
//     ],
//     name: 'BuyNFTETH',
//     type: 'event'
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: false, internalType: 'address[3]', name: 'addrs', type: 'address[3]' },
//       { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
//       { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
//     ],
//     name: 'BuyNFTNormal',
//     type: 'event'
//   },
//   {
//     anonymous: false,
//     inputs: [
//       { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
//       { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' }
//     ],
//     name: 'OwnershipTransferred',
//     type: 'event'
//   },
//   {
//     inputs: [],
//     name: 'ERC1155',
//     outputs: [{ internalType: 'address', name: '', type: 'address' }],
//     stateMutability: 'view',
//     type: 'function'
//   },
//   {
//     inputs: [],
//     name: 'ERC721',
//     outputs: [{ internalType: 'address', name: '', type: 'address' }],
//     stateMutability: 'view',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address[5]', name: '_tradeAddress', type: 'address[5]' },
//       { internalType: 'uint256[5]', name: '_attributes', type: 'uint256[5]' },
//       { internalType: 'uint256', name: 'nonce', type: 'uint256' },
//       { internalType: 'bytes', name: 'signature', type: 'bytes' }
//     ],
//     name: 'acceptOfferERC1155',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address[5]', name: '_tradeAddress', type: 'address[5]' },
//       { internalType: 'uint256[4]', name: '_attributes', type: 'uint256[4]' },
//       { internalType: 'uint256', name: 'nonce', type: 'uint256' },
//       { internalType: 'bytes', name: 'signature', type: 'bytes' }
//     ],
//     name: 'acceptOfferNFT',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [],
//     name: 'admin',
//     outputs: [{ internalType: 'address', name: '', type: 'address' }],
//     stateMutability: 'view',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address[5]', name: '_tradeAddress', type: 'address[5]' },
//       { internalType: 'uint256[5]', name: '_attributes', type: 'uint256[5]' }
//     ],
//     name: 'auctionERC1155',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address[5]', name: '_tradeAddress', type: 'address[5]' },
//       { internalType: 'uint256[4]', name: '_attributes', type: 'uint256[4]' }
//     ],
//     name: 'auctionNFT',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address[5]', name: '_tradeAddress', type: 'address[5]' },
//       { internalType: 'uint256[5]', name: '_attributes', type: 'uint256[5]' },
//       { internalType: 'uint256', name: 'nonce', type: 'uint256' },
//       { internalType: 'bytes', name: 'signature', type: 'bytes' }
//     ],
//     name: 'buyERC1155ETH',
//     outputs: [],
//     stateMutability: 'payable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address[5]', name: '_tradeAddress', type: 'address[5]' },
//       { internalType: 'uint256[5]', name: '_attributes', type: 'uint256[5]' },
//       { internalType: 'uint256', name: 'nonce', type: 'uint256' },
//       { internalType: 'bytes', name: 'signature', type: 'bytes' }
//     ],
//     name: 'buyERC1155Normal',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address[5]', name: '_tradeAddress', type: 'address[5]' },
//       { internalType: 'uint256[4]', name: '_attributes', type: 'uint256[4]' },
//       { internalType: 'uint256', name: 'nonce', type: 'uint256' },
//       { internalType: 'bytes', name: 'signature', type: 'bytes' }
//     ],
//     name: 'buyNFTETH',
//     outputs: [],
//     stateMutability: 'payable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address[5]', name: '_tradeAddress', type: 'address[5]' },
//       { internalType: 'uint256[4]', name: '_attributes', type: 'uint256[4]' },
//       { internalType: 'uint256', name: 'nonce', type: 'uint256' },
//       { internalType: 'bytes', name: 'signature', type: 'bytes' }
//     ],
//     name: 'buyNFTNormal',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address[5]', name: '_tradeAddress', type: 'address[5]' },
//       { internalType: 'uint256[3]', name: '_attributes', type: 'uint256[3]' },
//       { internalType: 'uint256[]', name: '_listTokenId', type: 'uint256[]' },
//       { internalType: 'uint256', name: 'nonce', type: 'uint256' },
//       { internalType: 'bytes', name: 'signature', type: 'bytes' }
//     ],
//     name: 'buyRandomNftNormal',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: '_erc721', type: 'address' },
//       { internalType: 'address', name: '_erc1155', type: 'address' }
//     ],
//     name: 'initialize',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [],
//     name: 'owner',
//     outputs: [{ internalType: 'address', name: '', type: 'address' }],
//     stateMutability: 'view',
//     type: 'function'
//   },
//   { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
//   {
//     inputs: [{ internalType: 'address', name: '_admin', type: 'address' }],
//     name: 'setAdminAddress',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [{ internalType: 'address', name: '_erc1155', type: 'address' }],
//     name: 'setERC1155',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [{ internalType: 'address', name: '_erc721', type: 'address' }],
//     name: 'setERC721',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [
//       { internalType: 'address', name: '_address', type: 'address' },
//       { internalType: 'bool', name: 'approved', type: 'bool' }
//     ],
//     name: 'setWhitelistAddress',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
//     name: 'transferOwnership',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function'
//   },
//   {
//     inputs: [{ internalType: 'address', name: '', type: 'address' }],
//     name: 'whitelistAddress',
//     outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
//     stateMutability: 'view',
//     type: 'function'
//   }
// ]

export default [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  { payable: true, stateMutability: 'payable', type: 'fallback' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'src', type: 'address' },
      { indexed: true, name: 'guy', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'src', type: 'address' },
      { indexed: true, name: 'dst', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'dst', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' }
    ],
    name: 'Deposit',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'src', type: 'address' },
      { indexed: false, name: 'wad', type: 'uint256' }
    ],
    name: 'Withdrawal',
    type: 'event'
  }
]
