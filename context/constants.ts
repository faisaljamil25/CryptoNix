import marketAbi from './NFTMarketplace.json';
import { nftType } from './types';

export const MarketAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
export const MarketAddressABI = marketAbi.abi;

export const initialNFTvalues = [
  {
    price: '',
    tokenId: 0,
    id: 0,
    seller: '',
    owner: '',
    image: '',
    name: '',
    description: '',
    tokenURI: '',
  },
];

export const nftContextDefaultValues = {
  nftCurrency: 'ETH',
  connectWallet: async () => {},
  currentAccount: '',
  createSale: async (url: string, formInputPrice: string) => {},
  fetchNFTs: async () => initialNFTvalues,
  fetchMyNFTsOrCreatedNFTs: async (type: string) => initialNFTvalues,
  isLoadingNFT: false,
  buyNft: async (nft: nftType) => {},
};
